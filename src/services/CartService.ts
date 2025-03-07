import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/cart';
const CART_STORAGE_KEY = 'pet_shop_cart';

// This interface matches your backend CartDTO structure
export interface CartItemResponse {
    id: number;
    pet: Pet;
    quantity: number;
    subtotal: number;
}

// Updated Pet interface with gender property
export interface Pet {
    id: number;
    name: string;
    petType: string;
    price: string;
    breed: string;
    birthYear: string;
    imageUrl: string;
    purchased: boolean;
    gender?: string; // Made gender optional since it might not always be available
    [key: string]: unknown; // Allow for additional properties
}

// New interface for the cart item deletion response
export interface CartItemDeleteResponse {
    message: string;
    status: string;
}

// Helper functions for local storage
const getLocalCart = (): CartItemResponse[] => {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
};

const saveLocalCart = (cart: CartItemResponse[]): void => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

// Helper to handle missing gender property
const handleMissingGender = (pet: Pet): Pet => {
    if (!pet.gender) {
        // Instead of using a hardcoded mapping, just mark it as unknown
        return {
            ...pet,
            gender: "Unknown"
        };
    }
    return pet;
};

// Process cart items to ensure they all have gender handled
const processCartItems = (items: CartItemResponse[]): CartItemResponse[] => {
    return items.map(item => ({
        ...item,
        pet: handleMissingGender(item.pet)
    }));
};

const cartService = {
    // Get all items in cart
    getCartItems: async (): Promise<CartItemResponse[]> => {
        try {
            const response = await axios.get(API_BASE_URL);
            // Process items to handle missing gender
            const processedItems = processCartItems(response.data);
            // Save to local storage as backup
            saveLocalCart(processedItems);
            return processedItems;
        } catch (error) {
            console.error('Error fetching cart items:', error);
            console.log('Falling back to local storage');
            // Return local data if API call fails
            return processCartItems(getLocalCart());
        }
    },

    // Add item to cart - matches your @PostMapping("/add/{petId}")
    addToCart: async (petId: number, quantity: number): Promise<CartItemResponse> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/add/${petId}`, null, {
                params: { quantity }
            });

            // Handle missing gender property
            const processedItem = {
                ...response.data,
                pet: handleMissingGender(response.data.pet)
            };

            // Update local storage with new item
            const localCart = getLocalCart();
            const existingItemIndex = localCart.findIndex(item => item.pet.id === petId);

            if (existingItemIndex >= 0) {
                // Replace existing item with updated one
                localCart[existingItemIndex] = processedItem;
            } else {
                // Add new item
                localCart.push(processedItem);
            }

            saveLocalCart(localCart);

            return processedItem;
        } catch (error) {
            console.error(`Error adding pet ${petId} to cart:`, error);

            // Try to add to local storage if API fails
            try {
                // Fetch pet details from another API endpoint or use cached data
                // This is a simplified version - you might need to fetch pet details separately
                const localCart = getLocalCart();

                // Check if pet already exists in local cart
                const existingItem = localCart.find(item => item.pet.id === petId);

                if (existingItem) {
                    // Update quantity if pet already in cart
                    existingItem.quantity += quantity;
                    existingItem.subtotal = parseFloat(existingItem.pet.price) * existingItem.quantity;
                    // Handle missing gender
                    existingItem.pet = handleMissingGender(existingItem.pet);
                    saveLocalCart(localCart);
                    return existingItem;
                } else {
                    // Try to get pet details from cache
                    const cachedPet = cartService.getCachedPetDetails(petId);
                    if (cachedPet) {
                        const newItem: CartItemResponse = {
                            id: Date.now(), // Generate temporary ID
                            pet: handleMissingGender(cachedPet),
                            quantity,
                            subtotal: parseFloat(cachedPet.price) * quantity
                        };
                        saveLocalCart([...localCart, newItem]);
                        return newItem;
                    }
                    throw new Error("Cannot add to local cart without pet details");
                }
            } catch {
                console.error('Local fallback failed');
                throw error; // Rethrow the original error
            }
        }
    },

    // Update cart item quantity - matches @PutMapping("/{cartItemId}")
    updateCartItemQuantity: async (cartItemId: number, quantity: number): Promise<CartItemResponse | null> => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${cartItemId}`, null, {
                params: { quantity }
            });

            // Handle missing gender in response
            let processedItem = null;
            if (response.data) {
                processedItem = {
                    ...response.data,
                    pet: handleMissingGender(response.data.pet)
                };
            }

            // Update in local storage
            const localCart = getLocalCart();
            const updatedCart = localCart.map(item =>
                item.id === cartItemId
                    ? processedItem || {
                    ...item,
                    quantity,
                    subtotal: parseFloat(item.pet.price) * quantity,
                    pet: handleMissingGender(item.pet)
                }
                    : item
            );
            saveLocalCart(updatedCart);

            return processedItem;
        } catch (error) {
            console.error(`Error updating cart item ${cartItemId} quantity:`, error);

            // Try local update if API fails
            try {
                const localCart = getLocalCart();
                const itemToUpdate = localCart.find(item => item.id === cartItemId);

                if (itemToUpdate) {
                    if (quantity <= 0) {
                        // Remove item if quantity is 0 or negative
                        const filteredCart = localCart.filter(item => item.id !== cartItemId);
                        saveLocalCart(filteredCart);
                        return null;
                    } else {
                        // Update quantity
                        itemToUpdate.quantity = quantity;
                        itemToUpdate.subtotal = parseFloat(itemToUpdate.pet.price) * quantity;
                        // Handle missing gender
                        itemToUpdate.pet = handleMissingGender(itemToUpdate.pet);
                        saveLocalCart(localCart);
                        return itemToUpdate;
                    }
                }
                throw new Error(`Item with id ${cartItemId} not found in local cart`);
            } catch {
                console.error('Local fallback failed');

                if (axios.isAxiosError(error) && error.response?.status === 204) {
                    // Item was removed (quantity was 0)
                    return null;
                }

                throw error; // Rethrow the original error
            }
        }
    },

    // Remove item from cart - matches @DeleteMapping("/{cartItemId}")
    removeFromCart: async (cartItemId: number): Promise<CartItemDeleteResponse> => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${cartItemId}`);

            // Remove from local storage
            const localCart = getLocalCart();
            const updatedCart = localCart.filter(item => item.id !== cartItemId);
            saveLocalCart(updatedCart);

            // Return the response data with message and status
            return response.data;
        } catch (error) {
            console.error(`Error removing cart item ${cartItemId}:`, error);

            // Try local removal if API fails
            try {
                const localCart = getLocalCart();
                const itemToRemove = localCart.find(item => item.id === cartItemId);
                const updatedCart = localCart.filter(item => item.id !== cartItemId);
                saveLocalCart(updatedCart);

                // Create a fallback response that mimics the backend format
                return {
                    message: itemToRemove
                        ? `${itemToRemove.pet.name} removed from cart (offline mode)!`
                        : "Item removed from cart (offline mode)!",
                    status: "success"
                };
            } catch {
                console.error('Local fallback failed');
                throw error; // Rethrow the original error
            }
        }
    },

    // Clear entire cart - matches your @DeleteMapping
    clearCart: async (): Promise<void> => {
        try {
            await axios.delete(API_BASE_URL);
            // Clear local storage cart
            localStorage.removeItem(CART_STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing cart:', error);

            // Clear local storage even if API fails
            try {
                localStorage.removeItem(CART_STORAGE_KEY);
            } catch {
                console.error('Failed to clear local storage');
                throw error; // Rethrow the original error
            }
        }
    },

    // Get cart total - matches the @GetMapping("/total")
    getCartTotal: async (): Promise<number> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/total`);
            return response.data.total || 0;
        } catch (error) {
            console.error('Error fetching cart total:', error);

            // Calculate total from local storage if API fails
            try {
                const localCart = getLocalCart();
                const total = localCart.reduce((sum, item) =>
                    sum + (parseFloat(item.pet.price) * item.quantity), 0);
                return total;
            } catch {
                console.error('Local total calculation failed');
                return 0;
            }
        }
    },

    // Process checkout - matches the @PostMapping("/checkout")
    checkout: async (): Promise<{ message: string; total: number }> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/checkout`);

            // Clear local cart after successful checkout
            localStorage.removeItem(CART_STORAGE_KEY);

            return {
                message: response.data.message,
                total: response.data.total
            };
        } catch (error) {
            console.error('Error processing checkout:', error);

            // For checkout, we don't want a local fallback that pretends checkout succeeded
            // But we can return the calculated total for display purposes
            try {
                const localCart = getLocalCart();
                const total = localCart.reduce((sum, item) =>
                    sum + (parseFloat(item.pet.price) * item.quantity), 0);

                throw new Error(`Checkout failed, but your cart total is $${total.toFixed(2)}`);
            } catch {
                throw error;
            }
        }
    },

    // New method to sync local cart with server (useful after page refresh)
    syncLocalCartWithServer: async (): Promise<void> => {
        try {
            const localCart = getLocalCart();
            if (localCart.length === 0) return;

            // Clear server cart first
            await axios.delete(API_BASE_URL);

            // Add each item from local cart to server
            for (const item of localCart) {
                await axios.post(`${API_BASE_URL}/add/${item.pet.id}`, null, {
                    params: { quantity: item.quantity }
                });
            }

            // Get updated cart from server
            const response = await axios.get(API_BASE_URL);
            // Process items to handle missing gender
            const processedItems = processCartItems(response.data);
            saveLocalCart(processedItems);
        } catch (error) {
            console.error('Error syncing local cart with server:', error);
        }
    },

    // Method to store pet details in local storage for offline use
    storePetDetails: (pet: Pet): void => {
        try {
            // Handle missing gender before caching
            const petWithHandledGender = handleMissingGender(pet);

            const petsStorageKey = 'pet_shop_pets_cache';
            const petsCache = localStorage.getItem(petsStorageKey);
            const pets = petsCache ? JSON.parse(petsCache) : {};

            // Store or update pet in cache
            pets[pet.id] = {
                ...petWithHandledGender,
                cachedAt: new Date().toISOString()
            };

            localStorage.setItem(petsStorageKey, JSON.stringify(pets));
        } catch (error) {
            console.error('Error storing pet details in cache:', error);
        }
    },

    // Method to get cached pet details
    getCachedPetDetails: (petId: number): Pet | null => {
        try {
            const petsStorageKey = 'pet_shop_pets_cache';
            const petsCache = localStorage.getItem(petsStorageKey);
            if (!petsCache) return null;

            const pets = JSON.parse(petsCache);
            const pet = pets[petId];

            if (!pet) return null;

            // Handle missing gender for cached pet
            return handleMissingGender(pet);
        } catch (error) {
            console.error('Error retrieving cached pet details:', error);
            return null;
        }
    }
};

export default cartService;

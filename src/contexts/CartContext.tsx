// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { Pet } from '../App';
import cartService, { CartItemResponse } from '../services/CartService';

// Define the structure for a cart item
export interface CartItem {
    id: number;
    pet: Pet;
    quantity: number;
    subtotal?: number;
}

// Define what the context will provide
interface CartContextType {
    items: CartItem[];
    loading: boolean;
    addToCart: (pet: Pet, quantity?: number) => Promise<void>;
    removeFromCart: (id: number | string) => Promise<void>;
    updateQuantity: (id: number | string, type: 'plus' | 'minus') => Promise<void>;
    getItemCount: () => number;
    clearCart: () => Promise<void>;
    getCartTotal: () => number;
    checkout: () => Promise<{ message: string; total: number }>;
    refreshCart: () => Promise<void>;
    refreshImageUrl: (petId: number | string) => Promise<string>;
}

// Create the context with default values
const CartContext = createContext<CartContextType>({
    items: [],
    loading: false,
    addToCart: async () => {},
    removeFromCart: async () => {},
    updateQuantity: async () => {},
    getItemCount: () => 0,
    clearCart: async () => {},
    getCartTotal: () => 0,
    checkout: async () => ({ message: '', total: 0 }),
    refreshCart: async () => {},
    refreshImageUrl: async () => '',
});

// Default fallback image path
const DEFAULT_IMAGE = '/default-pet-image.png';

// Global image cache to persist across component re-renders
const globalImageCache: Record<string, string> = {};

// Helper function to get image with fallbacks for different formats
const getImageWithFallbacks = (
    baseImageUrl: string | undefined,
    petName: string = 'pet'
): string => {
    if (!baseImageUrl || baseImageUrl.trim() === '') {
        console.log(`Empty image URL for ${petName}, using default`);
        return DEFAULT_IMAGE;
    }

    // Fix double slash in image URL if present
    if (baseImageUrl.includes('//api')) {
        baseImageUrl = baseImageUrl.replace('//api', '/api');
    }

    // If URL already has an extension or is a full URL, use it as is
    if (
        baseImageUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ||
        baseImageUrl.startsWith('http://') ||
        baseImageUrl.startsWith('https://') ||
        baseImageUrl.startsWith('/api/v1/pets/images/')
    ) {
        return baseImageUrl;
    }

    // Otherwise, assume it's just a base filename and we need to add path and extension
    const baseUrl = process.env.REACT_APP_API_URL || window.location.origin;

    // Remove any trailing slashes from baseUrl
    const cleanBaseUrl = baseUrl.replace(/\/+$/, '');

    // Clean up the image name (remove any path and extension)
    const imageName = baseImageUrl.split('/').pop()?.split('.')[0] || baseImageUrl;

    // Return the URL without extension - let the server determine the correct format
    return `${cleanBaseUrl}/api/v1/pets/images/${imageName}`;
};

// Helper function to convert API response to frontend model
const mapCartItemResponseToCartItem = (item: CartItemResponse): CartItem => {
    // Get pet ID as string for cache key
    const petIdString = String(item.pet.id);

    // Process the image URL
    let imageUrl = getImageWithFallbacks(item.pet.imageUrl, item.pet.name);

    // Check if we have a cached image URL
    if (globalImageCache[petIdString]) {
        imageUrl = globalImageCache[petIdString];
    } else if (imageUrl) {
        // Store in global cache if we have an image URL
        globalImageCache[petIdString] = imageUrl;
    }

    // Ensure we have the pet data properly structured
    const pet: Pet = {
        id: item.pet.id,
        name: item.pet.name,
        breed: item.pet.breed,
        price: item.pet.price,
        birthYear: item.pet.birthYear,
        petType: item.pet.petType.toLowerCase() === 'dog' ? 'dog' : 'cat',
        imageUrl: imageUrl,
        image: imageUrl, // Set both imageUrl and image for compatibility
    };

    // Log the processed pet data with image URL
    console.log(`Processed pet ${pet.name} (ID: ${pet.id}) with image: ${imageUrl}`);

    return {
        id: item.id,
        pet: pet,
        quantity: item.quantity,
        subtotal: item.subtotal
    };
};

// Helper function to ensure number type
const ensureNumber = (value: string | number): number => {
    if (typeof value === 'string') {
        return parseInt(value, 10);
    }
    return value;
};

// Helper function to try different image formats
const tryImageFormats = async (baseUrl: string, _petId: string, petName: string): Promise<string> => {
    // Try different extensions
    const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];

    // Remove any existing extension
    const baseUrlWithoutExt = baseUrl.replace(/\.[^/.]+$/, '');

    // Add a cache-busting parameter to force reload
    const cacheBuster = `?v=${Date.now()}`;

    for (const extension of extensions) {
        const newUrl = `${baseUrlWithoutExt}${extension}${cacheBuster}`;

        try {
            // Create a promise that resolves when the image loads or rejects when it fails
            const loadResult = await new Promise<boolean>((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = newUrl;
            });

            if (loadResult) {
                console.log(`✅ Found working URL for ${petName}: ${newUrl}`);
                return newUrl;
            }
            console.log(`❌ URL failed: ${newUrl}`);
        } catch (error) {
            console.log(`❌ Error testing URL: ${newUrl}`, error);
        }
    }

    // If all formats fail, return default image
    console.log(`❌ All formats failed for ${petName}, using default image`);
    return DEFAULT_IMAGE;
};

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [cartTotal, setCartTotal] = useState<number>(0);

    // Store original pet data when adding to cart
    const [petCache, setPetCache] = useState<Map<number, Pet>>(new Map());

    // Function to refresh a specific image URL with cache busting
    const refreshImageUrl = useCallback(async (petId: number | string): Promise<string> => {
        const idAsNumber = ensureNumber(petId);
        const idAsString = String(idAsNumber);

        // Get the current URL from cache
        const currentUrl = globalImageCache[idAsString] || '';

        if (!currentUrl || currentUrl === DEFAULT_IMAGE) {
            // If no URL in cache or it's the default, try to get from pet cache
            const cachedPet = petCache.get(idAsNumber);
            if (cachedPet && (cachedPet.imageUrl || cachedPet.image)) {
                const baseUrl = cachedPet.imageUrl || cachedPet.image || '';
                // Add cache busting parameter
                const refreshedUrl = `${baseUrl}?v=${Date.now()}`;
                globalImageCache[idAsString] = refreshedUrl;
                return refreshedUrl;
            }
            return DEFAULT_IMAGE;
        }

        // Add cache busting parameter to force reload
        const baseUrl = currentUrl.split('?')[0]; // Remove any existing query parameters
        const refreshedUrl = `${baseUrl}?v=${Date.now()}`;

        // Update in global cache
        globalImageCache[idAsString] = refreshedUrl;

        // Try to load the image
        try {
            const loadResult = await new Promise<boolean>((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = refreshedUrl;
            });

            if (loadResult) {
                console.log(`✅ Refreshed image loaded successfully: ${refreshedUrl}`);
                return refreshedUrl;
            }

            // If failed, try different formats
            console.log(`❌ Refreshed image failed to load: ${refreshedUrl}`);
            const workingUrl = await tryImageFormats(baseUrl, idAsString, 'pet');
            globalImageCache[idAsString] = workingUrl;
            return workingUrl;
        } catch (error) {
            console.error(`Error refreshing image for pet ${petId}:`, error);
            return DEFAULT_IMAGE;
        }
    }, [petCache]);

    // Handle image error with format fallbacks
    const handleImageError = useCallback(async (petId: string | number, petName: string) => {
        console.error(`Image failed to load for pet ${petName} (ID: ${petId})`);

        // Get the current URL that failed
        const currentUrl = globalImageCache[petId.toString()] || '';
        console.log(`Failed URL: ${currentUrl}`);

        if (!currentUrl) {
            globalImageCache[petId.toString()] = DEFAULT_IMAGE;
            return;
        }

        // Try different formats
        const workingUrl = await tryImageFormats(currentUrl, petId.toString(), petName);
        globalImageCache[petId.toString()] = workingUrl;

        // Update pet cache with working URL
        const petIdNumber = ensureNumber(petId);
        setPetCache(prev => {
            const newCache = new Map(prev);
            const existingPet = newCache.get(petIdNumber);
            if (existingPet) {
                newCache.set(petIdNumber, {
                    ...existingPet,
                    imageUrl: workingUrl,
                    image: workingUrl
                });
            }
            return newCache;
        });

        // Force refresh to update UI with new image
        setItems(currentItems => {
            return currentItems.map(item => {
                if (ensureNumber(item.pet.id) === petIdNumber) {
                    return {
                        ...item,
                        pet: {
                            ...item.pet,
                            imageUrl: workingUrl,
                            image: workingUrl
                        }
                    };
                }
                return item;
            });
        });
    }, []);

    // Define refreshCart first since other functions will use it
    const refreshCart = useCallback(async () => {
        try {
            setLoading(true);
            const cartItems = await cartService.getCartItems();

            // Map API response to frontend model
            const mappedItems = await Promise.all(cartItems.map(async item => {
                // Convert pet.id to number for cache lookup
                const petId = ensureNumber(item.pet.id);
                const petIdString = String(petId);

                // Try to use cached pet data if available (for images)
                const cachedPet = petCache.get(petId);

                const mappedItem = mapCartItemResponseToCartItem(item);

                // If we have cached pet data with image, use it
                if (cachedPet && (cachedPet.imageUrl || cachedPet.image)) {
                    const cachedImageUrl = cachedPet.imageUrl || cachedPet.image;

                    if (cachedImageUrl) {
                        // Store in global cache
                        globalImageCache[petIdString] = cachedImageUrl;

                        mappedItem.pet = {
                            ...mappedItem.pet,
                            imageUrl: cachedImageUrl,
                            image: cachedImageUrl
                        };
                    }
                }

                // Try to refresh the image URL with cache busting
                try {
                    const refreshedUrl = await refreshImageUrl(petId);
                    if (refreshedUrl && refreshedUrl !== DEFAULT_IMAGE) {
                        mappedItem.pet = {
                            ...mappedItem.pet,
                            imageUrl: refreshedUrl,
                            image: refreshedUrl
                        };
                    }
                } catch (error) {
                    console.error(`Error refreshing image for pet ${petId}:`, error);
                }

                return mappedItem;
            }));

            setItems(mappedItems);

            // Get cart total
            const total = await cartService.getCartTotal();
            setCartTotal(total);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } finally {
            setLoading(false);
        }
    }, [petCache, refreshImageUrl]);

    // Fetch cart items on component mount
    useEffect(() => {
        refreshCart();

        // Clear image cache on mount to force reload of images
        Object.keys(globalImageCache).forEach(key => {
            delete globalImageCache[key];
        });
    }, [refreshCart]);

    const addToCart = useCallback(async (pet: Pet, quantity: number = 1) => {
        try {
            setLoading(true);

            // Log the pet object being added to cart
            console.log('Adding pet to cart:', pet);

            // Convert pet.id to number for cache
            const petId = ensureNumber(pet.id);
            const petIdString = String(petId);

            // Process and cache the pet's image URL
            let imageUrl = pet.imageUrl || pet.image || '';
            if (imageUrl) {
                imageUrl = getImageWithFallbacks(imageUrl, pet.name);

                // Add cache busting parameter to force reload
                imageUrl = `${imageUrl.split('?')[0]}?v=${Date.now()}`;

                globalImageCache[petIdString] = imageUrl;

                // Preload the image to check if it works
                const img = new Image();
                img.onload = () => {
                    console.log(`✅ Image for ${pet.name} loaded successfully: ${imageUrl}`);
                };
                img.onerror = async () => {
                    console.error(`❌ Image for ${pet.name} failed to load: ${imageUrl}`);
                    await handleImageError(petId, pet.name);
                };
                img.src = imageUrl;
            }

            // Cache the original pet data with image
            setPetCache(prev => {
                const newCache = new Map(prev);
                newCache.set(petId, {
                    ...pet,
                    imageUrl: imageUrl,
                    image: imageUrl
                });
                return newCache;
            });

            // Add to backend
            await cartService.addToCart(petId, quantity);

            // Refresh cart to get updated data
            await refreshCart();
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setLoading(false);
        }
    }, [refreshCart, handleImageError]);
    const removeFromCart = useCallback(async (id: number | string) => {
        try {
            setLoading(true);
            // Find the cart item ID that contains this pet ID
            const idAsNumber = ensureNumber(id);
            const cartItem = items.find(item => ensureNumber(item.pet.id) === idAsNumber);

            if (cartItem) {
                await cartService.removeFromCart(cartItem.id);

                // Remove from pet cache
                setPetCache(prev => {
                    const newCache = new Map(prev);
                    newCache.delete(idAsNumber);
                    return newCache;
                });

                // Remove from global image cache
                delete globalImageCache[String(idAsNumber)];

                // Refresh cart
                await refreshCart();
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        } finally {
            setLoading(false);
        }
    }, [items, refreshCart]);

    const updateQuantity = useCallback(async (id: number | string, type: 'plus' | 'minus') => {
        try {
            setLoading(true);
            // Find the cart item that contains this pet ID
            const idAsNumber = ensureNumber(id);
            const cartItem = items.find(item => ensureNumber(item.pet.id) === idAsNumber);

            if (cartItem) {
                const newQuantity = type === 'plus'
                    ? cartItem.quantity + 1
                    : Math.max(1, cartItem.quantity - 1);

                await cartService.updateCartItemQuantity(cartItem.id, newQuantity);
                await refreshCart();
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        } finally {
            setLoading(false);
        }
    }, [items, refreshCart]);

    const getItemCount = useCallback(() => {
        return items.reduce((total, item) => total + item.quantity, 0);
    }, [items]);

    const getCartTotal = useCallback(() => {
        return cartTotal;
    }, [cartTotal]);

    const clearCart = useCallback(async () => {
        try {
            setLoading(true);
            await cartService.clearCart();

            // Clear pet cache
            setPetCache(new Map());

            // Clear global image cache
            Object.keys(globalImageCache).forEach(key => {
                delete globalImageCache[key];
            });

            // Clear local state
            setItems([]);
            setCartTotal(0);
        } catch (error) {
            console.error('Error clearing cart:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const checkout = useCallback(async () => {
        try {
            setLoading(true);
            const result = await cartService.checkout();

            // Clear pet cache
            setPetCache(new Map());

            // Clear global image cache
            Object.keys(globalImageCache).forEach(key => {
                delete globalImageCache[key];
            });

            // Clear local state
            setItems([]);
            setCartTotal(0);

            return result;
        } catch (error) {
            console.error('Error during checkout:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const value = {
        items,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemCount,
        clearCart,
        getCartTotal,
        checkout,
        refreshCart,
        refreshImageUrl
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Export a function to preload pet images that can be used outside the context
export const preloadPetImage = async (pet: Pet): Promise<string> => {
    if (!pet || !pet.id) return DEFAULT_IMAGE;

    const petId = typeof pet.id === 'string' ? parseInt(pet.id, 10) : pet.id;
    const petIdString = String(petId);

    // Check cache first
    if (globalImageCache[petIdString]) {
        return globalImageCache[petIdString];
    }

    // Process image URL
    let imageUrl = pet.imageUrl || pet.image || '';
    if (!imageUrl) return DEFAULT_IMAGE;

    imageUrl = getImageWithFallbacks(imageUrl, pet.name);

    // Add cache busting parameter
    imageUrl = `${imageUrl.split('?')[0]}?v=${Date.now()}`;

    // Store in cache
    globalImageCache[petIdString] = imageUrl;

    // Preload image
    try {
        const loadResult = await new Promise<boolean>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = imageUrl;
        });

        if (loadResult) {
            console.log(`✅ Preloaded image for ${pet.name}: ${imageUrl}`);
            return imageUrl;
        }

        // If loading fails, try different formats
        console.log(`❌ Failed to load image for ${pet.name}: ${imageUrl}`);
        const workingUrl = await tryImageFormats(imageUrl.split('?')[0], petIdString, pet.name);
        globalImageCache[petIdString] = workingUrl;
        return workingUrl;
    } catch (error) {
        console.error(`Error preloading image for ${pet.name}:`, error);
        return DEFAULT_IMAGE;
    }
};

// Export the global image cache for direct access in components if needed
export const getImageCache = () => globalImageCache;

// Function to force clear the image cache - can be called from components
export const clearImageCache = () => {
    Object.keys(globalImageCache).forEach(key => {
        delete globalImageCache[key];
    });
};

// Export a function to refresh all images in the cache
export const refreshAllImages = async (): Promise<void> => {
    const keys = Object.keys(globalImageCache);
    for (const key of keys) {
        const currentUrl = globalImageCache[key];
        if (currentUrl && currentUrl !== DEFAULT_IMAGE) {
            const baseUrl = currentUrl.split('?')[0]; // Remove any existing query parameters
            const refreshedUrl = `${baseUrl}?v=${Date.now()}`;
            globalImageCache[key] = refreshedUrl;

            // Preload the image
            const img = new Image();
            img.src = refreshedUrl;
        }
    }
};


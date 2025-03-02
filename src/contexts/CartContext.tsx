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
});

// Helper function to convert API response to frontend model
const mapCartItemResponseToCartItem = (item: CartItemResponse): CartItem => {
    // Log the raw pet data from the API
    console.log('Raw pet data from API:', item.pet);

    // Ensure we have valid image URLs
    let imageUrl = item.pet.imageUrl || '';

    // Fix double slash in image URL if present
    if (imageUrl.includes('//api')) {
        imageUrl = imageUrl.replace('//api', '/api');
    }

    // Ensure we have the pet data properly structured
    const pet: Pet = {
        id: item.pet.id, // No need to parse, Pet interface accepts string | number
        name: item.pet.name,
        breed: item.pet.breed,
        price: item.pet.price, // No need to parse, Pet interface accepts string | number
        birthYear: item.pet.birthYear, // No need to parse, Pet interface accepts string | number
        petType: item.pet.petType.toLowerCase() === 'dog' ? 'dog' : 'cat',
        imageUrl: imageUrl,
        image: imageUrl, // Set both imageUrl and image for compatibility
    };

    // Log the processed pet data
    console.log('Processed pet data:', pet);

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

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [cartTotal, setCartTotal] = useState<number>(0);

    // Store original pet data when adding to cart
    const [petCache, setPetCache] = useState<Map<number, Pet>>(new Map());

    // Define refreshCart first since other functions will use it
    const refreshCart = useCallback(async () => {
        try {
            setLoading(true);
            const cartItems = await cartService.getCartItems();

            // Map API response to frontend model
            const mappedItems = cartItems.map(item => {
                // Convert pet.id to number for cache lookup
                const petId = ensureNumber(item.pet.id);

                // Try to use cached pet data if available (for images)
                const cachedPet = petCache.get(petId);

                const mappedItem = mapCartItemResponseToCartItem(item);

                // If we have cached pet data with image, use it
                if (cachedPet && (cachedPet.imageUrl || cachedPet.image)) {
                    mappedItem.pet = {
                        ...mappedItem.pet,
                        imageUrl: cachedPet.imageUrl || mappedItem.pet.imageUrl,
                        image: cachedPet.image || mappedItem.pet.image
                    };
                }

                return mappedItem;
            });

            setItems(mappedItems);

            // Get cart total
            const total = await cartService.getCartTotal();
            setCartTotal(total);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } finally {
            setLoading(false);
        }
    }, [petCache]);

    // Fetch cart items on component mount
    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    const addToCart = useCallback(async (pet: Pet, quantity: number = 1) => {
        try {
            setLoading(true);

            // Log the pet object being added to cart
            console.log('Adding pet to cart:', pet);

            // Convert pet.id to number for cache
            const petId = ensureNumber(pet.id);

            // Cache the original pet data with image
            setPetCache(prev => {
                const newCache = new Map(prev);
                newCache.set(petId, { ...pet });
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
    }, [refreshCart]);

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
        refreshCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

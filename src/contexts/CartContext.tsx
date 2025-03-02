// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Pet } from '../App'; // Import the Pet type from App instead of PetCard

// Define the structure for a cart item
export interface CartItem {
    pet: Pet;
    quantity: number;
}

// Define what the context will provide
interface CartContextType {
    items: CartItem[];
    addToCart: (pet: Pet, quantity: number) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, type: 'plus' | 'minus') => void;
    getItemCount: () => number;
    clearCart: () => void;
    getCartTotal: () => number;
}

// Create the context with default values
const CartContext = createContext<CartContextType>({
    items: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    getItemCount: () => 0,
    clearCart: () => {},
    getCartTotal: () => 0,
});

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    // Use useCallback to memoize functions and prevent unnecessary re-renders
    const addToCart = useCallback((pet: Pet, quantity: number) => {
        setItems(prevItems => {
            // Check if item already exists in cart
            const existingItem = prevItems.find(item => item.pet.id === pet.id);

            if (existingItem) {
                // If item exists, update quantity
                return prevItems.map(item =>
                    item.pet.id === pet.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // If item doesn't exist, add it
                return [...prevItems, { pet, quantity }];
            }
        });
    }, []);

    const removeFromCart = useCallback((id: number) => {
        setItems(prevItems => prevItems.filter(item => item.pet.id !== id));
    }, []);

    // Revised updateQuantity function to ensure it only updates by exactly 1
    const updateQuantity = useCallback((id: number, type: 'plus' | 'minus') => {
        console.log(`Updating quantity for item ${id}: ${type}`); // Debug log

        setItems(prevItems => {
            return prevItems.map(item => {
                if (item.pet.id === id) {
                    const newQuantity = type === 'plus'
                        ? item.quantity + 1
                        : Math.max(1, item.quantity - 1);

                    console.log(`Item ${id}: ${item.quantity} -> ${newQuantity}`); // Debug log

                    return {
                        ...item,
                        quantity: newQuantity
                    };
                }
                return item;
            });
        });
    }, []);

    const getItemCount = useCallback(() => {
        return items.reduce((total, item) => total + item.quantity, 0);
    }, [items]);

    const getCartTotal = useCallback(() => {
        return items.reduce((total, item) => total + (Number(item.pet.price) * item.quantity), 0);
    }, [items]);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const value = {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemCount,
        clearCart,
        getCartTotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure for a cart item
export interface CartItem {
    pet: {
        id: number;
        name: string;
        breed: string;
        price: number;
        birthYear: number;
        petType: string;
        image: string;
    };
    quantity: number;
}

// Define what the context will provide
interface CartContextType {
    items: CartItem[];
    addToCart: (pet: any, quantity: number) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, type: 'plus' | 'minus') => void;
    getItemCount: () => number;
    clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType>({
    items: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    getItemCount: () => 0,
    clearCart: () => {},
});

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (pet: any, quantity: number) => {
        setItems(prevItems => {
            // Check if item already exists in cart
            const existingItemIndex = prevItems.findIndex(item => item.pet.id === pet.id);

            if (existingItemIndex >= 0) {
                // If item exists, update quantity
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantity;
                return updatedItems;
            } else {
                // If item doesn't exist, add it
                return [...prevItems, { pet, quantity }];
            }
        });
    };

    const removeFromCart = (id: number) => {
        setItems(prevItems => prevItems.filter(item => item.pet.id !== id));
    };

    const updateQuantity = (id: number, type: 'plus' | 'minus') => {
        setItems(prevItems => {
            const itemIndex = prevItems.findIndex(item => item.pet.id === id);

            if (itemIndex === -1) return prevItems;

            const updatedItems = [...prevItems];

            if (type === 'plus') {
                updatedItems[itemIndex].quantity += 1;
            } else if (type === 'minus') {
                updatedItems[itemIndex].quantity -= 1;

                // Remove item if quantity becomes zero
                if (updatedItems[itemIndex].quantity <= 0) {
                    return updatedItems.filter(item => item.pet.id !== id);
                }
            }

            return updatedItems;
        });
    };

    const getItemCount = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                getItemCount,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

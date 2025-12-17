import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface CartItem {
    id: number;
    name: string;
    price: number;
    img: string;
    quantity: number;
}

interface CartContextValue {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "eshop_cart";

export function CartProvider({ children }: { children: ReactNode }) {

    // ✅ Читаем localStorage ОДИН РАЗ при инициализации
    const [items, setItems] = useState<CartItem[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    // ✅ Эффект ТОЛЬКО для синхронизации наружу
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addItem = (item: Omit<CartItem, "quantity">) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeItem = (id: number) => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
    
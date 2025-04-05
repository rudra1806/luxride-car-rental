import { createContext, useState, useContext, ReactNode } from 'react';
import { Car } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  car: Car;
  pickupDate: Date;
  returnDate: Date;
  pickupLocation: string;
  totalPrice: number;
  days: number;
}

interface CartContextType {
  cartItem: CartItem | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: () => void;
  calculateTotalPrice: (car: Car, days: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const { toast } = useToast();

  const addToCart = (item: CartItem) => {
    setCartItem(item);
    toast({
      title: "Added to cart",
      description: `${item.car.name} has been added to your cart`,
    });
  };

  const removeFromCart = () => {
    setCartItem(null);
  };

  const calculateTotalPrice = (car: Car, days: number): number => {
    return car.price * days;
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addToCart,
        removeFromCart,
        calculateTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

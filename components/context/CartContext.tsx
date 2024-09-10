import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Definimos el tipo para los productos del carrito
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// Estado inicial del carrito
const initialState: CartItem[] = [];

// Reducer para manejar las acciones del carrito
function cartReducer(state: CartItem[], action: { type: string; payload?: CartItem }) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.id === action.payload?.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload?.id
            ? { ...item, quantity: item.quantity + (action.payload?.quantity || 1) }
            : item
        );
      }
      return [...state, { ...action.payload!, quantity: 1 }];
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload?.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

// Crear el contexto del carrito
const CartContext = createContext<{ state: CartItem[]; dispatch: React.Dispatch<any> } | undefined>(undefined);

// Proveedor del contexto del carrito
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

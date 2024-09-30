import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { CartProvider } from './components/context/CartContext';
import { ProductList } from './components/products/ProductsList';

export default function App() {
  return (
    <CartProvider>
      <SafeAreaView style={styles.safeArea}>
        <ProductList />
      </SafeAreaView>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

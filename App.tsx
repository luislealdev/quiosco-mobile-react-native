import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button, SafeAreaView } from 'react-native';
import { CartProvider, useCart } from './components/context/CartContext';
import Cart from './components/cart/Cart';
import { Product } from './interfaces/product.interface';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]); // Usa la interfaz Product aquí
  const [loading, setLoading] = useState<boolean>(true); // Estado para manejar el indicador de carga
  const { dispatch } = useCart(); // Usar el contexto del carrito

  // Función para hacer la solicitud a la API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/order/api', {
        method: 'GET'
      }); // URL de tu API
      const data: Product[] = await response.json(); // Convertir la respuesta a JSON y tipar como Product[]

      setProducts(data); // Almacenar los productos en el estado
      setLoading(false); // Desactivar la carga cuando se obtienen los productos
    } catch (error) {
      console.error('Error fetching products:', error); // Manejo de errores
      setLoading(false);
    }
  };

  // useEffect para hacer la solicitud cuando el componente se monta
  useEffect(() => {
    fetchProducts();
  }, []);

  // Si está cargando, mostrar un indicador de carga
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        numColumns={2}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price.toFixed(2)}</Text>
            <Button
              title="Add to Cart"
              onPress={() => {
                dispatch({ type: 'ADD_ITEM', payload: { id: item.id, name: item.name, price: item.price, quantity: 1 } });
              }}
            />
          </View>
        )}
      />
      <Cart />
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <CartProvider>
      <SafeAreaView style={styles.safeArea}>
        <ProductList />
      </SafeAreaView>
    </CartProvider>
  );
}

// Estilos para la aplicación
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Asegura que el fondo sea blanco
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCard: {
    width: '40%',
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
  },
});

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View, Text } from 'react-native';
import { useCart } from '../context/CartContext';
import { Product } from '../../interfaces/product.interface';
import Cart from '../cart/Cart';
import { StatusBar } from 'expo-status-bar';
import { ProductCard } from './ProductCard';

export const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { dispatch } = useCart();

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/order/api');
            const data: Product[] = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading products...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                columnWrapperStyle={styles.columnWrapper}
                numColumns={2}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard product={item} /> // Usa el nuevo componente ProductCard
                )}
            />
            <Cart />
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
});

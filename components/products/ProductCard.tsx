import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Product } from '../../interfaces/product.interface';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const { dispatch } = useCart();

    return (
        <View style={styles.productCard}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price.toFixed(2)}</Text>
            <Button
                title="Add to Cart"
                onPress={() =>
                    dispatch({ type: 'ADD_ITEM', payload: { id: product.id, name: product.name, price: product.price, quantity: 1 } })
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    productCard: {
        width: '45%',
        backgroundColor: '#f9f9f9',
        padding: 20,
        marginVertical: 8,
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

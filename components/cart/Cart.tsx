import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useCart } from '../context/CartContext'; // Asegúrate de que la ruta sea correcta

const Cart = () => {
    const { state: cartItems, dispatch } = useCart();

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        try {
            const response = await fetch('http://localhost:3000/order/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Luis Leal', // Aquí deberías manejar el nombre de la orden
                    total,
                    order: cartItems.map((item) => ({
                        id: item.id,
                        quantity: item.quantity,
                    })),
                }),
            });

            console.log(response);
            
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            dispatch({ type: 'CLEAR_CART' }); // Limpiar el carrito después del checkout
        } catch (error) {
            console.error('Error checking out:', error);
        }
    };
    

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()} // Convierte el ID a cadena
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>{item.price.toFixed(2)} x {item.quantity}</Text>
                    </View>
                )}
            />
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            <Button title="Checkout" onPress={handleCheckout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        marginBottom: 16,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
});

export default Cart;

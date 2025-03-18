import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface PedidoProps {
    route: any;
}

const Pedido: React.FC<PedidoProps> = ({ route }) => {
    const { order: initialOrder } = route.params;
    const [order, setOrder] = useState(initialOrder);
    const [confirmed, setConfirmed] = useState(false);
    const navigation = useNavigation();

    const total = order.reduce((sum, product) => sum + product.precio * product.cantidad, 0);

    const confirmOrder = () => {
        setConfirmed(true);
        Alert.alert('Orden Confirmada', 'Su orden ha sido confirmada.');
    };

    const removeFromOrder = (product: any) => {
        const existingProduct = order.find(item => item.id === product.id);
        if (existingProduct && existingProduct.cantidad > 1) {
            setOrder(order.map(item => 
                item.id === product.id ? { ...item, cantidad: item.cantidad - 1 } : item
            ));
        } else {
            setOrder(order.filter(item => item.id !== product.id));
        }
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.nombre}</Text>
            <Text style={styles.productPrice}>${item.precio.toFixed(2)} x {item.cantidad}</Text>
            {!confirmed && <Button title="Eliminar" onPress={() => removeFromOrder(item)} />}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pedido</Text>
            <FlatList
                data={order}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            {!confirmed ? (
                <Button title="Confirmar Orden" onPress={confirmOrder} />
            ) : (
                <Button title="Editar Orden" onPress={() => {
                    navigation.navigate('Menu', { order, setOrder });
                    setConfirmed(false);
                }} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    productContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        alignItems: 'center',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default Pedido;

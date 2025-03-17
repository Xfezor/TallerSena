import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';

interface PedidoProps {
    route: any;
}

const Pedido: React.FC<PedidoProps> = ({ route }) => {
    const { order } = route.params;

    const total = order.reduce((sum, product) => sum + product.precio, 0);

    const confirmOrder = () => {
        Alert.alert('Orden Confirmada', 'Su orden ha sido confirmada.');
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.nombre}</Text>
            <Text style={styles.productPrice}>${item.precio.toFixed(2)}</Text>
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
            <Button title="Confirmar Orden" onPress={confirmOrder} />
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

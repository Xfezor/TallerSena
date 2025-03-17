import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Plato } from '../components/platos';

interface Manuprops {
    route: any;
}

interface Product {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
}

const products: Product[] = [
  { id: 1, nombre: 'Ensalada Cesar', categoria: 'Entrada', precio: 5.99, descripcion: 'Ensalada con lechuga, crutones y aderezo Cesar' },
  { id: 2, nombre: 'Sopa de Tortilla', categoria: 'Entrada', precio: 4.99, descripcion: 'Sopa con tiras de tortilla, aguacate y queso' },
  { id: 3, nombre: 'Tacos al Pastor', categoria: 'Platillo', precio: 8.99, descripcion: 'Tacos de cerdo adobado con piña y cebolla' },
  { id: 4, nombre: 'Hamburguesa', categoria: 'Platillo', precio: 9.99, descripcion: 'Hamburguesa con carne de res, queso y vegetales' },
  { id: 5, nombre: 'Pizza Margarita', categoria: 'Platillo', precio: 12.99, descripcion: 'Pizza con tomate, mozzarella y albahaca' },
  { id: 6, nombre: 'Coca Cola', categoria: 'Bebida', precio: 1.99, descripcion: 'Refresco de cola' },
  { id: 7, nombre: 'Limonada', categoria: 'Bebida', precio: 2.99, descripcion: 'Limonada fresca' },
  { id: 8, nombre: 'Cerveza', categoria: 'Bebida', precio: 3.99, descripcion: 'Cerveza artesanal' },
  { id: 9, nombre: 'Pastel de Chocolate', categoria: 'Postre', precio: 4.99, descripcion: 'Pastel de chocolate con cobertura de chocolate' },
  { id: 10, nombre: 'Helado de Vainilla', categoria: 'Postre', precio: 3.99, descripcion: 'Helado de vainilla con chispas de chocolate' },
  { id: 11, nombre: 'Tacos de Asada', categoria: 'Platillo', precio: 7.99, descripcion: 'Tacos de carne asada con cebolla y cilantro' },
  { id: 12, nombre: 'Enchiladas Verdes', categoria: 'Platillo', precio: 9.99, descripcion: 'Enchiladas de pollo con salsa verde y queso' },
  { id: 13, nombre: 'Burrito de Pollo', categoria: 'Platillo', precio: 8.99, descripcion: 'Burrito de pollo con frijoles y arroz' },
  { id: 14, nombre: 'Quesadilla', categoria: 'Platillo', precio: 6.99, descripcion: 'Quesadilla de queso con guacamole' },
  { id: 15, nombre: 'Fajitas de Res', categoria: 'Platillo', precio: 11.99, descripcion: 'Fajitas de res con pimientos y cebolla' },
  { id: 16, nombre: 'Agua Mineral', categoria: 'Bebida', precio: 1.49, descripcion: 'Agua mineral con gas' },
  { id: 17, nombre: 'Jugo de Naranja', categoria: 'Bebida', precio: 2.49, descripcion: 'Jugo de naranja natural' },
  { id: 18, nombre: 'Café', categoria: 'Bebida', precio: 1.99, descripcion: 'Café americano' },
  { id: 19, nombre: 'Té Helado', categoria: 'Bebida', precio: 2.49, descripcion: 'Té helado con limón' },
  { id: 20, nombre: 'Margarita', categoria: 'Bebida', precio: 5.99, descripcion: 'Cóctel de tequila con limón y sal' },
  { id: 21, nombre: 'Cheesecake', categoria: 'Postre', precio: 4.99, descripcion: 'Cheesecake con salsa de fresa' },
  { id: 22, nombre: 'Brownie', categoria: 'Postre', precio: 3.99, descripcion: 'Brownie de chocolate con nueces' },
  { id: 23, nombre: 'Flan', categoria: 'Postre', precio: 3.49, descripcion: 'Flan de caramelo' },
  { id: 24, nombre: 'Tarta de Manzana', categoria: 'Postre', precio: 4.49, descripcion: 'Tarta de manzana con canela' },
  { id: 25, nombre: 'Mousse de Limón', categoria: 'Postre', precio: 3.99, descripcion: 'Mousse de limón con merengue' },
  { id: 26, nombre: 'Guacamole', categoria: 'Entrada', precio: 5.99, descripcion: 'Guacamole con totopos' },
  { id: 27, nombre: 'Nachos', categoria: 'Entrada', precio: 6.99, descripcion: 'Nachos con queso y jalapeños' },
  { id: 28, nombre: 'Ceviche', categoria: 'Entrada', precio: 7.99, descripcion: 'Ceviche de pescado con limón y cilantro' },
  { id: 29, nombre: 'Bruschetta', categoria: 'Entrada', precio: 4.99, descripcion: 'Bruschetta con tomate y albahaca' },
  { id: 30, nombre: 'Calamares Fritos', categoria: 'Entrada', precio: 8.99, descripcion: 'Calamares fritos con salsa tártara' },
  // ... add more products as needed
];

const Menu: React.FC<Manuprops> = ({ route }) => {
    const { numero } = route.params;
    const navigation = useNavigation();
    const [order, setOrder] = useState<Product[]>([]);

    const addToOrder = (product: Product) => {
        setOrder([...order, product]);
    };

    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.nombre}</Text>
            <Text style={styles.productCategory}>{item.categoria}</Text>
            <Text style={styles.productDescription}>{item.descripcion}</Text>
            <Text style={styles.productPrice}>${item.precio.toFixed(2)}</Text>
            <Button title="Agregar" onPress={() => addToOrder(item)} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menú de la Mesa {numero}</Text>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            <Button title="Ver Pedido" onPress={() => navigation.navigate('Pedido', { order })} />
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
    productCategory: {
        fontSize: 16,
        color: 'gray',
    },
    productDescription: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 5,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
});

export default Menu;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Manuprops {
    route: any;
}

interface MenuItem {
    nombre: string;
    precio: number;
    descripcion: string;
}

const Menu: React.FC<Manuprops> = ({ route }) => {
    const { numero } = route.params;
    const [menu, setMenu] = useState<MenuItem[]>([]);

    useEffect(() => {
        fetch(`http://localhost/TallerSena/TallerSena/api/api.php`)
            .then(response => response.json())
            .then(data => setMenu(data))
            .catch(error => console.error('Error fetching menu:', error));
    }, [numero]);

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Menú de la Mesa {numero}</Text>
          {menu.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                  <Text style={styles.itemName}>{item.nombre}</Text>
                  <Text style={styles.itemPrice}>${item.precio.toFixed(2)}</Text>
                  <Text style={styles.itemDescription}>{item.descripcion}</Text>
              </View>
          ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        marginBottom: 15,
        alignItems: 'center',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
        color: 'green',
    },
    itemDescription: {
        fontSize: 14,
        fontStyle: 'italic',
    },
});

export default Menu;
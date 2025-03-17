import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Plato } from '../components/platos';


interface Manuprops {
    route: any;
}

const Menu: React.FC<Manuprops> = ({ route }) => {
    const {numero} = route.params;
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Menú de la Mesa {numero}</Text>
          <Text style={styles.item}>Plato 1</Text>
          <Text style={styles.item}>Plato 2</Text>
          <Text style={styles.item}>Plato 3</Text>
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
      item: {
        fontSize: 18,
        marginBottom: 10,
      },
    });
    
    export default Menu;
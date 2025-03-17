import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface MesaProps {
  numero: number;
  ocupada: boolean;
  navigation: any;
}

export const Mesa: React.FC<MesaProps> = ({ numero, ocupada, navigation }) => {
  const handlePress = () => {
    if (!ocupada) {
      navigation.navigate('Menu', { numero });
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image
        source={ocupada ? require('../../assets/mesa_ocupada.png') : require('../../assets/mesa_disponible.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Mesa {numero}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
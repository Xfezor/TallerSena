import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

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
    <View style={styles.container}>
      <Image
        source={ocupada ? require('../../assets/mesa_ocupada.png') : require('../../assets/mesa_disponible.png')}
        style={styles.image}
      />
      <Text style={styles.text} onPress={handlePress}>Mesa {numero}</Text>
    </View>
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
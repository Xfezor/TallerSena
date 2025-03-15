import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
// import { Mesa } from '../components/Mesas';
import { useNavigation } from '@react-navigation/native';

export const Mesas: React.FC = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* {mesasData.map((mesa) => (
        <Mesa key={mesa.numero} numero={mesa.numero} ocupada={mesa.ocupada} navigation={navigation} />
      ))} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 20,
  },
});
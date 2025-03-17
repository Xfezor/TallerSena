import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Mesa } from '../components/Mesas';
import { useNavigation } from '@react-navigation/native';

interface MesaData {
  id_Mesa: number;
  numero: number;
  ocupada: boolean;
}

const mesasData: MesaData[] = [
  { id_Mesa: 1, numero: 1, ocupada: false },
  { id_Mesa: 2, numero: 2, ocupada: true },
  { id_Mesa: 3, numero: 3, ocupada: false },
  { id_Mesa: 4, numero: 4, ocupada: true },
  { id_Mesa: 5, numero: 5, ocupada: false },
  { id_Mesa: 6, numero: 6, ocupada: true },
  { id_Mesa: 7, numero: 7, ocupada: false },
  { id_Mesa: 8, numero: 8, ocupada: true },
  { id_Mesa: 9, numero: 9, ocupada: false },
  { id_Mesa: 10, numero: 10, ocupada: true },
];

export const Mesas: React.FC = () => {
  const [mesas, setMesas] = useState<MesaData[]>(mesasData);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {mesas.map((mesa) => (
        <Mesa key={mesa.id_Mesa} numero={mesa.numero} ocupada={mesa.ocupada} navigation={navigation} />
      ))}
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
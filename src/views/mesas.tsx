import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Mesa } from '../components/Mesas';
import { useNavigation } from '@react-navigation/native';

interface MesaData {
  id_Mesa: number;
  numero: number;
  ocupada: boolean;
}

export const Mesas: React.FC = () => {
  const [mesas, setMesas] = useState<MesaData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const response = await fetch('http://localhost/TallerSena/api/api.php');
        const data = await response.json();
        setMesas(data);
      } catch (error) {
        console.error('Error fetching mesas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMesas();
  }, []);

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
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Mesa } from '../components/Mesas';
import { useNavigation } from '@react-navigation/native';

export const Mesas: React.FC = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Mesa numero={1} ocupada={false} navigation={navigation} />
      <Mesa numero={2} ocupada={true} navigation={navigation} />
      <Mesa numero={3} ocupada={false} navigation={navigation} />
      <Mesa numero={4} ocupada={true} navigation={navigation} />
      <Mesa numero={5} ocupada={false} navigation={navigation} />
      <Mesa numero={6} ocupada={false} navigation={navigation} />
      <Mesa numero={7} ocupada={true} navigation={navigation} />
      <Mesa numero={8} ocupada={false} navigation={navigation} />
      <Mesa numero={9} ocupada={true} navigation={navigation} />
      <Mesa numero={10} ocupada={false} navigation={navigation} />
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
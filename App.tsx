import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, ToastAndroid, Alert, TouchableOpacity } from 'react-native';
import { RoundedButton } from './src/components/RoundedButton';
import { Mesas } from './src/views/mesas';
import menu from './src/views/menu';
import pedido from './src/views/pedido';
import Registro from './src/views/registro';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const usuarios = [
    { correo: 'juan.perez@example.com', contrasena: 'password1234' },
    { correo: 'maria.lopez@example.com', contrasena: 'password123' },
    { correo: 'carlos.sanchez@example.com', contrasena: 'password123' },
    { correo: 'ana.gomez@example.com', contrasena: 'password123' },
    { correo: 'luis.martinez@example.com', contrasena: 'password123' },
  ];

  const handleLogin = () => {
    if (!email || !contrasena) {
      Alert.alert('Error', 'Por favor ingrese su correo y contraseña');
      return;
    }
    const usuario = usuarios.find(user => user.correo === email && user.contrasena === contrasena);

    if (usuario) {
      setIsLoggedIn(true);
      Alert.alert('Bienvenido', 'Inicio de sesión exitoso');
      ToastAndroid.show('Bienvenido', ToastAndroid.SHORT);
    } else {
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setContrasena('');
    Alert.alert('Sesión cerrada', 'Hasta luego');
  };

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Mesas">
            {props => <Mesas {...props} handleLogout={handleLogout} />}
          </Stack.Screen>
          <Stack.Screen name="Menu" component={menu} />
          <Stack.Screen name="Pedido" component={pedido} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {({ navigation }) => (
            <View style={styles.container}>
              <Image
                source={require('./assets/chef.jpg')}
                style={styles.imageBackground}
              />
              <View style={styles.logoContainer}>
                <Image
                  source={require('./assets/logo.png')}
                  style={styles.logoImage}
                />
                <Text style={styles.logoText}>Pedidos.com</Text>
              </View>
              <StatusBar style="auto" />
              <View style={styles.form}>
                <Text style={styles.formText}>INGRESAR</Text>
                <View style={styles.formInput}>
                  <Image style={styles.formIcon} source={require('./assets/email.png')} />
                  <TextInput
                    style={styles.formTextInput}
                    placeholder='Correo electrónico'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                <View style={styles.formInput}>
                  <Image style={styles.formIcon} source={require('./assets/password.png')} />
                  <TextInput
                    style={styles.formTextInput}
                    placeholder='Contraseña'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={contrasena}
                    onChangeText={setContrasena}
                  />
                </View>
                <View style={{ marginTop: 30 }}>
                  <RoundedButton text='ENTRAR' onPress={handleLogin} />
                </View>
                <View style={styles.formRegister}>
                  <Text>¿No tienes cuenta?</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                    <Text style={styles.formRegisterText}>Regístrate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
    bottom: '30%',
  },
  form: {
    width: '100%',
    height: '40%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },
  formText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  formIcon: {
    width: 25,
    height: 25,
    marginTop: 5,
  },
  formInput: {
    flexDirection: 'row',
    marginTop: 30,
  },
  formTextInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
    marginLeft: 15,
  },
  formRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  formRegisterText: {
    fontStyle: 'italic',
    color: 'orange',
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '15%',
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  logoText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
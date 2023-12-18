import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import LogoImage from '../assets/MobileHub.png';

/**
 * Componente de la pantalla principal que muestra las opciones de inicio de sesión y registro.
 *
 * @component
 * @param {Object} navigation - Objeto de navegación para cambiar entre pantallas.
 */
const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={LogoImage} style={styles.logo} />

      <Button
        mode="contained"
        style={[styles.button, styles.primaryButton]}
        onPress={() => navigation.navigate('Login')}
      >
        Iniciar Sesión
      </Button>

      <Button
        mode="outlined"
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.secondaryButtonText}>Registrarse</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    width: 300,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: 'black',
  },
  secondaryButton: {
    borderColor: 'black',
  },
  secondaryButtonText: {
    color: 'black',
  },
});

export default MainScreen;

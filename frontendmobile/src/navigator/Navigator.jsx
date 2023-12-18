import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";

import MainScreen from "../views/MainScreen";
import LoginScreen from "../views/LoginScreen";
import RegistrationScreen from "../views/RegistrationScreen";
import HomeScreen from "../views/HomeScreen";

const Stack = createStackNavigator();

/**
 * Componente Navigator: Gestiona la navegación de la aplicación
 * basándose en el estado de autenticación del usuario.
 */
export const Navigator = () => {
  const { status } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Renderizar pantallas de autenticación si el usuario no está autenticado */}
      {status !== "authenticated" ? (
        <>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegistrationScreen} />
        </>
      ) : (
        <>
         {/* Renderizar la pantalla principal si el usuario está autenticado */}
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

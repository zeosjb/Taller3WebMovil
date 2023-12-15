import React, { useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from "../context/AuthContext";

import MainScreen from "../views/MainScreen";
import LoginScreen from '../views/LoginScreen';
import RegistrationScreen from "../views/RegistrationScreen"
import HomeScreen from "../views/HomeScreen"

const Stack = createStackNavigator();

export const Navigator = () => {
  const { status } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {status !== "authenticated" ? (
        <>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegistrationScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

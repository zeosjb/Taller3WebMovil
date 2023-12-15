import React, { useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../views/LoginScreen';
import RegistrationScreen from "../views/RegistrationScreen"
import { AuthContext } from "../context/AuthContext";

const Stack = createStackNavigator();

export const Navigator = () => {
  const {status} = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
        (status !== "authenticated")
        ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegistrationScreen} />
          </>
        ) : (
          <>
            
          </>
        )
      }
    </Stack.Navigator>
  );
};
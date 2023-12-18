import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { authReducer } from "./authReducer";
import userApi from "../api/userApi";

/**
 * Estado inicial del contexto de autenticación.
 *
 * @type {Object}
 * @property {string} status - Estado de la autenticación ("checking", "authenticated", "notAuthenticated").
 * @property {string | null} token - Token de autenticación.
 * @property {Object | null} user - Información del usuario autenticado.
 * @property {Array} errorMessage - Lista de mensajes de error.
 */
const authInitalState = {
  status: "checking",
  token: null,
  user: null,
  errorMessage: [],
};

/**
 * Contexto de autenticación para gestionar el estado de la autenticación en la aplicación.
 * Proporciona funciones para realizar acciones como registro, inicio de sesión, cierre de sesión, etc.
 *
 * @type {React.Context}
 */
export const AuthContext = createContext();

/**
 * Proveedor de autenticación que utiliza el contexto de autenticación en la aplicación.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes secundarios anidados.
 * @returns {React.ReactNode} Componente con el contexto de autenticación proporcionado.
 */
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitalState);

  useEffect(() => {
    checkToken();
  }, []);

  /**
   * Verifica la existencia de un token almacenado en AsyncStorage y actualiza el estado en consecuencia.
   *
   * @async
   * @function
   * @returns {Promise<void>} Promesa que se resuelve después de verificar el token.
   */
  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      dispatch({ type: "notAuthenticated" });
    }
  };

  /**
   * Registra a un nuevo usuario utilizando la API y actualiza el estado en consecuencia.
   *
   * @async
   * @function
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} rut - RUT del usuario.
   * @param {string} birthDate - Fecha de nacimiento del usuario.
   * @param {string} name - Nombre del usuario.
   * @returns {Promise<void>} Promesa que se resuelve después de realizar la operación.
   */
  const signUp = async (email, rut, birthDate, name) => {
    try {
      const response = await userApi.post("auth/user/register", {
        email,
        rut,
        birthDate,
        name,
      });
      dispatch({
        type: "signUp",
        payload: {
          token: response.data.token,
          user: response.data.user,
        },
      });
      await AsyncStorage.setItem("token", response.data.token);
    } catch (error) {
      alert(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      dispatch({
        type: "addError",
        payload: error.response
          ? error.response.data.errors
          : "Error desconocido",
      });
    }
  };

  /**
   * Inicia sesión con las credenciales proporcionadas y actualiza el estado en consecuencia.
   *
   * @async
   * @function
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} password - Contraseña del usuario.
   * @returns {Promise<void>} Promesa que se resuelve después de realizar la operación.
   */
  const signIn = async (email, password) => {
    try {
      const response = await userApi.post("auth/user/login", {
        email,
        password,
      });
      dispatch({
        type: "signIn",
        payload: {
          token: response.data.token,
          user: response.data.user,
        },
      });
      await AsyncStorage.setItem("token", response.data.token);
    } catch (error) {
      alert(error.response.data);
      dispatch({
        type: "addError",
        payload: error.response.data.errors,
      });
    }
  };

  /**
   * Cierra la sesión del usuario, elimina el token de AsyncStorage y actualiza el estado.
   *
   * @async
   * @function
   * @returns {Promise<void>} Promesa que se resuelve después de cerrar la sesión.
   */
  const logOut = async () => {
    await AsyncStorage.removeItem("token");

    dispatch({
      type: "logout",
    });
  };

  /**
   * Elimina los mensajes de error del estado.
   *
   * @function
   * @returns {void} No devuelve ningún valor.
   */
  const removeError = () => {
    dispatch({ type: "removeError" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        logOut,
        removeError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

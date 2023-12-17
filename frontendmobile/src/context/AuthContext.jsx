import React, { createContext, useEffect, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { authReducer } from "./authReducer";
import userApi from "../api/userApi";

const authInitalState = {
    status: "checking",
    token: null,
    user: null,
    errorMessage: []
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, authInitalState);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
            dispatch({ type: "notAuthenticated"})
        }
    }

    const signUp = async ( email, rut, birthDate, name) => {
        try {
            const response = await userApi.post('/register', { email, rut, birthDate, name });
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.user
                }
            });

            // Almacenar el token del usuario.
            await AsyncStorage.setItem('token', response.data.token);

        } catch (error) {
            console.log(error.response.data.errors)
            dispatch({
                type: 'addError',
                payload: error.response.data.errors
            })
        }
    }

    const signIn = async ( email, password ) => {
        try {
            const response = await userApi.post('/login', { email, password });
            dispatch({
                type: 'signIn',
                payload: {
                    token: response.data.token,
                    user: response.data.user
                }
            });

            // Almacenar el token del usuario.
            await AsyncStorage.setItem('token', response.data.token);


        } catch (error) {
            console.log(error.response.data)
            dispatch({
                type: 'addError',
                payload: error.response.data.errors
            })
        }
    }

    const logOut = async () => {
        await AsyncStorage.removeItem("token");

        dispatch({
            type: "logout",
        })
    }

    const removeError = () => {
        dispatch({type: "removeError"})
    }

    const editProfile = async (id, newEmail, newName, newBirthDate) => {
        try {
            const token = state.token;

            const response = await userApi.put(
                `/editprofile/${id}`,
                { newEmail, newName, newBirthDate },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            dispatch({
                type: 'editProfile',
                payload: {
                    user: response.data.user
                }
            });

        } catch (error) {
            console.log(error.response.data.errors);
            dispatch({
                type: 'addError',
                payload: error.response.data.errors
            });
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signUp,
            logOut,
            removeError,
            editProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}

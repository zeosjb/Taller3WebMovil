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

        try {
            const response = await userApi.get('/token/validate', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            dispatch({
                type: 'signIn',
                payload: {
                    token: response.data.token,
                    user: response.data.user,
                },
            });

        } catch (error) {
            if(error.response.status === 401){
                dispatch({ type: 'notAuthenticated' });
            }
        }
    }

    const signUp = async ({ name, email, password }) => {
        try {
            const { data } = await userApi.post('/register', { name, email, password });
            console.log(data.user);
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
            // console.log(error.response.data.errors)
            dispatch({
                type: 'addError',
                payload: error.response.data.errors
            })
        }
    }

    const signIn = async ({ email, password }) => {
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
            // console.log(error.response.data)
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

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signUp,
            logOut,
            removeError
        }}>
            {children}
        </AuthContext.Provider>
    )
}

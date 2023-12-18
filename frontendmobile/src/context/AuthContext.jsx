import React, { createContext, useEffect, useReducer } from "react";
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
            const response = await userApi.post('auth/user/register', { email, rut, birthDate, name });
            dispatch({
                type: 'signUp',
                payload: {
                    token: response.data.token,
                    user: response.data.user
                }
            });
            await AsyncStorage.setItem('token', response.data.token);
        
        } catch (error) {
            alert('Error details:', error.response ? error.response.data : error.message);
            dispatch({
                type: 'addError',
                payload: error.response ? error.response.data.errors : 'Error desconocido'
            });
        }
    }

    const signIn = async ( email, password ) => {
        try {
            const response = await userApi.post('auth/user/login', { email, password });
            dispatch({
                type: 'signIn',
                payload: {
                    token: response.data.token,
                    user: response.data.user
                }
            });
            await AsyncStorage.setItem('token', response.data.token);


        } catch (error) {
            alert(error.response.data)
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

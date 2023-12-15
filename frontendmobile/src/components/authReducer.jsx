import { View, Text } from 'react-native'
import React from 'react'

export const authReducer = (state, action) => {
    switch (action.type) {
        case "signIn":
            return {
                ...state,
                errorMessage: [],
                status: "authenticated",
                token: action.payload.token,
                user: action.payload.user
            }
        
        case "signUp":
            return {
                ...state,
                errorMessage: [],
                status: "authenticated",
                token: action.payload.token,
                user: action.payload.user
            }

        case "logout":
        case "notAuthenticated":
            return {
                ...state,
                errorMessage: [],
                status: "not-authenticated",
                token: null,
                user: null
            }

        case "addError":
            return {
                ...state,
                errorMessage: action.payload,
                status: "not-authenticated",
                token: null,
                user: null
            }

        case "removeError":
            return {
                ...state,
                errorMessage: []
            }

        default:
            return state;
    }
}
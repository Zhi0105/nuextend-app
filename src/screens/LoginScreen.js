import React from 'react'
import { Login } from '@_components/Pages/Login'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'

export const LoginScreen = ({ navigation }) => {
    return (
        <KeyboardAvoidingTemplate>
            <Login navigation={navigation} />
        </KeyboardAvoidingTemplate>
    )
}

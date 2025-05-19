import React from 'react'
import { Register } from '@_components/Pages/Register'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'

export const RegisterScreen = ({ navigation }) => {
    return (
        <KeyboardAvoidingTemplate>
            <Register navigation={navigation} />
        </KeyboardAvoidingTemplate>
    )
}

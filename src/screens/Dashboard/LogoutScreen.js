import React from 'react'
import { Logout } from '@_components/Pages/Account/Logout'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'

export const LogoutScreen = ({ navigation }) => {
    return (
        <KeyboardAvoidingTemplate>
            <Logout navigation={navigation} />
        </KeyboardAvoidingTemplate>
    )
}
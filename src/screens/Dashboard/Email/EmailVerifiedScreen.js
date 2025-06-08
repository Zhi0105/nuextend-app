import React from 'react'
import { EmailVerified } from '@_components/Pages/Email/EmailVerified'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'

export const EmailVerifiedScreen = ({ navigation, route }) => {
    return (
        <KeyboardAvoidingTemplate>
            <EmailVerified navigation={navigation} route={route}/>
        </KeyboardAvoidingTemplate>
    )
}

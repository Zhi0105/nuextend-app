
import React from 'react'
import { EmailVerifiedFail } from '@_components/Pages/Email/EmailVerifiedFail'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'

export const EmailVerifiedFailScreen = ({ navigation, route }) => {
    return (
        <KeyboardAvoidingTemplate>
            <EmailVerifiedFail navigation={navigation} route={route}/>
        </KeyboardAvoidingTemplate>
    )
}

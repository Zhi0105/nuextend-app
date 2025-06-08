import React from 'react'
import { EmailSendLink } from '@_components/Pages/Email/EmailSendLink'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'

export const EmailSendLinkScreen = ({ navigation, route }) => {
    return (
        <KeyboardAvoidingTemplate>
            <EmailSendLink navigation={navigation} route={route}/>
        </KeyboardAvoidingTemplate>
    )
}

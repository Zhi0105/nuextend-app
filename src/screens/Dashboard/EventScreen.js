import React from 'react'
import { Event } from '@_components/Pages/Account/Event'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'

export const EventScreen = ({ navigation, route }) => {
    return (
        <KeyboardAvoidingTemplate>
            <Event navigation={navigation} route={route} />
        </KeyboardAvoidingTemplate>
    )
}
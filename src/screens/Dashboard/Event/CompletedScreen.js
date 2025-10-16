import React from 'react'
import { Completed } from '@_components/Pages/Account/Event/Completed'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'

export const CompletedScreen = ({ navigation, route }) => {
    return (
        <KeyboardAvoidingTemplate>
            <Completed navigation={navigation} route={route} />
        </KeyboardAvoidingTemplate>
    )
}
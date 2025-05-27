import React from 'react'
import { ScanQR } from '@_components/Pages/Account/ScanQR'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'

export const ScanQRScreen = ({ navigation, route }) => {
    return (
        <KeyboardAvoidingTemplate>
            <ScanQR navigation={navigation} route={route} />
        </KeyboardAvoidingTemplate>
    )
}
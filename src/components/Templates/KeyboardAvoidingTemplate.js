import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const KeyboardAvoidingTemplate = ({ children }) => {
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#fff' }}
        >
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#EEEEEE' }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : -120} // adjust the value according to your needs
            >
                {children}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

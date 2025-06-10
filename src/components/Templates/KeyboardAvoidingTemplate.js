import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export const KeyboardAvoidingTemplate = ({ children }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, backgroundColor: '#EEEEEE', padding: 16 }}
                keyboardShouldPersistTaps="handled"
                >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

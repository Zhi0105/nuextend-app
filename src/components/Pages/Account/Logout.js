import React, { useEffect, useContext } from 'react'
import { Alert } from 'react-native'
import { AuthContext } from '@_context/AuthContext';

export const Logout = ({ navigation }) => {
    const { logout } = useContext(AuthContext)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        Alert.alert(
            'Message from nuextendapp',
            'You really want to sign out ?',
            [
            {
                text: "Yes",
                onPress: () => {
                logout()
                navigation.goBack()
                }
            }, 
            {
                text: "No",
                onPress: () => {
                navigation.goBack()
                }
            }
            ],
            { cancelable: false }
        )
        });

        return unsubscribe;
    }, [navigation])

    return (
        <React.Fragment></React.Fragment>
    )
}
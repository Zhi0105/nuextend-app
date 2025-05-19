import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Platform } from 'react-native'
import SplashScreen from 'react-native-splash-screen'


import { LoginScreen } from "@_screens/LoginScreen";
import { RegisterScreen } from "@_screens/RegisterScreen";


export const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

    useEffect(() => {
        if(Platform.OS === 'android') { SplashScreen.hide() }
    }, [])

    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{
                    animation: 'slide_from_right'
                }}
            />

            <Stack.Screen 
                name="Register" 
                component={RegisterScreen}
                options={{
                    animation: 'slide_from_right'
                }}
            />

        </Stack.Navigator>
    )
}

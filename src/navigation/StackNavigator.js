import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Platform } from 'react-native'
import SplashScreen from 'react-native-splash-screen'


import { LoginScreen } from "@_screens/LoginScreen";
import { RegisterScreen } from "@_screens/RegisterScreen";
import { DrawerNavigator } from "./DrawerNavigator";
import useUserStore from "@_stores/auth";

export const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const { user } = useUserStore((state) => ({
        user: state.user,
    }));

    useEffect(() => {
        if(Platform.OS === 'android') { SplashScreen.hide() }
    }, [])

    if(user) {
        return (
            <Stack.Navigator
                initialRouteName="Account"
                screenOptions={{ headerShown: false }}  
            >
                <Stack.Screen  
                    name="Account" component={DrawerNavigator} 
                    options={{
                    animation:'slide_from_right'
                }}
                />
            </Stack.Navigator>
        )
    } 

    if(!user) {
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
}

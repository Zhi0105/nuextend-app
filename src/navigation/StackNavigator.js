import { useEffect, useState } from "react";
import useUserStore from "@_stores/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { LoginScreen } from "@_screens/LoginScreen";
import { RegisterScreen } from "@_screens/RegisterScreen";
import { EmailVerifiedScreen } from "@_screens/Dashboard/Email/EmailVerifiedScreen";
import { EmailVerifiedFailScreen } from "@_screens/Dashboard/Email/EmailVerifiedFailScreen";
import { EmailSendLinkScreen } from "@_screens/Dashboard/Email/EmailSendLinkScreen";
import { DrawerNavigator } from "./DrawerNavigator";
import { getEmailVerificationStatus } from "@_services/emai";

export const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    
    const { user, token } = useUserStore((state) => ({
        user: state.user,
        token: state.token
    }));

    const [isEmailVerified, setIsEmailVerified] = useState(null); // null = loading, true/false = known

    useEffect(() => {
        if (Platform.OS === 'android') {
            SplashScreen.hide();
        }

        const checkVerification = async () => {
            if (user && token) {
                try {
                    const res = await getEmailVerificationStatus(token);
                    setIsEmailVerified(res?.verified); // or whatever the response shape is
                } catch (e) {
                    console.error("Failed to fetch email verification:", e);
                    setIsEmailVerified(false);
                }
            }
        };

        checkVerification();
    }, [user, token]);

    if (user) {
        if (isEmailVerified === null) {
            // still checking verification
            return null; // or return a loading screen component
        }

        return (
            <Stack.Navigator
                initialRouteName={isEmailVerified ? "Account" : "send-email-link"}
                screenOptions={{ headerShown: false }}
            >
                {isEmailVerified && (
                    <Stack.Screen
                        name="Account"
                        component={DrawerNavigator}
                        options={{ animation: 'slide_from_right' }}
                    />
                )}
                <Stack.Screen
                    name="send-email-link"
                    component={EmailSendLinkScreen}
                    options={{ animation: 'slide_from_right' }}
                    initialParams={{ email: user?.email }} 
                />
            </Stack.Navigator>
        );
    }

    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ animation: 'slide_from_right' }}
            />
        </Stack.Navigator>
    );
};
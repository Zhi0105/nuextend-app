import React, { useEffect } from "react";
import { Routes } from "@_navigation/Routes"
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native"
import { Alert, PermissionsAndroid } from "react-native";
import FlashMessage from 'react-native-flash-message'

import { TanstackProviders } from "./TanstackProviders";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { AuthProviders } from "./AuthProviders";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import messaging from "@react-native-firebase/messaging"

const linking = {
  prefixes: ['nuextend://'],
  config: {
    screens: {
      EmailVerified: 'email-verified',
      EmailError: 'email-verified-error'
    }
  }
};

export const Providers = () => {
    const navigationRef = useNavigationContainerRef();

    const requestPermission = async () => {
      try {
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        if(result === PermissionsAndroid.RESULTS.GRANTED) {
          //request for device token
          requestToken()
        } else {
          Alert.alert("Permission Denied")
        }
      } catch (error) {
        console.log(error)
      }
    }


    const requestToken = async () => {
      try {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log("token", token)
      } catch(err){
        console.log(err)
      }
    }

    useEffect(() => {
        requestPermission()
    }, [])

    // FORGORUND NOTIF

    // useEffect(() => {
    //   const unsubscribe = messaging().onMessage(async remoteMessage => {
    //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //   });

    //   return unsubscribe;
    // }, []);

    return ( 
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <NavigationContainer ref={navigationRef} linking={linking}>
          <ApplicationProvider {...eva} theme={eva.light}>
            <TanstackProviders>
              <AuthProviders>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Routes />
                    <FlashMessage position="top" floating={false} />
                </GestureHandlerRootView>
              </AuthProviders>
            </TanstackProviders>
          </ApplicationProvider>
        </NavigationContainer>
      </React.Fragment>
    )
}

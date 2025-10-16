import React from "react";
import { Routes } from "@_navigation/Routes"
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native"
import FlashMessage from 'react-native-flash-message'

import { TanstackProviders } from "./TanstackProviders";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { AuthProviders } from "./AuthProviders";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

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

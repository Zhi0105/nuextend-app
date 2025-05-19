import React from "react";
import { Routes } from "@_navigation/Routes"
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native"

export const Providers = () => {
    const navigationRef = useNavigationContainerRef();
    return ( 
      <React.Fragment>
        <NavigationContainer ref={navigationRef}>
          <Routes />
        </NavigationContainer>
      </React.Fragment>
    )
}

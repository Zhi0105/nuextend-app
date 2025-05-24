import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"

import { DashboardStack } from "./Stack/DashboardStack"
import { ProfileScreen } from "@_screens/Dashboard/ProfileScreen"
import { LogoutScreen } from "@_screens/Dashboard/LogoutScreen"

export const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator()
    
    return (
        <Drawer.Navigator
            initialRouteName="DashboardStack"
            screenOptions={{
                headerTitle: 'Nuextend App',
                headerStyle: {
                backgroundColor: '#364190',
                },
                headerTintColor: '#fff',
                headerTitleAlign: "center"
            }}
        >
            <Drawer.Screen 
                name="DashboardStack" component={DashboardStack}
                options={{ drawerLabel: "Home" }}
            />
            <Drawer.Screen 
                name="Profile" component={ProfileScreen}
            />
            <Drawer.Screen name="Signout" component={LogoutScreen} />
        </Drawer.Navigator>
    )  
}

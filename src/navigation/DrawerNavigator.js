import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"

import { DashboardStack } from "./Stack/DashboardStack"
import { ProfileScreen } from "@_screens/Dashboard/ProfileScreen"
import { EventScreen } from "@_screens/Dashboard/EventScreen"
import { ScanQRScreen } from "@_screens/Dashboard/ScanQRScreen"
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
            <Drawer.Screen 
                name="UpcomingEvent" component={EventScreen}
                options={{ drawerLabel: "Event" }}
            />
            <Drawer.Screen 
                name="Scanqr" component={ScanQRScreen}
                options={{ drawerLabel: "ScanQR" }}
            />
            <Drawer.Screen name="Signout" component={LogoutScreen} />
        </Drawer.Navigator>
    )  
}

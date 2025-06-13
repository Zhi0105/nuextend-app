import React from "react"
import useUserStore from "@_stores/auth";

import { createDrawerNavigator } from "@react-navigation/drawer"
import { DashboardStack } from "./Stack/DashboardStack"
import { ProfileScreen } from "@_screens/Dashboard/ProfileScreen"
import { EventScreen } from "@_screens/Dashboard/EventScreen"
import { ScanQRScreen } from "@_screens/Dashboard/ScanQRScreen"
import { LogoutScreen } from "@_screens/Dashboard/LogoutScreen"
import _ from "lodash";

export const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator()
    const { user } = useUserStore((state) => ({ user: state.user }));

    const hasOrganizationRole = () => {
        return _.some(user?.organizations, item => [6, 7, 8].includes(item.pivot.role_id))
    }

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
            {hasOrganizationRole() && (
                <Drawer.Screen 
                    name="Scanqr" component={ScanQRScreen}
                    options={{ drawerLabel: "ScanQR" }}
                />
            )}
            <Drawer.Screen name="Signout" component={LogoutScreen} />
        </Drawer.Navigator>
    )  
}

import React from "react"
import { View, Text, Image } from "react-native"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import Icon from "react-native-vector-icons/MaterialIcons"
import Logo from '@_assets/logo.webp'
import _ from "lodash"

import useUserStore from "@_stores/auth"
import { DashboardStack } from "./Stack/DashboardStack"
import { ProfileScreen } from "@_screens/Dashboard/ProfileScreen"
import { EventScreen } from "@_screens/Dashboard/EventScreen"
import { ScanQRScreen } from "@_screens/Dashboard/ScanQRScreen"
import { LogoutScreen } from "@_screens/Dashboard/LogoutScreen"

export const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator()
  const { user } = useUserStore((state) => ({ user: state.user }))

  const hasOrganizationRole = () => {
    return _.some(user?.organizations, (item) => [6, 7, 8].includes(item.pivot.role_id))
  }

  // ✅ Custom Drawer Content with Header Logo
  const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: "center", paddingVertical: 20 }}>
        <Image
          source={Logo}
          style={{ width: 120, height: 60, resizeMode: "contain" }}
        />
        <Text style={{ fontWeight: "bold", color: "#364190", marginTop: 10 }}>Nuextend App</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )

  return (
    <Drawer.Navigator
      initialRouteName="DashboardStack"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitle: "Nuextend App",
        headerStyle: { backgroundColor: "#364190" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => <Icon name="person" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="UpcomingEvent"
        component={EventScreen}
        options={{
          drawerLabel: "Event",
          drawerIcon: ({ color, size }) => <Icon name="event" color={color} size={size} />,
        }}
      />
      {hasOrganizationRole() && (
        <Drawer.Screen
          name="Scanqr"
          component={ScanQRScreen}
          options={{
            drawerLabel: "Scan QR",
            drawerIcon: ({ color, size }) => <Icon name="qr-code-scanner" color={color} size={size} />,
          }}
        />
      )}
      <Drawer.Screen
        name="Signout"
        component={LogoutScreen}
        options={{
          drawerIcon: ({ color, size }) => <Icon name="logout" color={color} size={size} />,
        }}
      />
    </Drawer.Navigator>
  )
}

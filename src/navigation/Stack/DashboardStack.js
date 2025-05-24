import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { DashboardScreen } from "@_screens/Dashboard/DashboardScreen"

export const DashboardStack = () => {
    const Stack = createNativeStackNavigator()
    
    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{ headerShown: false }}  
        >
            <Stack.Screen  
                name="Dashboard" component={DashboardScreen} 
                options={{
                animation:'slide_from_right'
                }}
            />
        </Stack.Navigator>    
    )
}

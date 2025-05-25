import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { DashboardScreen } from "@_screens/Dashboard/DashboardScreen"
import { EventDetailScreen } from "@_screens/Dashboard/Home/EventDetailScreen"

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
            <Stack.Screen  
                name="Event" component={EventDetailScreen} 
                options={{
                    animation:'slide_from_right'
                }}
            />
        </Stack.Navigator>    
    )
}

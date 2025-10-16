import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { EventScreen } from "@_screens/Dashboard/EventScreen"
import { CompletedScreen } from "@_screens/Dashboard/Event/CompletedScreen"

export const EventStack = () => {
    const Stack = createNativeStackNavigator()
    
    return (
        <Stack.Navigator
            initialRouteName="Event"
            screenOptions={{ headerShown: false }}  
        >
            <Stack.Screen  
                name="Event" component={EventScreen} 
                options={{
                    animation:'slide_from_right'
                }}
            />
        
            <Stack.Screen  
                name="Completed" component={CompletedScreen} 
                options={{
                    animation:'slide_from_right'
                }}
            />
        
        </Stack.Navigator>    
    )
}

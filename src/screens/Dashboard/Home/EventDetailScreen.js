import React from "react"
import { EventDetail } from "@_components/Pages/Account/Home/EventDetail"
import { KeyboardAvoidingTemplate } from "@_components/Templates/KeyboardAvoidingTemplate"

export const EventDetailScreen = ({ route, navigation }) => {
    return (
        <KeyboardAvoidingTemplate>
            <EventDetail navigation={navigation} route={route} />
        </KeyboardAvoidingTemplate>
    ) 
}

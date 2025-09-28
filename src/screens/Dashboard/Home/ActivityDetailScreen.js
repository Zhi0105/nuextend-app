import React from "react"
import { ActivityDetail } from "@_components/Pages/Account/Home/ActivityDetail"
import { KeyboardAvoidingTemplate } from "@_components/Templates/KeyboardAvoidingTemplate"

export const ActivityDetailScreen = ({ route, navigation }) => {
    return (
        <KeyboardAvoidingTemplate>
            <ActivityDetail navigation={navigation} route={route} />
        </KeyboardAvoidingTemplate>
    ) 
}

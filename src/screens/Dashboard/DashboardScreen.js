import React from "react"
import { Dashboard } from "@_components/Pages/Account/Dashboard"
import { KeyboardAvoidingTemplate } from "@_components/Templates/KeyboardAvoidingTemplate"

export const DashboardScreen = ({ navigation }) => {
    return (
        <KeyboardAvoidingTemplate>
            <Dashboard navigation={navigation} />
        </KeyboardAvoidingTemplate>
    ) 
}

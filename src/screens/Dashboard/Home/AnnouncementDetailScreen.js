import React from "react"
import { AnnouncementDetail } from "@_components/Pages/Account/Home/AnnouncementDetail"
import { KeyboardAvoidingTemplate } from "@_components/Templates/KeyboardAvoidingTemplate"

export const AnnouncementDetailScreen = ({ route, navigation }) => {
    return (
        <KeyboardAvoidingTemplate>
            <AnnouncementDetail navigation={navigation} route={route} />
        </KeyboardAvoidingTemplate>
    ) 
}

import React from 'react'
import { Profile } from '@_components/Pages/Account/Profile'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'

export const ProfileScreen = ({ navigation, route }) => {
  return (
    <KeyboardAvoidingTemplate>
      <Profile navigation={navigation} route={route} />
    </KeyboardAvoidingTemplate>
  )
}
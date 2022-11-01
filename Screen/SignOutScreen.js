import React from 'react'
import { View, Text, Button } from 'react-native'
import { TokenContext, UsernameContext } from "../Context/Context"

export default function SignOutScreen ({ navigation, route }) {
    return (
        <Button title='Sign me out' onPress={() => {navigation.navigate('Home'); }} />
    )
}
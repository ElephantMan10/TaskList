import React from 'react'
import { View, Text, Button } from 'react-native'

import SignUp from '../components/SignUp'

export default function SignUpScreen({ navigation }) {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <SignUp />
        </View>
    )
}

import React from 'react'
import { View, Text, Button } from 'react-native'
import { Link } from "@react-navigation/native"

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
            <Text>
                Already have an account ?{' '}
                <Link
                    style={{ textDecorationLine: 'underline', color: 'blue' }}
                    to={{ screen: 'Sign In' }}>
                    Sign In
                </Link>
            </Text>
        </View>
    )
}

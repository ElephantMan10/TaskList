import React from 'react'
import { View, Text, Button } from 'react-native'
import { TokenContext } from "../Context/Context"

export default function SignOutScreen({ navigation }) {
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <>
                    <Text>Sign Out</Text>
                    <Button title='Sign me out' onPress={() => setToken(null)} />
                </>
            )}
        </TokenContext.Consumer>
    )
}
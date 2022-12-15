import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { TokenContext } from "../Context/Context"

export default function SignOutScreen({ navigation }) {
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <>
                    <Button title='Sign me out' onPress={() => setToken(null)} style={styles.signOutButton} />
                </>
            )}
        </TokenContext.Consumer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signOutButton: {
        backgroundColor: 'red',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
})
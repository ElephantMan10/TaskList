import React, { useState } from 'react'
import { Text, TextInput, Button, View, StyleSheet, ActivityIndicator } from 'react-native'

import { signIn } from '../API/todoAPI'

import { TokenContext, UsernameContext } from '../Context/Context'

/**
 * This component displays the sign in form.
 */
export default function SignIn() {
    
    const [login, setLogin] = useState('') // login state
    const [password, setPassword] = useState('') // password state
    const [error, setError] = useState('') // error state
    const [visible, setVisible] = useState(true) // visibility state

    // Sign in the user
    const getSignedIn = (setToken, setUsername) => {
        setError('')
        if (login == '' || password == '') return
        setVisible(false)
        signIn(login, password)
            .then(token => {
                setUsername(login)
                setToken(token)
            })
            .catch(err => {
                setError(err.message)
            })
        setVisible(true)
    }

    // Display the sign in form
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => {
                        return (
                            <View>
                                {visible ? (
                                    <>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.label}>Login</Text>
                                            <TextInput
                                                style={styles.text_input}
                                                onChangeText={setLogin}
                                                onSubmitEditing={() =>
                                                    getSignedIn(setToken, setUsername)
                                                }
                                                value={login}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.label}>Password</Text>
                                            <TextInput
                                                style={styles.text_input}
                                                onChangeText={setPassword}
                                                secureTextEntry={true}
                                                onSubmitEditing={() =>
                                                    getSignedIn(setToken, setUsername)
                                                }
                                                value={password}
                                            />
                                        </View>
                                        <Button
                                            onPress={() => getSignedIn(setToken, setUsername)}
                                            title='Sign In'
                                            style={styles.signInButton}
                                            color='green'
                                        />
                                        {error ? (
                                            <Text style={styles.text_error}>{error}</Text>
                                        ) : (
                                            []
                                        )}
                                    </>
                                ) : (
                                    <ActivityIndicator />
                                )}
                            </View>
                        )
                    }}
                </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
    )
}

const styles = StyleSheet.create({
    label: {
        width: 70
    },
    text_error: {
        color: 'red'
    },
    text_input: {
        backgroundColor: 'white',
        margin: 5
    },
    signInButton: {
        backgroundColor: 'green',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
})

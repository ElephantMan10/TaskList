import React, { useState, useContext, useEffect } from 'react'
import { Text, TextInput, Button, View, StyleSheet, ActivityIndicator } from 'react-native'

import { signUp } from '../API/todoAPI'

import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'

/**
 * This component displays the sign up form.
 */
export default function SignUp() {

    const [login, setLogin] = useState('') // new login state
    const [password, setPassword] = useState('') // new password state
    const [copyPassword, setCopyPassword] = useState('') // new password copy state
    const [error, setError] = useState('') 
    const [visible, setVisible] = useState(true) // visibility state

    // Sign up the user
    const getSignedUp = (setToken, setUsername) => {
        setError('')
        if (login == '' || password == '' || copyPassword == '') return
        if (password != copyPassword) {
            setError("Passwords don't match")
            return
        }
        setVisible(false)
        signUp(login, password)
            .then(token => {
                setUsername(login)
                setToken(token)
                console.log('token', token)
            })
            .catch(err => {
                setError(err.message)
            })
        setVisible(true)
    }

    // Display the sign up form
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
                                                    getSignedUp(setToken, setUsername)
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
                                                    getSignedUp(setToken, setUsername)
                                                }
                                                value={password}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.label}>Password Again</Text>
                                            <TextInput
                                                style={styles.text_input}
                                                onChangeText={setCopyPassword}
                                                secureTextEntry={true}
                                                onSubmitEditing={() =>
                                                    getSignedUp(setToken, setUsername)
                                                }
                                                value={copyPassword}
                                            />
                                        </View>
                                        <Button
                                            onPress={() => getSignedUp(setToken, setUsername)}
                                            title='Sign Up'
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
        //borderWidth: 1,
        backgroundColor: 'white',
        margin: 5
    }
})

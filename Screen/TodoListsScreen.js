// prints the list of todo lists

import React from 'react';
import { View, Text, Button } from 'react-native';
import { TokenContext, UsernameContext } from '../Contexte/Contexte';

export default function TodoListsScreen ({ navigation }) {
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => {
                        return (
                            <>
                                <Text>Welcome {username} !</Text>
                                <Text>Your token is {token}</Text>
                                <Button
                                    title="Sign out"
                                    onPress={() => {
                                        setUsername("")
                                        setToken("")
                                        navigation.navigate("SignOut")
                                    }}
                                />
                            </>
                        )
                    }}
                </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
    )
}
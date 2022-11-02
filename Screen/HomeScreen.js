import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { TokenContext, UsernameContext } from "../Context/Context";

export default function HomeScreen() {
    return (
        <UsernameContext.Consumer>
            {([username, setUsername]) => {
                return (
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text>Welcome !</Text>
                        <Text>You are logged as {username}</Text>
                    </View>
                )
            }}
        </UsernameContext.Consumer>
    )
}
import React, {useContext} from "react";
import { View, Text, Button } from "react-native";
import { TokenContext, UsernameContext } from "../Context/Context";

export default function HomeScreen () {
    const [username, setUsername] = useContext(UsernameContext)
    return (
        <>
            <Text>Welcome !</Text>
            <Text>You are logged as {username}</Text>
        </>
    )
}
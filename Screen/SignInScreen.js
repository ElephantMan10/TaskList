import React from "react"
import { View, Text, Button } from "react-native"
import { TokenContext, UsernameContext } from "../Contexte/Contexte"

export default function SignInScreen ({ navigation }) {
    return (
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
            {([username, setUsername]) => {
                return (
                    <>
                    <Text>Sign in</Text>
                    <Button
                        title="Sign in"
                        onPress={() => {
                        setUsername("John")
                        setToken("12345")
                        navigation.navigate("Home")
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
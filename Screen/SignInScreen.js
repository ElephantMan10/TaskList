import React from "react"
import { View, Text, Button } from "react-native"
import { TokenContext, UsernameContext } from "../Context/Context"

export default function SignInScreen ({ navigation }) {
    return (
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
            {([username, setUsername]) => {
                return (
                    <>

                    </>
                )
            }}
          </UsernameContext.Consumer>
        )}
      </TokenContext.Consumer>
    )
  }
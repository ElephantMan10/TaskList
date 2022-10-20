import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TokenContext, UsernameContext } from './Context/Context'
import Navigation from './Navigation/Navigation';

export default function App () {
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState(null)

  console.log('token', token)
  return (
    <View style={styles.container}>
     <UsernameContext.Provider value={[username, setUsername]}>
       <TokenContext.Provider value={[token, setToken]}>
        <Navigation />
       </TokenContext.Provider>
     </UsernameContext.Provider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});

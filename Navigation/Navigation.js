import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import TodoListsScreen from '../Screen/TodoListsScreen'
import HomeScreen from '../Screen/HomeScreen'
import SignInScreen from '../Screen/SignInScreen'
import SignOutScreen from '../Screen/SignOutScreen'
import SignUpScreen from '../Screen/SignUpScreen'
import TodoListScreen from '../Screen/TodoListScreen'
import ManageUsersScreen from '../Screen/ManageUsersScreen'

import { TokenContext, UsernameContext } from '../Context/Context'

const Stack = createStackNavigator()

function TodoNavigation () {
    return (
       <Stack.Navigator>
            <Stack.Screen name='Todo lists' component={TodoListsScreen} option={{title:"List of task lists"}} />
            <Stack.Screen name='Todo List' component={TodoListScreen} options={{title:"Task list"}} />
       </Stack.Navigator> 
    )
}

const Tab = createBottomTabNavigator()

export default function Navigation () {
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => (
                        <NavigationContainer>
                            {token == null ? (
                                <Tab.Navigator
                                    screenOptions={({route}) => ({
                                        tabBarActiveTintColor: 'blue',
                                        tabBarInactiveTintColor: 'gray',
                                        tabBarStyle:{paddingVertical: 5,borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:'white',position:'absolute',height:50},
                                        tabBarLabelStyle:{paddingBottom:3},
                                        tabBarIcon: ({focused, color, size}) => {
                                            let iconName;
                                            if (route.name === 'Sign In') {
                                                iconName = !focused ? 'ios-log-in-outline' : 'ios-log-in-sharp';
                                            } else if (route.name === 'Sign Up') {
                                                iconName = !focused ? 'ios-log-in-outline' : 'ios-log-in-sharp';
                                            }
                                            return <Ionicons name={iconName} size={size} color={color} />;
                                        }
                                    })}>
                                    <Tab.Screen name='Sign In' component={SignInScreen} />
                                    <Tab.Screen name='Sign Up' component={SignUpScreen} />
                                </Tab.Navigator>
                            ) : (
                                <Tab.Navigator
                                    screenOptions={({route}) => ({
                                        tabBarActiveTintColor: 'blue',
                                        tabBarInactiveTintColor: 'gray',
                                        tabBarStyle:{paddingVertical: 5,borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:'white',position:'absolute',height:50},
                                        tabBarLabelStyle:{paddingBottom:3
                                        },
                                        tabBarIcon: ({focused, color, size}) => {
                                            let iconName;
                                            if (route.name === 'Home') {
                                                iconName = focused ? 'ios-information-circle-sharp' : 'ios-information-circle-outline';
                                            } else if (route.name === 'TodoLists') {
                                                iconName = !focused ? 'ios-checkbox-outline' : 'ios-checkbox-sharp';
                                            } else if (route.name === 'SignOut') {
                                                iconName = !focused ? 'ios-log-out-outline' : 'ios-log-out-sharp';
                                            } else if (route.name === 'ManageUsers') {
                                                iconName = !focused ? 'ios-people-outline' : 'ios-people-sharp';
                                            }
                                            return <Ionicons name={iconName} size={size} color={color} />;
                                        }
                                    })}
                                >
                                    <Tab.Screen name='Home' component={HomeScreen} />
                                    <Tab.Screen name='TodoLists' component={TodoNavigation} />
                                    {username === 'admin' ? (
                                            <>
                                                <Tab.Screen name='ManageUsers' component={ManageUsersScreen} />
                                                <Tab.Screen name='SignOut' component={SignOutScreen} />
                                            </>
                                        ) : (
                                            <Tab.Screen name='SignOut' component={SignOutScreen} />
                                        )
                                    }
                                </Tab.Navigator>
                            )}
                        </NavigationContainer>
                    )}
                </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
    )
}

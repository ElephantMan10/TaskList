import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TodoListsScreen from '../Screen/TodoListsScreen'
import HomeScreen from '../Screen/HomeScreen'
import SignInScreen from '../Screen/SignInScreen'
import SignOutScreen from '../Screen/SignOutScreen'
import SignUpScreen from '../Screen/SignUpScreen'

import { TokenContext } from '../Context/Context'

const Tab = createBottomTabNavigator()

export default function Navigation () {
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <NavigationContainer>
                    {token == null ? (
                        <Tab.Navigator
                            screenOptions={({route}) => ({
                                tabBarActiveTintColor: 'blue',
                                tabBarInactiveTintColor: 'gray',
                                //Tab bar styles can be added here
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
                                //Tab bar styles can be added here
                                tabBarStyle:{paddingVertical: 5,borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:'white',position:'absolute',height:50},
                                tabBarLabelStyle:{paddingBottom:3
                                },
                                tabBarIcon: ({focused, color, size}) => {
                                    let iconName;
                                    if (route.name === 'Home') {
                                        iconName = !focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                                    } else if (route.name === 'TodoLists') {
                                        iconName = !focused ? 'ios-checkbox-outline' : 'ios-checkbox-sharp';
                                    } else if (route.name === 'SignOut') {
                                        iconName = !focused ? 'ios-log-out-outline' : 'ios-log-out-sharp';
                                    }
                                    return <Ionicons name={iconName} size={size} color={color} />;
                                }
                            })}
                        >
                            <Tab.Screen name='Home' component={HomeScreen} />
                            <Tab.Screen name='TodoLists' component={TodoListsScreen} />
                            <Tab.Screen name='SignOut' component={SignOutScreen} />
                        </Tab.Navigator>
                    )}
                </NavigationContainer>
            )}
        </TokenContext.Consumer>
    )
}

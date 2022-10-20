// prints the list of todo lists

import React from 'react';
import { View, Text, Button } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context';
import { TodoLists } from './TodoLists';

export default function TodoListsScreen ({ navigation }) {
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => {
                        
                    }}
                </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
    )
}
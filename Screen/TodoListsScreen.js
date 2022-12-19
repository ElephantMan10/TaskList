import React from 'react'
import TodoLists from '../components/TodoLists'

export default function TodoListsScreen({navigation}){
    return (
        <TodoLists navigation={navigation} />
    )
}
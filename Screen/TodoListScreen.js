import React from 'react'
import TodoList from '../components/TodoList'

export default function TodoListScreen({route, navigation}){
    return (
        <TodoList route={route} navigation={navigation} />
    )
}
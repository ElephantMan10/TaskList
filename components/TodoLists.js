import React, {useState, useEffect} from "react";
import { View, Text, Button } from "react-native";
// import { TodoList } from "../components/TodoList";
import { getTodoLists } from "../API/todoAPI"

export default function TodoLists () {

    const [todoLists, setTodoLists] = useState(getTodoLists(username, token))
    return (
        <Text>Liste des TodoLists</Text>

    )
}

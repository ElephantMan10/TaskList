import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { TodoList } from "./TodoList";
import { getTodoLists, createTodoList, deleteTodoList } from '../API/todoAPI'
import { TokenContext, UsernameContext } from '../Context/Context'
import { FlatList, TextInput } from "react-native-gesture-handler";

export default function TodoLists ({navigation}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [token, setToken] = useContext(TokenContext);
    const [username, setUsername] = useContext(UsernameContext);
    const [todoListName, setTodoListName] = useState("");
    const [todoLists, setTodoLists] = useState(getTodoLists(username, token));


    useEffect(() => {
        getTodoLists(username, token)
            .then(lists => {
                setTodoLists(lists);
                setLoading(false);
            })
            .catch(error => {
                setError(true);
                setLoading(false);
            });
    }
    , []);

    const addTodoList = () => {
        if(todoListName !== "") {
            createTodoList(todoListName, username, token)
                .then(todoList => {
                    setTodoLists([...todoLists, todoList[0]]);
                    setTodoListName("");
                })
                .catch(error => {
                    setError(true);
                });
        }
    }

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error!</Text>;
    }

    return (
        <View>
            <Text style={styles.titre}>Todo Lists</Text>
            <FlatList
                data={todoLists}
                renderItem={({item}) => (
                    <Text>{item.title}</Text>
                )}
                keyExtractor={item => item.id}
            />
            <TextInput 
                placeholder="Todo List Name"
                onChangeText={setTodoListName}
                value={todoListName}
            />
            <Button title="Add Todo List" onPress={addTodoList} />
        </View>
    );
}

const styles = StyleSheet.create({
    titre: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
})
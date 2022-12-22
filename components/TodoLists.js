import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import { TodoList } from "./TodoList";
import { getTodoLists, createTodoList, deleteTodoList } from '../API/todoAPI'
import { TokenContext, UsernameContext } from '../Context/Context'
import { FlatList, TextInput } from "react-native-gesture-handler";
import { ProgressBar } from "react-native-web";

/**
 * This component displays the list of todo lists of the user.
 */
export default function TodoLists ({navigation}) {
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(false); // Error state
    const [token, setToken] = useContext(TokenContext); // Token context
    const [username, setUsername] = useContext(UsernameContext); // Username context
    const [todoListName, setTodoListName] = useState(""); // new todo list name
    const [todoLists, setTodoLists] = useState([]); // Todo lists state

    // Get the todo lists of the user
    useEffect(() => {
        getTodoLists(username, token)
            .then(lists => {
                setTodoLists(lists);
                setLoading(false);
            }).catch(error => {
                setError(true);
                setLoading(false);
            });
    }
    , []);

    // Add a new todo list
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

    // Delete a todo list
    const delTodoList = (id) => {
        deleteTodoList(id, username, token)
            .then(() => {
                setTodoLists(todoLists.filter(todoList => todoList.id !== id));
            })
            .catch(error => {
                setError(true);
            });
    }

    if (loading) {
        return (
            <>
                <ProgressBar indeterminate trackColor="#D1E3F6" />
                <Text>Loading...</Text>
            </>
        );
    }

    if (error) {
        return <Text>Error!</Text>;
    }

    // Display the todo lists
    return (
        <ScrollView style={{flex:1}}>
            <Text style={styles.title}>My lists:</Text>
            <FlatList
                data={todoLists}
                style={styles.todoList}
                renderItem={({item}) => (
                    <>
                        <Text style={styles.todoList}>{item.title}</Text>   
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <Button title="Open" onPress={() => navigation.navigate('Todo List', {todoListId: item.id, todoListTitle: item.title})} />
                            <Button title="Delete" onPress={() => delTodoList(item.id)} />
                        </View>
                    </>
                )}
                keyExtractor={item => item.id}
            />
            <TextInput 
                style={styles.input}
                placeholder="Todo List Name"
                onChangeText={setTodoListName}
                value={todoListName}
            />
            <Button title="Add Todo List" onPress={addTodoList} style={styles.addButton} />
            <View style={{margin:25}}> </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    todoList: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    addButton: {
        marginTop: 20,
    },
    scrollView: {
        marginHorizontal: 20,
    },
})
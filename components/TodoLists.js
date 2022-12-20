import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import { TodoList } from "./TodoList";
import { getTodoLists, createTodoList, deleteTodoList } from '../API/todoAPI'
import { TokenContext, UsernameContext } from '../Context/Context'
import { FlatList, TextInput } from "react-native-gesture-handler";
import { ProgressBar } from "react-native-web";

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

    return (
        <View style={{flex:1}}>
            <Text style={styles.title}>Todo Lists</Text>
            <ScrollView
                style={styles.todoLists}
                contentContainerStyle={{alignItems: 'center'}}
            >
                <FlatList
                    data={todoLists}
                    style={styles.todoList}
                    renderItem={({item}) => (
                        // <Button title={item.title} onPress={() => navigation.navigate('TodoList', {todoListId: item.id})} />
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
            </ScrollView>
            <TextInput 
                style={styles.input}
                placeholder="Todo List Name"
                onChangeText={setTodoListName}
                value={todoListName}
            />
            <Button title="Add Todo List" onPress={addTodoList} style={styles.addButton} />
            <View style={{margin:25}}> </View>
        </View>
    );
}

//modifier le code pour faire agir un Navigation et ainsi naviguer entre la liste des todoLists et la liste des todoItems

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
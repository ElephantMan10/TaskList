import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, ScrollView } from 'react-native';

import { getTodoListItems, createTodoItem, deleteTodoItem, updateTodoItem } from '../API/todoAPI';
import TodoItem from './TodoItem';
import { TokenContext, UsernameContext } from '../Context/Context';
import { ProgressBar } from "react-native-web";

/**
 * This component displays the list of todo items of a todo list.
 * We made sure not to ask for the todo list entirely when we do modifications on the todo items.
 */
export default function TodoList({ route, navigation }) {

    const {todoListId, todoListTitle} = route.params; // Get the todo list id and title from the route params
    const [token, setToken] = useContext(TokenContext); // Token context
    const [username, setUsername] = useContext(UsernameContext); // Username context
    const [listToDo, setListToDo] = useState([]); // Todo items state
    const [count, setCount] = useState(listToDo.filter((item)=>item.done).length); // Count of done todo items
    const [newTodoText, setNewTodoText] = useState(''); // New todo item text
    const [showDone, setShowDone] = useState(true); // Show done todo items state
    const [showNotDone, setShowNotDone] = useState(true); // Show not done todo items state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(false); // Error state

    // Get the todo items of the todo list
    useEffect(() => {
        getTodoListItems(todoListId, username, token)
            .then(list => {
                setListToDo(list);
                setCount(list.filter((item)=>item.done).length);
                setLoading(false);
            })
            .catch(error => {
                console.log("getTodoListItems get error: ", error);
                setError(true);
                setLoading(false);
            });
    }, []);

    // Change the done state of a todo item
    const changeItem = (id) => {
        const changedB = (!(((listToDo.find(item => item.id === id))).done));
        updateTodoItem(id, changedB, token).then(() => {
                const newList = listToDo.map((item) => {
                    if(item.id === id){
                        item.done = !item.done;
                    }
                    return item;
                });
                setListToDo(newList);
                setCount(newList.filter((item)=>item.done).length);
            }).catch(error => {
            console.log("changeItem get error: ", error);
            setError(true);
            setLoading(false);
        });
    };

    // Delete a todo item
    const deleteItem = (id) => {
        deleteTodoItem(id, token).then(() => {
            const newList = listToDo.filter((item) =>item.id!==id);
            setListToDo(newList);
            setCount(newList.filter((item) => item.done).length);
        }).catch(error => {
            console.log("deleteItem get error: ", error);
            setError(true);
            setLoading(false);
        });
    };

    // Add a todo item
    const addItem = () => {
        createTodoItem(todoListId, newTodoText,token).then(item => {
            const newList = [...listToDo, item[0]];
            setNewTodoText('');
            setListToDo(newList);
        }).catch(error => {
            console.log("addItem get error: ", error);
            setError(true);
            setLoading(false);
        });
    };

    // puts all items to done
    const allDone = () => {
        const newList = listToDo.map((item) => {
            updateTodoItem(item.id, true, token);
            item.done = true;
            return item;
        });   
        setListToDo(newList);
        setCount(newList.filter(item=>item.done).length);
    };

    // puts all items to not done
    const allNotDone = () => {
        const newList = listToDo.map((item) => {
            updateTodoItem(item.id, false, token);
            item.done = false;
            return item;
        });   
        setListToDo(newList);
        setCount(0);
    };

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

    // the display of the todo list
    return (
        <ScrollView style={styles.content} 
            contentContainerStyle={styles.content_container}
        >
            <Text style={styles.title}>Todo list : {todoListTitle}</Text>
            <TextInput
                style={styles.text_input}
                onChangeText={setNewTodoText}
                placeholder='Type a new item here'
                onSubmitEditing={addItem}
                value={newTodoText}
            />
            <Button
                title='Add'
                onPress={addItem}
            />
            <Text style={styles.text}>Tasks already done : {count}</Text>
            <FlatList
                style={styles.list}
                data={listToDo.filter((item) => (item.done && showDone) || (!item.done && showNotDone))}
                // data={listToDo}
                renderItem={({item}) => <TodoItem item={item} changeItem={changeItem} deleteItem={deleteItem} allDone={allDone} allNotDone={allNotDone}/>} />
            <ProgressBar progress={count/listToDo.length} trackColor='#D1E3F6' style={styles.progressBar} />
            <Button
                title={showDone ? 'Hide all done tasks' : 'Show all done tasks'}
                onPress={() => setShowDone(!showDone)}
                color={showDone ? 'green' : 'red'}
            />
            <View style={styles.space} />
            <Button
                title={showNotDone? 'Hide all undone tasks' : 'Show all undone tasks'}
                onPress={() => setShowNotDone(!showNotDone)}
                color={showNotDone ? 'green' : 'red'}
            />
            <View style={styles.space} />
            <Button
                title='Show all tasks'
                onPress={() => {setShowDone(true); setShowNotDone(true);}}
            />
            <View style={styles.space} />
            <Button
                title='Mark all as done'
                onPress={allDone}
            />
            <View style={styles.space} />
            <Button
                title='Mark all as undone'
                onPress={allNotDone}
            />
            <View style={styles.endspace} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    content: {
        flex:1,
    },
    content_container: {
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    text: {
        margin: 10,
    },
    text_input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    space: {
        width: 10,
        height: 20,
    },
    scrollview: {
        flex: 1,
    },
    scrollview_content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressBar: {
        height: 20,
        width: 300,
        margin: 5,
    },
    endspace: {
        height: 50,
    }
  });
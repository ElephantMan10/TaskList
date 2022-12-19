import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch } from 'react-native';

import todoData from '../Helpers/todoData';
import { getTodoList, getTodoListItems, createTodoItem, deleteTodoItem, updateTodoItem } from '../API/todoAPI';
import TodoItem from './TodoItem';
import { TokenContext, UsernameContext } from '../Context/Context';

export default function TodoList({ route, navigation }) {
    const {todoListId} = route.params;
    const [token, setToken] = useContext(TokenContext);
    const [username, setUsername] = useContext(UsernameContext);
    const [listToDo, setListToDo] = useState([]);
    const [count, setCount] = useState(listToDo.filter((item)=>item.done).length);
    const [newTodoText, setNewTodoText] = useState('');
    const [showDone, setShowDone] = useState(true);
    const [showNotDone, setShowNotDone] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    console.log("token : " + token);
    
    useEffect(() => {
        getTodoListItems(todoListId, username, token)
            .then(list => {
                console.log("getTodoListItems list: ", list);
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

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error!</Text>;
    }

    const changeItem = (id) => {
        updateTodoItem(id, username, token).then(() => {
            setListToDo(getTodoListItems(todoListId, username, token));
            setCount(listToDo.filter((item)=>item.done).length);
        }).catch(error => {
            console.log("changeItem get error: ", error);
            setError(true);
            setLoading(false);
        });
        // setListToDo(getTodoListItems(todoListId, username, token));
        // setCount(listToDo.filter((item=>item.done)).length);
    };
    const deleteItem = (id) => {
        deleteTodoItem(id, username, token).then(() => {
            setListToDo(getTodoListItems(todoListId, username, token));
            setCount(listToDo.filter(item=>item.done).length);
        }).catch(error => {
            console.log("deleteItem get error: ", error);
            setError(true);
            setLoading(false);
        });
        // setListToDo(getTodoListItems(todoListId, username, token));
        // setCount(listToDo.filter(item=>item.done).length);
    };
    const addItem = () => {
        createTodoItem(newTodoText, username, token).then(() => {
            setListToDo(getTodoListItems(todoListId, username, token));
            setNewTodoText('');
            setCount(listToDo.filter(item=>item.done).length);
        }).catch(error => {
            console.log("addItem get error: ", error);
            setError(true);
            setLoading(false);
        });
    };
    const allDone = () => {
        const newList = listToDo.map(item => {
            item.done = true;
            return item;
        });
        setListToDo(newList);
        setCount(newList.filter(item=>item.done).length);
    };
    const allNotDone = () => {
        const newList = listToDo.map(item => {
            item.done = false;
            return item;
        });
        setListToDo(newList);
        setCount(newList.filter(item=>item.done).length);
    };
    return (
        <View style={styles.content}>
            <TextInput
                style={styles.text_input}
                onChangeText={setNewTodoText}
                placeholder='saisir ici un nouvel item'
                onSubmitEditing={addItem}
                value={newTodoText}
            />
            <Button
                title='Ajouter'
                onPress={addItem}
            />
            <Text style={styles.text}>Nombre de tâches déjà effectuées : {count}</Text>
            <FlatList
                style={styles.list}
                data={listToDo.filter((item) => (item.done && showDone) || (!item.done && showNotDone))}
                // data={listToDo}
                renderItem={({item}) => <TodoItem item={item} changeItem={changeItem} deleteItem={deleteItem} allDone={allDone} allNotDone={allNotDone}/>} />
            <Button
                title={showDone ? 'Masquer les tâches terminées' : 'Afficher les tâches terminées'}
                onPress={() => setShowDone(!showDone)}
                color={showDone ? 'green' : 'red'}
            />
            <View style={styles.space} />
            <Button
                title={showNotDone? 'Masquer les items non terminés' : 'Afficher les items non terminés'}
                onPress={() => setShowNotDone(!showNotDone)}
                color={showNotDone ? 'green' : 'red'}
            />
            <View style={styles.space} />
            <Button
                title='Tout afficher'
                onPress={() => {setShowDone(true); setShowNotDone(true);}}
            />
            <View style={styles.space} />
            <Button
                title='Tout marquer comme terminé'
                onPress={allDone}
            />
            <View style={styles.space} />
            <Button
                title='Tout marquer comme non terminé'
                onPress={allNotDone}
            />
            <View style={styles.space} />
        </View>
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
        // flexDirection: 'row',
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
  });
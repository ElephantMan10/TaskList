import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch } from 'react-native';

import todoData from '../Helpers/todoData';
import { getTodoList, getTodoListItems, createTodoItem, deleteTodoItem, updateTodoItem } from '../API/todoAPI';
import TodoItem from './TodoItem';
import { TokenContext, UsernameContext } from '../Context/Context';

export default function TodoList({ route, navigation }) {

    const {todoListId, todoListTitle} = route.params;
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

    const addItem = () => {
        createTodoItem(todoListTitle, username, newTodoText,token).then(item => {
            const newList = [...listToDo, item[0]];
            setNewTodoText('');
            setListToDo(newList);
        }).catch(error => {
            console.log("addItem get error: ", error);
            setError(true);
            setLoading(false);
        });
    };

    const allDone = () => {
        const newList = listToDo.map((item) => {
            updateTodoItem(item.id, true, token);
            item.done = true;
            return item;
        });   
        setListToDo(newList);
        setCount(newList.filter(item=>item.done).length);
    };

    const allNotDone = () => {
        const newList = listToDo.map((item) => {
            updateTodoItem(item.id, false, token);
            item.done = false;
            return item;
        });   
        setListToDo(newList);
        setCount(0);
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
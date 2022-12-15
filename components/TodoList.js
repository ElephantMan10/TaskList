import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch } from 'react-native';

import todoData from '../Helpers/todoData';
import { getTodoListItems, creatTodoItem, deleteTodoItem, updateTodoItem } from '../API/todoAPI';
import TodoItem from './TodoItem';

export default function TodoList({ navigation }) {
    const [count, setCount] = useState(todoData.filter((item)=>item.done).length);
    const [listToDo, setListToDo] = useState(todoData);
    const [newTodoText, setNewTodoText] = useState('');
    const [showDone, setShowDone] = useState(true);
    const [showNotDone, setShowNotDone] = useState(true);

    const changeItem = (id) => {
        const newList = listToDo.map(item => {
            if(item.id == id) {
                item.done = !item.done;
            } 
            return item;
        });
        setListToDo(newList)
        setCount(newList.filter((item=>item.done)).length);
    };
    const deleteItem = (id) => {
        const newList = listToDo.filter(item => item.id != id);
        setListToDo(newList);
        setCount(newList.filter(item=>item.done).length);
    };
    const addItem = () => {
        //get max id from tab item
        const maxId = Math.max(...listToDo.map(item => item.id));
        const newList = [...listToDo, {id: maxId+1, content: newTodoText, done: false}];
        setListToDo(newList);
        setNewTodoText('');
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
import { StyleSheet, Switch, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from "react";

/**
 * This component displays a todo item.
 */
export default function TodoItem(props){

    const [done, setdone] = useState(props.item.done); // Done state

    // Load the done state of the item
    useEffect(() => {
        setdone(props.item.done);
    }
    , [props.item.done]);

    // Toggle the done state of the item
    const toggleSwitch = () => {
        props.changeItem(props.item.id); 
        setdone(!done);
    };

    // Delete the item
    const deleteItem = () => {
        props.deleteItem(props.item.id);
    };
    
    // Display the item
    return (
        <View style={styles.content}>
            <TouchableOpacity onPress={deleteItem}>
                <Image source={require('../assets/trash-can-outline.png')} style={styles.image}/>
            </TouchableOpacity>
            <Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>{props.item.content}</Text>
            <Switch
                onValueChange={toggleSwitch}
                value={done}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'row',
        margin: 5,
    },
    text_item: {
        marginLeft: 10,
        width: 150
    },
    image: {
        height:20,
        width:20,
    },
    text_item: {
        marginLeft: 10,
        width: 150
    }
})
import { StyleSheet, Switch, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from "react";

export default function TodoItem(props){
    const [done, setdone] = useState(props.item.done);
    const toggleSwitch = () => {props.changeItem(props.item.id) ; setdone(!done);};
    const deleteItem = () => {props.deleteItem(props.item.id);};
    useEffect(() => {
        setdone(props.item.done);
    }
    , [props.item.done]);
    
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
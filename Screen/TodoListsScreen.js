import React from 'react'
import { View, Text, Button } from 'react-native'
import TodoLists from './TodoLists'
// import TodoList from '../components/TodoList'


export default function TodoLists(){
    // get from api the lists of todolists
    // display the lists of todolists with a button to go to the todolist

    const [todos, setTodos] = useState([]);
    // The text of the TextInput
    const [newTodo, setNewTodo] = useState("");
    const [count, setCount] = useState(todos.filter(todo => todo.done).length);
    const [filter, setFilter] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState(todos);
    // Liste the options for the filter
    const filterOptions = ["all", "done", "todo"];


    return (
        <View>
           
            <ListItem data={filteredTodos} _onDelete={deleteTodo} _onCheck={updateTodo}/>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: "5%",
        padding: "5%",
        backgroundColor: "#f5f5f5"
    },
    header: {
        flex: 3,
    },
    listItem: {
        flex: 8,
        width: "100%",
    },
    addInput: {
        flex: 1,
    },
    empty: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
        margin: "auto"
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '100%',
    },
    button: {
        flex: 1,
    }
});
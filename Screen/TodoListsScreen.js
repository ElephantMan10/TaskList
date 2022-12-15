import React from 'react'
import { View, Text, Button } from 'react-native'
import TodoLists from './TodoLists'
import { getTodoLists } from '../API/todoAPI'
import { TokenContext } from '../Context/Context'

export default function TodoListsScreen({navigation}){
    // get the user's todo lists
    const [todoLists, setTodoLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getTodoLists()
            .then(todoLists => {
                setTodoLists(todoLists);
                setLoading(false);
            })
            .catch(error => {
                setError(true);
                setLoading(false);
            });
    }
    , []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error!</Text>;
    }

    return (
        <View>
            <Text>Todo Lists</Text>
            <Button title="Add Todo List" onPress={() => {}} />
            {todoLists.map(todoList => (
                <TodoList key={todoList.id} todoList={todoList} />
            ))}
        </View>
    );
}
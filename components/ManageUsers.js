import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import { TokenContext, UsernameContext } from "../Context/Context";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { getUsers, deleteUser, changePassword, createUser } from "../API/todoAPI";


export default function ManageUsers ({navigation}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [token, setToken] = useContext(TokenContext);
    const [username, setUsername] = useContext(UsernameContext);
    const [users, setUsers] = useState(getUsers());
    const [newPassword, setNewPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    
    useEffect(() => {
        getUsers().then(users => {
                setUsers(users);
                setLoading(false);
            }).catch(error => {
                setError(true);
                setLoading(false);
            });
    }
    , []);

    const delUser = (username) => {
        deleteUser(username).then(() => {
                setUsers(users.filter(user => user.username !== username));
            }).catch(error => {
                setError(true);
            });
    }

    const updatePassword = (username) => {
        if (newPassword === "") {
            return;
        }
        changePassword(username, newPassword).then(() => {
                setNewPassword("");
                setUsers(users.map(user => {
                    if (user.username === username) {
                        user.password = newPassword;
                    }
                    return user;
                }
                ));
            }).catch(error => {
                setError(true);
            });
    }        

    const addUser = (isAdmin) => {
        if (newUsername === "" || newUserPassword === "") {
            return;
        }
        console.log("breakHere?");
        isAdmin = isAdmin ? "admin" : "user";
        createUser(newUsername, newUserPassword, isAdmin).then(user => {
                setUsers([...users, user[0]]);
                setNewUsername("");
                setNewUserPassword("");
            }).catch(error => {
                setError(true);
            });
    }

    if (loading) {
        return (
            <>
                <Text>Loading...</Text>
            </>
        );
    }
    if (error) {
        return (
            <>
                <Text>Error</Text>
            </>
        );
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Manage Users</Text>
            <FlatList
                style={styles.list}
                data={users}
                renderItem={({item}) => (
                    <View style={styles.listItem}>
                        {/* show users and their password */}
                        <View style={styles.listItemText}>
                            <Text>Username: {item.username}</Text>
                            <Text>Password: {item.password}</Text>
                            <Text>Roles: {item.roles}</Text>
                        </View>
                        <Button title="Delete" 
                            onPress={() => {
                                delUser(item.username);
                                console.log("delete button pressed for " + item.username);
                            }} 
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            onChangeText={text => setNewPassword(text)}
                            value={newPassword}
                        />
                        <Button title="Change Password" onPress={() => updatePassword(item.username)} />
                    </View>
                )}
                keyExtractor={item => item.username}
            />

            <View style={styles.listItem}>
                <TextInput
                    style={styles.input}
                    placeholder="New Username"
                    onChangeText={text => setNewUsername(text)}
                    value={newUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    onChangeText={text => setNewUserPassword(text)} 
                    value={newUserPassword}
                />
                <Button title="Add User" onPress={() => addUser(false)} />
                <Button title="Add Admin" onPress={() => addUser(true)} />
            </View>
            <View style={ {height: 1000}}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    listItem: {
        flex:1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    listItemText: {
        fontSize: 20,
    },
    input: {
        height: 40,
        width: "80%",
        margin: 12,
        borderWidth: 1,
    },
    list: {
        width: "100%",
    },
});

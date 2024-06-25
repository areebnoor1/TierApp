
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TodoList from './TodoList';
import { db } from "./firebase.js"
import React, { useState, useEffect } from 'react';
import {
    ref,
    onValue,
    query,
    orderByChild,
    equalTo,
    push,
    update,
    remove
} from 'firebase/database';
import TodoListButton from './TodoListButton.js';

export default function TaskSelectionView({ setCurrentTask, setTaskSelectionVisible }) {
    const [value, setValue] = useState('');
    const [todos, setTodos] = useState({});

    const todosKeys = Object.keys(todos);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksRef =
                    query(ref(db, '/todos'), orderByChild('completed'), equalTo('true'));
                return onValue(tasksRef, querySnapShot => {
                    let data = querySnapShot.val() || {};
                    let todoItems = { ...data };
                    setTodos(todoItems);
                });
            } catch (error) {
                console.error('Error getting documents: ', error);
            }
        };
        fetchTasks();
    }, []);


    return (
        <View>
            <View >
                <ScrollView style={styles.scroll}>
                    { 
                        todosKeys.map(key => (
                            <TodoList
                            text={todos[key].text}
                            key={todos[key].key}
                            todoItem={todos[key].checked}
                            setChecked={() => todos[key].key}
                            deleteTodo={() => deleteTodo(key)}
                        />
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        flex: 1,
        flexDirection: 'row',
        //alignItems: 'flex-end',
        //justifyContent: 'space-around',
        // padding: 16,
        //backgroundColor: '#f8f8f8',
        // borderBottomWidth: 1,
        // borderBottomColor: '#ddd',
    },

    pressableContainer: {
        backgroundColor: "#3d36a3",
        textAlign: 'center',
        borderRadius: 20,
        marginBottom: 10,
        alignItems: 'center',
    },
    scroll: {

        //alignItems: 'center'
    },

    listContainer: {
        // marginTop: '5%',
        flexDirection: 'column',
        flex: 1
        // borderColor: '#aaaaaa',
        // width: '100%',
        //  alignItems: 'center',
        //  minHeight: 40
    },
    listItem: {
        paddingBottom: 20,
        paddingLeft: 10,
        marginTop: 6,
        borderColor: 'green',
        borderBottomWidth: 1,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black'
    }
})
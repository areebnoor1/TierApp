
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
import TodoList from './TodoList';
import { db } from "./firebase.js"
import React, { useState, useEffect } from 'react';
import {
    ref,
    onValue,
    push,
    update,
    remove
} from 'firebase/database';

export default function TaskSelectionView({ setCurrentTask, setTaskSelectionVisible }) {
    const [value, setValue] = useState('');
    const [todos, setTodos] = useState({});

    const todosKeys = Object.keys(todos);

    useEffect(() => {
        return onValue(ref(db, '/todos'), querySnapShot => {
            let data = querySnapShot.val() || {};
            let todoItems = { ...data };
            setTodos(todoItems);
        });
    }, []);

    return (
        <View style={styles.listContainer}>
            <ScrollView style={styles.scroll}>
                {
                    todosKeys.map(key => (
                        <Pressable style={styles.pressableContainer} onPress={() => {
                            setCurrentTask(todos[key])
                            setTaskSelectionVisible(false)
                        }
                        }>
                            <TodoList
                                text={todos[key].text}
                                key={todos[key].key}
                                todoItem={todos[key].checked}
                                setChecked={() => todos[key].key}
                                deleteTodo={() => deleteTodo(key)}
                            />
                        </Pressable>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    pressableContainer: {
        backgroundColor: "#3d36a3",
        textAlign: 'center',
        borderRadius: 20,
        marginBottom: 10,
        alignItems: 'center',
    },

    listContainer: {
        marginTop: '5%',
        flexDirection: 'row',
        borderColor: '#aaaaaa',
        borderBottomWidth: 1.5,
        width: '100%',
        alignItems: 'stretch',
        minHeight: 40
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
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { useFocusEffect } from '@react-navigation/native';
import {
    ref,
    onValue,
    push,
    update,
    remove,
    orderByChild,
    equalTo,
    query
} from 'firebase/database';
//import * as firebaseApp from 'firebase';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Pressable
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import TodoList from './TodoList';
import { createTodo, readTodos, updateTodo, deleteTodo } from './TodosService';
import { db } from "./firebase.js"

export default function Minutes() {
    const [value, setValue] = useState('');
    const [todos, setTodos] = useState([]);
    //const todosKeys = Object.keys(todos);
    /* useEffect(() => {
         const fetchTasks = async () => {
             try {
                 
                 const tasksRef =
                     query(ref(db, '/todos'), orderByChild('task_type'), equalTo('minutes'));
                 return onValue(tasksRef, querySnapShot => {
                     let data = querySnapShot.val() || {};
                     let todoItems = { ...data };
                     console.log('minutesdata', todoItems)
                     setTodos(todoItems);
                 });
 
 
             } catch (error) {
                 console.error('Error getting documents: ', error);
             }
         };
         fetchTasks();
     }, []);*/

    useFocusEffect(() => {
        //console.log('yay render')
        const fetchTodos = async () => {
            const todos = await readTodos();
            setTodos(todos.filter(todo => todo.task_type === 'days'));
        };

        fetchTodos();
    });
    /*let addTodo = () => {
        push(ref(db, '/todos'), {
            text: value, key: Date.now(), checked: false
        });
        if (value.length > 0) {
            //  setTodos([...todos, { text: value, key: Date.now(), checked: false }]);
            setValue('');
        }
    };*/


    const checkTodo = async (key) => {
        const todo = todos.find(todo => todo.key === key);
       //if (todo) {
            // todo.completed = true
            

           updateTodo(key, { completed: !todo.completed });

           const index = todos.findIndex(todo => todo.key === key);
           todos[index] = { ...todos[index], ...{ completed: !todo.completed } };
           setTodos(todos.filter(todo => todo.key !== key));
       // }
    };


    const handleDeleteTodo = async (key) => {
        deleteTodo(key);
        setTodos(todos.filter(todo => todo.key !== key));
       
    };


    return (<View style={styles.container}>
        <ScrollView style={styles.scroll}>
            {
                /*todosKeys.map(key => (
                    <TodoList
                        text={todos[key].text}
                        key={todos[key].key}
                        todoItem={todos[key].checked}
                        setChecked={() => todos[key].key}
                        deleteTodo={() => deleteTodo(key)}
                    />
                ))*/
                todos.map(item => (
                    !item.completed && 
                    <TodoList
                        text={item.text}
                        key={item.key}
                        completed={item.completed}
                        due_date={item.due_date}
                        setChecked={() => {

                            checkTodo(item.key)
                          
                            console.log('checkec', todos)
                        }
                        }
                        deleteTodo={() => handleDeleteTodo(item.key)}
                    />
                ))
            }
        </ScrollView>

    </View>
    );

}

const styles = StyleSheet.create({
    scroll: {
        width: '100%',
    },
    container: {
        //flex: 1,
        // justifyContent: 'flex-start',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        marginTop: '15%',
        fontSize: 20,
        color: 'red',
        paddingBottom: 10,
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        borderColor: 'black',
        borderBottomWidth: 1,
        paddingRight: 10,
        paddingBottom: 10,
    },
    text: {
        fontSize: 40,
        paddingTop: 70,
    },
    textInput: {
        flex: 1,
        height: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        paddingLeft: 10,
        minHeight: '3%',
    },
});

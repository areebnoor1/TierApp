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
    Pressable,
    Modal
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import TodoList from './TodoList';
import EditTask from './EditTask';
import { createTodo, readTodos, updateTodo, deleteTodo } from './TodosService';
import { db } from "./firebase.js"

export default function Minutes({minutesTodos, todos, setTodos}) {
    const [value, setValue] = useState('');
   // const [todos, setTodos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingTask, setEditingTask] = useState({});

    //const todosKeys = Object.keys(todos);

    useFocusEffect(() => {
        const fetchTodos = async () => {
            const todos = await readTodos();
            setTodos(todos.filter(todo => todo.task_type === 'minutes'));
        };
        fetchTodos();
    });


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
                todos.map(item => (
                    !item.completed &&
                    <TodoList
                        text={item.text}
                        key={item.key}
                        completed={item.completed}
                        due_date={item.due_date}
                        editMe={() => {
                            //console.log('date', item.due_date)
                            setModalVisible(true)
                            setEditingTask(item)
                            handleDeleteTodo(item.key)
                            

                        }}
                        setChecked={() => {
                            checkTodo(item.key)
                        }
                        }
                        deleteTodo={() => handleDeleteTodo(item.key)
                        }
                        //updateTodo = {()=> handleUpdateTodo(item.key)}
                    />
                ))
            }
        </ScrollView>


        <Modal transparent={true} visible={modalVisible} style={styles.modalView}>
            <View>
                <EditTask todos = {todos} setTodos={setTodos} setModalVisible={setModalVisible} task={editingTask} 
               // deleteOldTodo={handleDeleteTodo(editingTask)}
                
                />
            </View>
        </Modal>

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
    modalView: {
        //margin: 20,
        //borderRadius: 20,
        //padding: 35,
        // alignItems: 'center',
        flex: 1,
        //backgroundColor: 'transparent',
        backgroundColor: "rgba(0,0,0,0.7)",
        alignItems: "center",
        justifyContent: "center",
    },
});

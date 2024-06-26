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
    push,
    update,
    remove
} from 'firebase/database';
import TodoListButton from './TodoListButton.js';
import { createTodo, readTodos, updateTodo, deleteTodo } from './TodosService';

export default function TaskSelectionView({ setCurrentTask, setTaskSelectionVisible }) {
    const [value, setValue] = useState('');
    const [todos, setTodos] = useState([]);

  const todosKeys = Object.keys(todos);

    /*useEffect(() => {
        return onValue(ref(db, '/todos'), querySnapShot => {
            let data = querySnapShot.val() || {};
            let todoItems = { ...data };
            setTodos(todoItems);
        });
    }, []);*/


    useEffect(() => {
        const fetchTodos = async () => {
            const todos = await readTodos();
            setTodos(todos);
        };
        fetchTodos();
    }, []);


  return (
    <View style={styles.listContainer}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            setTaskSelectionVisible(false);
          }}
          style={{
            alignItems: "center",
          }}
        >
          <AntDesign name="close" size={20} />
        </TouchableOpacity>
        <Text>Select a task</Text>
        <View></View>
      </View>

            <View style={styles.scroll}>
                <ScrollView >
                    {
                       /* todosKeys.map(key => (
                            <Pressable key={todos[key].key} onPress={() => {
                                setCurrentTask(todos[key])
                                setTaskSelectionVisible(false)
                            }
                            }>
                                <TodoListButton
                                    text={todos[key].text}
                                    key={todos[key].key}
                                    todoItem={todos[key].checked}
                                    setChecked={() => todos[key].key}
                                    deleteTodo={() => deleteTodo(key)}
                                />
                            </Pressable>
                        ))*/

                        todos.map(item => (
                            <Pressable key={item.key} onPress={() => {
                                setCurrentTask(item)
                                setTaskSelectionVisible(false)
                            }
                            }>
                               {!item.completed &&
                                <TodoListButton
                                    text={item.text}
                                    key={item.key}
                                    todoItem={item.completed}
                                    setChecked={() => item.key}
                                    deleteTodo={() => deleteTodo(key)}
                                />}
                            </Pressable>
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
    flexDirection: "row",
    //alignItems: 'flex-end',
    //justifyContent: 'space-around',
    // padding: 16,
    //backgroundColor: '#f8f8f8',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
  },

  pressableContainer: {
    backgroundColor: "#3d36a3",
    textAlign: "center",
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  scroll: {
    //alignItems: 'center'
  },

  listContainer: {
    // marginTop: '5%',
    flexDirection: "column",
    flex: 1,
    // borderColor: '#aaaaaa',
    // width: '100%',
    //  alignItems: 'center',
    //  minHeight: 40
  },
  listItem: {
    paddingBottom: 20,
    paddingLeft: 10,
    marginTop: 6,
    borderColor: "green",
    borderBottomWidth: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
});

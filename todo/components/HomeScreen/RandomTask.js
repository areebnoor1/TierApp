import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import TodoListButton from "../TodoListButton";
import { createTodo, readTodos, updateTodo, deleteTodo, getTodos } from '../TodosService';
import { useFocusEffect } from '@react-navigation/native';

export default function RandomTask({
  taskSelectionVisible,
  setTaskSelectionVisible,
  setCurrentTask,
  taskType,
}) {
  const [todos, setTodos] = useState([]);
  const todosKeys = Object.keys(todos);


    const getRandomTodo = async () => {
    try {
      const todos = await getTodos();    
      todos.filter(todo => todo.task_type === taskType && todo.completed === false)

      const randomIndex = Math.floor(Math.random() * todos.length);
      return todos[randomIndex];
      
    } catch (e) {
      console.error('Failed to fetch a random todo', e);
      return null;
    }
  };




  useFocusEffect(() => {
    const fetchTodos = async () => {
        const todos = await readTodos();
        setTodos(todos.filter(todo => todo.task_type === taskType && todo.completed === false));
        //setTodos(todos);
    };
    fetchTodos();
});

  return (
    
    <Modal
      animationType="slide"
      transparent={false}
      visible={taskSelectionVisible}
    >
    
      <View style={styles.listContainer}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => {
              setTaskSelectionVisible(false);
            }}
            style={styles.closeButton}
          >
            <AntDesign name="close" size={20} />
          </TouchableOpacity>
          <Text style={styles.topBarText}>Select a {taskType} task </Text>
          <View style={styles.placeholder} />
        </View>

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
    </Modal>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  closeButton: {
    padding: 10,
  },
  topBarText: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    width: 20, // Adjust as needed
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  pressableContainer: {
    backgroundColor: "#3d36a3",
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
  },
});

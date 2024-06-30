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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TodoListButton from "../TodoListButton";
import { db } from "../firebase";
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import { createTodo, readTodos, updateTodo, deleteTodo } from '../TodosService';

export default function CurrentTask({
  taskSelectionVisible,
  setTaskSelectionVisible,
currentTask,
  setCurrentTask, // Ensure setCurrentTask is passed down as a prop
  taskType,
}) {
  const [todos, setTodos] = useState({});
  const todosKeys = Object.keys(todos);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!taskType) return;

      try {
        const tasksRef = query(
          ref(db, "/todos"),
          orderByChild("task_type"),
          equalTo(taskType)
        );
        return onValue(tasksRef, (querySnapShot) => {
          let data = querySnapShot.val() || {};
          let todoItems = { ...data };
          setTodos(todoItems);
        });
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
    fetchTasks();
  }, [taskType]);

  const deleteTodo = async (key) => {
    try {
      await remove(ref(db, `/todos/${key}`));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <View style={styles.screen}>
                <View style={styles.curTask}>
                    <TouchableOpacity onPress={() => setCurrentTask({})}>
                        <FontAwesome name='close' style={styles.icon} size={40} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.welcomText} onPress={() => {
                            currentTask.completed = true
                            currentTask.completion_date = Date.now()
                            updateTodo(currentTask.key, currentTask)
                            setCurrentTask({})

                            
                        }}> Done </Text>
                    </TouchableOpacity>
                    <Text style={styles.welcomText}> Active task </Text>
                    <Text style={{
                        fontSize: 25,
                        color: 'white'
                    }}> {currentTask.text} </Text>
                </View>
            </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  closeButton: {
    alignItems: "center",
  },
  topBarText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  placeholder: {
    width: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  listContainer: {
    flex: 1,
  },
});

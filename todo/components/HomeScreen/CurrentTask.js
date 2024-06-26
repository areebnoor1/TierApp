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
import { db } from "../firebase";
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database";

export default function TaskSelectionModal({
  taskSelectionVisible,
  setTaskSelectionVisible,
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
          <Text style={styles.topBarText}>Select a task</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {todosKeys.map((key) => (
            <Pressable
              key={todos[key].key}
              onPress={() => {
                setCurrentTask(todos[key]); // Ensure setCurrentTask is called with the selected task
                setTaskSelectionVisible(false);
              }}
            >
              <TodoListButton
                text={todos[key].text}
                key={todos[key].key}
                todoItem={todos[key].checked}
                setChecked={() => todos[key].key}
                deleteTodo={() => deleteTodo(key)}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </Modal>
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

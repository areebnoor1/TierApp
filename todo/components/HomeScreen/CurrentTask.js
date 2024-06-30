import React, { useState, useEffect, useContext } from "react";
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
import { TodoContext } from '../TodoContext';

export default function CurrentTask({
  taskSelectionVisible,
  setTaskSelectionVisible,
  currentTask,
  setCurrentTask, // Ensure setCurrentTask is passed down as a prop
  taskType,
}) {
  const { todos, addTodo, removeTodo, toggleTodoCompleted, updateTodo } = useContext(TodoContext);

  return (
    <View style={styles.screen}>
      <View style={styles.curTask}>
        <TouchableOpacity onPress={() => setCurrentTask({})}>
          <FontAwesome name='close' style={styles.icon} size={40} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.welcomText} onPress={() => {
            toggleTodoCompleted(currentTask.key)
            setCurrentTask({})
          }}> Done </Text>
        </TouchableOpacity>

        {currentTask.task_type === 'days' &&
          <TouchableOpacity onPress={() => {
            setCurrentTask({})
            days_of_progress = "days_made_progress" in currentTask ? currentTask.days_made_progress+1 : 1
            updateTodo(currentTask.key,{
              most_recent_day_made_progress: Date.now(), days_made_progress: days_of_progress
            })
          }}>
            <Text>Made progress</Text>
          </TouchableOpacity>
        }

        <Text style={styles.welcomText}> Active task </Text>
        <Text style={{
          fontSize: 25,
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

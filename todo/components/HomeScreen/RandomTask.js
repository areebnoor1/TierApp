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
import Ionicons from "react-native-vector-icons/Ionicons";
import TodoListButton from "../TodoListButton";
import { createTodo, readTodos, updateTodo, deleteTodo, getTodos } from '../TodosService';

export default function RandomTask({
  filteredTodos,
  setRandomTaskSelectionVisible,
  randomTaskSelectionVisible,
  taskType,
  setCurrentTask
}) {
  const [item, setItem] = useState({});

  const getRandomTodo = () => {
    filteredTodos = filteredTodos.filter(todo => todo.task_type === taskType && todo.completed ===false)
    const randomIndex = Math.floor(Math.random() * filteredTodos.length);
    return filteredTodos[randomIndex];
  };

  useEffect(() => {
    if (randomTaskSelectionVisible) {
      setItem(getRandomTodo());
    }
  }, [randomTaskSelectionVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={randomTaskSelectionVisible}
    >
      <View style={styles.listContainer}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => {
              setRandomTaskSelectionVisible(false);
            }}
            style={styles.closeButton}     >
            <AntDesign name="close" size={20} />
          </TouchableOpacity>
          <Text style={styles.topBarText}> Random Task </Text>
          <View style={styles.placeholder} />
        </View>
        <Text style={{
          fontSize: 15,
          flex: 1,
          textAlign: "center",
        }
        }>
          {item.text}
        </Text>

        <TouchableOpacity onPress={() => {
          setItem(getRandomTodo())
        }}>
          <Ionicons name="refresh-outline" size={20} />
          <Text>Pick again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentTask(item)
            setRandomTaskSelectionVisible(false)
          }}
        >
          <Ionicons name="checkmark-circle-sharp" size={20} />

          <Text>Begin</Text>
        </TouchableOpacity>

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

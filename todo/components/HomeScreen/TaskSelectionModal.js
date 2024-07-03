import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  StyleSheet,
 View,
 Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import TodoListButton from "../TodoListButton";
import { TodoContext } from '../TodoContext';
import { Ionicons } from '@expo/vector-icons';

export default function TaskSelectionModal({
  taskSelectionVisible,
  setTaskSelectionVisible,
  setCurrentTask,
  taskType,
}) {
  const { todos } = useContext(TodoContext);

  // Filter todos based on the taskType
  const filteredTodos = todos.filter(todo => todo.task_type === taskType && !todo.completed);

  const getTaskTypeMessage = (taskType) => {
    switch (taskType) {
      case 'minutes':
        return 'Choose a Minutes Task';
      case 'hours':
        return 'Choose an Hours Task';
      case 'days':
        return 'Choose a Days Task';
      default:
        return 'Choose a Task';
    }
  };

  return (
    <Modal
      animationType="fade"
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
 {/*  <AntDesign name="close" size={20} /> */}
            <Ionicons name="arrow-back-circle" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.topBarText}>{getTaskTypeMessage(taskType)}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView}>
          {filteredTodos.map(item => (
            <TouchableOpacity
              key={item.key}
              onPress={() => {
                setCurrentTask(item);
                setTaskSelectionVisible(false);
              }}
            >
              <TodoListButton
                text={item.text}
                todoItem={item}
              />
            </TouchableOpacity>
          ))}
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

  //  fontWeight: "bold",
    flex: 1,
    textAlign: "center",
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        color: "#D9D9D9",
      //  marginBottom: 20,
        textAlign: "center",
  },
  placeholder: {
    width: 20,

  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
});

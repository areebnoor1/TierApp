import React, { useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { useFocusEffect } from "@react-navigation/native";
import EditTaskModal from "./EditTaskModal";
import { Ionicons } from "@expo/vector-icons";
import AddTaskModal from './HomeScreen/AddTaskModal';

import {
  ref,
  onValue,
  push,
  update,
  remove,
  orderByChild,
  equalTo,
  query,
} from "firebase/database";
//import * as firebaseApp from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import TodoList from "./TodoList";
import EditTask from "./EditTask";
import { TodoContext } from "./TodoContext";
import { createTodo, readTodos, updateTodo, deleteTodo } from "./TodosService";
import { db } from "./firebase.js";

export default function Minutes() {
  const [value, setValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState({});
  const [addModalVisible, setAddModalVisible] = useState(false);

  const { todos, addTodo, removeTodo, toggleTodoCompleted } =
    useContext(TodoContext);

  const handleToggleTodo = async (key) => {
    await toggleTodoCompleted(key);
  };

  return (
    <>
      <TouchableOpacity style={styles.addTaskButton} onPress={() => setAddModalVisible(true)}>
        <Ionicons name="add" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          {todos
            .filter((todo) => todo.task_type === "hours")
            .map(
              (item) =>
                !item.completed && (
                  <TodoList
                    text={item.text}
                    key={item.key}
                    todo={item}
                    the_key={item.key}
                    completed={item.completed}
                    has_due_date={item.has_due_date}
                    due_date={item.due_date}
                    editMe={() => {
                      setModalVisible(true);
                      setEditingTask(item);
                    }}
                    setChecked={() => {
                      handleToggleTodo(item.key);
                    }}
                    deleteTodo={() => removeTodo(item.key)}
                  />
                )
            )}
        </ScrollView>

        <AddTaskModal
          modalVisible={addModalVisible}
          setModalVisible={setAddModalVisible}
          inputTaskType={'hours'}
        //  todos = {todos.filter(todo => todo.completed===false)}
        // setTodos = {setTodos}
        />

        <EditTaskModal modalVisible={modalVisible} setModalVisible={setModalVisible} task={editingTask}

        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    //  width: '100%',
  },
  container: {
    //flex: 1,
    // justifyContent: 'flex-start',
    //alignItems: 'center',
    //  backgroundColor: '#F5FCFF',
  },
  header: {
    marginTop: "15%",
    fontSize: 20,
    color: "red",
    paddingBottom: 10,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    borderColor: "black",
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
    fontWeight: "bold",
    color: "black",
    paddingLeft: 10,
    minHeight: "3%",
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
  addTaskButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

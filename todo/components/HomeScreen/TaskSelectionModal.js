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
import TodoListButton from "../TodoListButton";
import { createTodo, readTodos, updateTodo, deleteTodo } from '../TodosService';
import  {TodoContext}  from '../TodoContext';
import { useFocusEffect } from '@react-navigation/native';
//import { db } from "../firebase";
//import { ref, onValue, query, orderByChild, equalTo } from "firebase/database";


export default function TaskSelectionModal({
  taskSelectionVisible,
  setTaskSelectionVisible,
  setCurrentTask,
  taskType,
}) {
  //const { todos, addTodo, removeTodo, toggleTodoCompleted } = useContext(TodoContext);
const { todos } = useContext(TodoContext);

 // Filter todos based on the taskType
  const filteredTodos = todos.filter(todo => todo.task_type === taskType && !todo.completed);


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
        {/*}
          { todos.map(item => (
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
          } */}
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
    width: 20,
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  pressableContainer: {
    backgroundColor: "#3d36a3",
 //   borderRadius: 20,
   // padding: 15,
 //s   marginBottom: 10,
  },
});

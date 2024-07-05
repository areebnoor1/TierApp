import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  Button,
  Modal,
} from "react-native";
import React, { useState, useEffec, useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ToDoApp from "./ToDoApp";
import AddTask from "./AddTask";
import TaskSelectionView from "./TaskSelectionView";
import { createTodo, readTodos, updateTodo, deleteTodo } from './TodosService';
import AddTaskModal from "./HomeScreen/AddTaskModal";
import TaskSelectionModal from "./HomeScreen/TaskSelectionModal";
import CurrentTask from "./HomeScreen/CurrentTask";
import NoTask from "./HomeScreen/NoTask";
import  {TodoContext}  from './TodoContext';

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  screen: {
    flex: 1,
    // backgroundColor: "#232138",
    // padding: 10,
    justifyContent: "center",
  },

  smallText: {
    fontStyle: "italic",
    fontFamily: "Avenir-Book",
    marginBottom: 20,
    fontSize: 18,
    color: "white",
  },

  welcomText: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 30,
    marginTop: 12,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
  },
  buttonText: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 26,
    marginTop: 12,
    marginLeft: 8,
    marginBottom: 5,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
    color: "white",
  },
});

export default function HomePage({ navigation }) {
  const [currentTask, setCurrentTask] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [inputTaskType, setInputTaskType] = useState("");
  const [taskSelectionVisible, setTaskSelectionVisible] = useState(false);
  //const [todos, setTodos] = useState([]);
  const { todos, addTodo, removeTodo, toggleTodoCompleted } = useContext(TodoContext);

  return (
    <View style={styles.screen}>
      <AddTaskModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        inputTaskType={inputTaskType}
      //  todos = {todos.filter(todo => todo.completed===false)}
       // setTodos = {setTodos}
      />
      <TaskSelectionModal
        taskSelectionVisible={taskSelectionVisible}
        setTaskSelectionVisible={setTaskSelectionVisible}
        setCurrentTask={setCurrentTask}
      //  todos = {todos.filter(todo => todo.completed===false)}
      />
      {Object.keys(currentTask).length === 0 ? (
        <NoTask
          setTaskSelectionVisible={setTaskSelectionVisible}
          setModalVisible={setModalVisible}
          setCurrentTask={setCurrentTask}
          setInputTaskType={setInputTaskType}
      //    todos = {todos.filter(todo => todo.completed===false)}
        />
      ) : (
        <CurrentTask
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        />
      )}
    </View>
  );
}

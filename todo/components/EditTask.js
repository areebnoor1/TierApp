import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Text,
  Pressable,
  Switch
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import DatePicker from "react-native-date-picker";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ToDoApp from './ToDoApp';
import {
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database';
import { db } from "./firebase.js"
import { TodoContext } from './TodoContext';
//import { createTodo, readTodos, updateTodo, deleteTodo } from './TodosService';

export default function EditTask({ setModalVisible, task, deleteOldTodo }) {
  const [taskType, setTaskType] = useState(task.task_type);
  const [value, setValue] = useState(task.text);
  const [date, setDate] = useState(task.has_due_date ? new Date(task.due_date): {});
  const [showDate, setShowDate] = useState(task.has_due_date);

  const { todos, addTodo, removeTodo, toggleTodoCompleted, updateTodo } = useContext(TodoContext);

  const getMessage = () => {
    switch (taskType) {
      case "minutes":
        return "Task will take less than an hour to complete";
      case "hours":
        return "Task takes an hour or more to complete";
      case "days":
        return '(Something like, "Task takes an hour or more to complete broken up over several days")';
      default:
        return "";
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Text style={styles.buttonText}>Edit task</Text>
        <TouchableOpacity onPress={() => {
          updateTodo(task.key, {
            text: value, key: task.key, completed: false, task_type: taskType, has_due_date: showDate, due_date: date
          })
          setModalVisible(false)
        }}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.smallText}>Select a task type</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity onPress={() => setTaskType("minutes")}>
          <Entypo
            name="stopwatch"
            style={[styles.icon, taskType === "minutes" && styles.activeText]}
            size={40}
          />
          <Text>Minutes</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTaskType("hours")}>
          <Ionicons
            name="hourglass-outline"
            style={[styles.icon, taskType === "hours" && styles.activeText]}
            size={40}
          />
          <Text>Hours</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTaskType("days")}>
          <Entypo
            name="calendar"
            style={[styles.icon, taskType === "days" && styles.activeText]}
            size={40}
          />
          <Text>Days</Text>
        </TouchableOpacity>

      </View>

      <Text>{getMessage()}</Text>

      <Text
        style={{
          fontSize: 20,
        }}
      >Due date</Text>

      <Switch
        // trackColor={{ false: '#767577', true: '#81b0ff' }}
        //thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={() => {
          setShowDate(!showDate)
          if (!showDate) {
            setDate(new Date())
          } else {
            setDate({})
          }
        }}
        value={showDate}
      />


      {showDate && (
        <DatePicker mode="datetime" date={date === null ? Date.now() : date} onDateChange={setDate} />
      )}

      <View>
        <TextInput
          style={styles.textInput}
          multiline={true}
          //placeholder={task.text}
          placeholderTextColor="#abbabb"
          value={value}
          onChangeText={(_value) => setValue(_value)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  activeText: {
    color: "blue",
  },

  textInput: {
    borderColor: "purple",
    borderWidth: 2,
    //height: 250,
    //width: 200,
    padding: 10,
    borderRadius: 20,
    fontSize: 18,
    margin: 10,
  },
  icon: {
    //padding: 10,
    // color: 'white',
  },

  curTask: {
    display: "flex",
    alignItems: "center",
    marginTop: 14,
    backgroundColor: "rgb(182, 36, 255)",
    opacity: 1,
    color: "rgb(240, 240, 240)",
    borderLeft: 1,
    boxShadow: "rgb(182, 36, 255)",
    padding: 16,
    borderRadius: 28,
    textShadow: "rgba(240, 240, 240, 0.47)",
  },

  screen: {
    //flex: 1,
    backgroundColor: "#FFF",
    //padding: 20,
    //justifyContent: "center",
  },

  smallText: {
    fontStyle: "italic",
    fontFamily: "Avenir-Book",
    marginBottom: 20,
    fontSize: 18,
    alignItems: "center",
    //color: 'white'
  },
  pressableContainer: {
    backgroundColor: "#48249c",
    textAlign: "center",
    borderRadius: 20,
    marginBottom: 10,
  },
  welcomText: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 70,
    marginTop: 12,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
    //color: 'white'
  },
  buttonText: {
    display: "flex",
    alignItems: "center",
    // gap: 6,
    fontSize: 26,
    // marginTop: 12,
    //  marginLeft: 8,
    //   marginBottom: 5,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
    //color: 'white'
  },
});

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

import  {TodoContext}  from './TodoContext';

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

import { createTodo, readTodos, updateTodo, deleteTodo } from './TodosService';



export default function AddTask({ setModalVisible, setTodos}) {
  const [taskType, setTaskType] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState({});
 // const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
 /// const [showTime, setShowTime] = useState(false);

  const { todos, addTodo, removeTodo, toggleTodoCompleted } = useContext(TodoContext);


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

  let addTodoWrapper = async () => {
    if (taskType == '') {
      Alert.alert('', 'Please specify a task type (Minutes, Hours, Days).', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {

      await addTodo({
        text: value, key: Date.now(), completed: false, task_type: taskType, due_date: date, has_due_date: showDate
      })     

      if (value.length > 0) {
        setValue('');
      }
      setModalVisible(false);
    }
  };
  
  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setModalVisible(false)}
        >
          <AntDesign name='close' size={30} />
        </TouchableOpacity>

        <Text style={styles.buttonText}>Add task</Text>

        <TouchableOpacity onPress={() => addTodoWrapper()}>
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
        fontSize:20,
      }}
      >Due date</Text>

      <Switch
        // trackColor={{ false: '#767577', true: '#81b0ff' }}
        //thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={() => {
          setShowDate(!showDate)
          if(!showDate){
            setDate(new Date())
          }else{
            setDate({})
          }
        }}
        value={showDate}
      />


      {showDate && (
        <DatePicker mode="datetime" date={date} onDateChange={setDate} />
      )}

      <View>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="Enter task"
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

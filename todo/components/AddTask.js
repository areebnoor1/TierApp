import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Text,
  Switch,
  Modal,
} from "react-native";
import React, { useState, useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import DatePicker from "react-native-date-picker";

import { TodoContext } from './TodoContext';

export default function AddTask({ setModalVisible, setTodos }) {
  const [taskType, setTaskType] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState({});
  const [showDate, setShowDate] = useState(false);

  const { todos, addTodo } = useContext(TodoContext);

  const getMessage = () => {
    switch (taskType) {
      case "minutes":
        return "Task will take less than an hour to complete";
      case "hours":
        return "Task takes an hour or more to complete";
      case "days":
        return "Task takes an hour or more to complete broken up over several days";
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
      });

      if (value.length > 0) {
        setValue('');
      }
      setModalVisible(false);
    }
  };

  return (
          <View style={styles.screen}>
            <View style={styles.topBar}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AntDesign name='close' size={30} />
              </TouchableOpacity>
              <Text style={styles.buttonText}>Add Task</Text>
              <TouchableOpacity onPress={() => addTodoWrapper()}>
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.header}>Select Task Type</Text>
            <View style={styles.taskTypeContainer}>
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

            <Text style={styles.smallText}>{getMessage()}</Text>

            <Text style={styles.header}>Add Due Date</Text>
            <Switch
              onValueChange={() => {
                setShowDate(!showDate);
                if (!showDate) {
                  setDate(new Date());
                } else {
                  setDate({});
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
    padding: 10,
    borderRadius: 20,
    fontSize: 18,
    margin: 10,
  },
  icon: {},
  screen: {
    backgroundColor: "#FFF",
  },
  header: {
    marginBottom: 20,
    fontSize: 20,
  },
  smallText: {
    fontStyle: "italic",
    fontFamily: "Avenir-Book",
    marginBottom: 20,
    fontSize: 14,
    alignItems: "center",
  },
  buttonText: {
    display: "flex",
    alignItems: "center",
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "95%",
    height: "95%",
    backgroundColor: "#EBEBEB",
    borderRadius: 10,
    padding: 20,
  },
  taskTypeContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
});


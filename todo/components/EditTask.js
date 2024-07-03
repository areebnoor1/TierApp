import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import DatePicker from "react-native-date-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

import { TodoContext } from "./TodoContext";

export default function EditTask({ setModalVisible, setTodos, task }) {
  const [taskType, setTaskType] = useState(task.task_type);
  const [value, setValue] = useState(task.text);
  const [date, setDate] = useState(task.has_due_date ? new Date(task.due_date): {});
  const [showDate, setShowDate] = useState(task.has_due_date);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { todos, addTodo, removeTodo, toggleTodoCompleted, updateTodo } = useContext(TodoContext);

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

  const addTodoWrapper = async () => {
    if (taskType === "") {
      Alert.alert("", "Please specify a task type (Minutes, Hours, Days).", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else if (value.trim().length === 0) {
      Alert.alert("", "Please add a description for the task.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      await addTodo({
        text: value,
        key: Date.now(),
        completed: false,
        task_type: taskType,
        due_date: date,
        has_due_date: showDate,
      });

      setValue("");
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <AntDesign name="close" size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Task</Text>
        <TouchableOpacity onPress={() => {
          updateTodo(task.key, {
            text: value, key: task.key, completed: false, task_type: taskType, has_due_date: showDate, due_date: date
          })
          setModalVisible(false)
        }}>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Select Task Type</Text>
      <View style={styles.taskTypeContainer}>
        <TouchableOpacity
          style={[
            styles.taskTypeSelection,
            taskType === "minutes" && styles.selectedButton,
          ]}
          onPress={() => setTaskType("minutes")}
        >
          <Entypo
            name="stopwatch"
            style={[
              styles.icon,
              taskType === "minutes" && styles.activeText,
            ]}
            size={40}
          />
          <Text>Minutes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.taskTypeSelection,
            taskType === "hours" && styles.selectedButton,
          ]}
          onPress={() => setTaskType("hours")}
        >
          <Ionicons
            name="hourglass-outline"
            style={[
              styles.icon,
              taskType === "hours" && styles.activeText,
            ]}
            size={40}
          />
          <Text>Hours</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.taskTypeSelection,
            taskType === "days" && styles.selectedButton,
          ]}
          onPress={() => setTaskType("days")}
        >
          <Entypo
            name="calendar"
            style={[
              styles.icon,
              taskType === "days" && styles.activeText,
            ]}
            size={40}
          />
          <Text>Days</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.smallText}>{getMessage()}</Text>

      <ScrollView>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          placeholder="Description"
          placeholderTextColor="#abbabb"
          value={value}
          onChangeText={setValue}
        />
      </ScrollView>

      <View style={styles.dueDateContainer}>
        <View
          style={{ flexDirection: 'column' }}>

          <Text style={styles.header}>Add Due Date</Text>
          {showDate &&
            <Text style={styles.header}>Date selected: {date.toDateString()}</Text>}
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          onValueChange={() => {

            setShowDate(!showDate);
            if (!showDatePicker && !showDate) {
              setShowDatePicker(true)
            }

            setDate(showDate ? {} : new Date());
          }}
          value={showDate}
        />





      </View>

      {showDatePicker &&
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onChange = (event, selectedDate) => {
            const currentDate = selectedDate;
            setShowDatePicker(false)
            setDate(currentDate);
          }}
        />
      }




    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  title: {
    fontSize: 26,
    fontFamily: "Poppins",
  },
  doneButton: {
    fontSize: 18,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  smallText: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 20,
  },
  taskTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  taskTypeSelection: {
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    width: 100, // Fixed width for each selection
  },
  selectedButton: {
    backgroundColor: "#D9D9D9",
    width: 100, // Fixed width for selected button
  },
  icon: {},
  textInput: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    height: 120,
    marginBottom: 20,
    textAlignVertical: "top", // Align text at the top left
  },
  dueDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 20,
  },
});

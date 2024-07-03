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
  Pressable
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import DatePicker from "react-native-date-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

import { TodoContext } from "./TodoContext";

export default function AddTask({ setModalVisible, setTodos, inputTaskType }) {
  const [taskType, setTaskType] = useState(inputTaskType);
  const [value, setValue] = useState("");
  const [date, setDate] = useState({});
  const [importance, setImportance] = useState(1);
  const [showDate, setShowDate] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { addTodo } = useContext(TodoContext);

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
        <Text style={styles.title}>Add Task</Text>
        <TouchableOpacity onPress={addTodoWrapper}>
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

      {
        showDatePicker &&
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


      <Text style={styles.header}>Importance:</Text>
      <View style={styles.taskNumberContainers}>
        <View style={styles.taskNumberContainer}>
          <Pressable
            style={[
              styles.dayEllipse,
              importance === 1 && styles.activeOption,
            ]}
            onPress={() => { setImportance(1) }}
          >
            <Text style={
              styles.taskNumber}>1</Text>
          </Pressable>
          <Text style={styles.taskText}>Least important</Text>
        </View>
        <View style={styles.taskNumberContainer}>
          <Pressable style={[
            styles.dayEllipse,
            importance === 2 && styles.activeOption,
          ]}
            onPress={() => { setImportance(2) }}>
            <Text style={styles.taskNumber}>2</Text>
          </Pressable>
          <Text style={styles.taskText}> </Text>
        </View>
        <View style={styles.taskNumberContainer}>
          <Pressable style={[
            styles.dayEllipse,
            importance === 3 && styles.activeOption,
          ]}
            onPress={() => { setImportance(3) }}>
            <Text style={styles.taskNumber}>3</Text>
          </Pressable>
          <Text style={styles.taskText}>Most important</Text>
        </View>
      </View>



    </View >
  );
}
const styles = StyleSheet.create({
  taskTypeDisplay: {
    backgroundColor: "#b7babd",
    textAlign: 'center',
    borderRadius: 20,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    alignItems: 'center',
  },

  label: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  taskNumberContainers: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  jarHeader: {
    flexDirection: 'row',
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  activeText: {
    color: 'blue',

  },

  textInput: {
    borderColor: 'purple',
    borderWidth: 2,
    //height: 250,
    //width: 200,
    padding: 10,
    borderRadius: 20,
    fontSize: 18,
    margin: 10
  },
  icon: {
    //padding: 10,
    // color: 'white',
  },

  curTask: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 14,
    backgroundColor: 'rgb(182, 36, 255)',
    opacity: 1,
    color: 'rgb(240, 240, 240)',
    borderLeft: 1,
    boxShadow: 'rgb(182, 36, 255)',
    padding: 16,
    borderRadius: 28,
    textShadow: 'rgba(240, 240, 240, 0.47)'
  },

  remainingTasksContainer: {
    width: "100%",
    padding: 16,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  taskNumberContainers: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  taskNumberContainer: {
    alignItems: "center",
    marginRight: 16,
  },
  minuteEllipse: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(255, 38, 246, 0.75)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  hourEllipse: {
    width: 30,
    height: 30,
    backgroundColor: "#9D6AF0",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  dayEllipse: {
    width: 30,
    height: 30,
    backgroundColor: "#b1b3b5",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  activeOption: {
    backgroundColor: "#8d82ed",
  },
  taskNumber: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  taskText: {
    width: 70,
    textAlign: "center",
    color: "black",
  },
  arrowContainer: {
    marginLeft: "auto",
  },
  finishedText: {
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 20,
  },

  screen: {
    //flex: 1,
    backgroundColor: "#FFF",
    //padding: 20,
    //justifyContent: "center",
  },

  smallText: {
    fontStyle: 'italic',
    fontFamily: 'Avenir-Book',
    marginBottom: 20,
    fontSize: 18,
    alignItems: 'center',
    //color: 'white'
  },
  pressableContainer: {
    backgroundColor: "#48249c",
    textAlign: 'center',
    borderRadius: 20,
    marginBottom: 10,

  },
  welcomText: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 70,
    marginTop: 12,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
    fontWeight: 'bold',
    fontFamily: "Poppins",
    textAlign: "center",
    //color: 'white'
  },
  buttonText: {
    display: 'flex',
    alignItems: 'center',
    // gap: 6,
    fontSize: 30,
    // marginTop: 12,
    //  marginLeft: 8,
    //   marginBottom: 5,
    fontWeight: 'bold',
    fontFamily: "Poppins",
    textAlign: "center",
    //color: 'white'
  },
  container: {
    flex: 1,
    height: 760,
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

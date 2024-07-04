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
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

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
    <View>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <AntDesign name="close" size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Add Task</Text>
        <TouchableOpacity onPress={addTodoWrapper}>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>Task Type</Text>
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
              style={[styles.icon, taskType === "minutes" && styles.activeText]}
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
              style={[styles.icon, taskType === "hours" && styles.activeText]}
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
              style={[styles.icon, taskType === "days" && styles.activeText]}
              size={40}
            />
            <Text>Days</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.smallText}>{getMessage()}</Text>

        {/*
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
*/}

        {/*
      <View style={styles.dueDateContainer2}>
      <View style={styles.dueDateContainer}>
        <View>
          <Text style={styles.optionalHeader}>Due Date</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}

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
           {showDate &&
                      <Text style={styles.optionalText}>{date.toDateString()}</Text>}
           {/* {!(showDate) ? (
                              <Text style={styles.optionalText}>N/A</Text>
                            ) : (
                              <Text >{date.toDateString()}</Text>
                            )}

 </View>
 <Text style={styles.header}>Due Date</Text>
 <Text style={styles.optionalHeader}>Optional: </Text>
*/}

        <View style={styles.dueDateContainer}>
          <View style={styles.dueDateContainer3}>
            {!showDate ? (
              <Text style={styles.optionalHeader}>Due Date</Text>
            ) : (
              <View style={styles.dueDateContainer4}>
                <Text style={styles.optionalHeader}></Text>
                <Text style={styles.optionalHeader2}>
                  {date.toDateString()}
                </Text>
              </View>
            )}
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            onValueChange={() => {
              setShowDate(!showDate);
              if (!showDatePicker && !showDate) {
                setShowDatePicker(true);
              }

              setDate(showDate ? {} : new Date());
            }}
            value={showDate}
          />
        </View>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            onChange={
              (onChange = (event, selectedDate) => {
                const currentDate = selectedDate;
                setShowDatePicker(false);
                setDate(currentDate);
              })
            }
          />
        )}

        {/******Importance ***********/}

        <View style={styles.dueDateContainer}>
          <View style={styles.dueDateContainer3}>
            <Text style={styles.optionalHeader}>Importance</Text>
          </View>

          <View style={styles.taskNumberContainers}>
            <View style={styles.taskNumberContainer}>
              <Pressable
                style={[
                  styles.dayEllipse,
                  importance === 1 && styles.activeOption,
                ]}
                onPress={() => {
                  setImportance(1);
                }}
              >
                <Text style={styles.taskNumber}>1</Text>
              </Pressable>
              <Text style={styles.taskText}>Low</Text>
            </View>
            <View style={styles.taskNumberContainer}>
              <Pressable
                style={[
                  styles.dayEllipse,
                  importance === 2 && styles.activeOption,
                ]}
                onPress={() => {
                  setImportance(2);
                }}
              >
                <Text style={styles.taskNumber}>2</Text>
              </Pressable>
              <Text style={styles.taskText}>Medium</Text>
            </View>
            <View style={styles.taskNumberContainer}>
              <Pressable
                style={[
                  styles.dayEllipse,
                  importance === 3 && styles.activeOption,
                ]}
                onPress={() => {
                  setImportance(3);
                }}
              >
                <Text style={styles.taskNumber}>3</Text>
              </Pressable>
              <Text style={styles.taskText}>High</Text>
            </View>
          </View>
        </View>

        {/*****************/}

        {/******Due date 2***********/}
        <View style={styles.dueDateContainer}>
          <View style={styles.dueDateContainer3}>
            <Text style={styles.optionalHeader}>Due Date</Text>

            {showDate && (
              <Text style={styles.optionalText}>{date.toDateString()}</Text>
            )}
            {/* {!(showDate) ? (
                              <Text style={styles.optionalText}>N/A</Text>
                            ) : (
                              <Text >{date.toDateString()}</Text>
                            )} */}
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            onValueChange={() => {
              setShowDate(!showDate);
              if (!showDatePicker && !showDate) {
                setShowDatePicker(true);
              }

              setDate(showDate ? {} : new Date());
            }}
            value={showDate}
          />
        </View>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            onChange={
              (onChange = (event, selectedDate) => {
                const currentDate = selectedDate;
                setShowDatePicker(false);
                setDate(currentDate);
              })
            }
          />
        )}
        {/*****************/}
        <ScrollView>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={4}
            placeholder="Description"
            // placeholderTextColor="#abbabb"
            value={value}
            onChangeText={setValue}
          />
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  taskNumberContainers: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  jarHeader: {
    flexDirection: "row",
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

  taskNumberContainer: {
    alignItems: "center",
    //   marginRight: 16,
  },
  dayEllipse: {
    padding: 15,
    borderRadius: 12,
    paddingHorizontal: 20,
    //  width: 30,
    //    height: 30,
    backgroundColor: "#F6F6F6",
    //   borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  activeOption: {
    backgroundColor: "#81b0ff",
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
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    //   marginBottom: 20,
  },
  optionalText: {
    fontSize: 14,
    fontStyle: "italic",
    //  textAlign: "center",
    alignItems: "center",
    color: "gray",
    //  color: "purple",
    // fontWeight: 'bold',
    //   marginBottom: 20,
  },

  buttonText: {
    display: "flex",
    alignItems: "center",
    // gap: 6,
    fontSize: 30,
    // marginTop: 12,
    //  marginLeft: 8,
    //   marginBottom: 5,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
    //color: 'white'
  },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    // paddingVertical: 16,
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontFamily: "Poppins",
  },
  doneButton: {
    fontSize: 18,
  },
  header: {
    paddingHorizontal: 20,
    fontSize: 18,
    marginBottom: 10,
  },
  optionalHeader: {
    fontSize: 18,
    //fontWeight: "bold",
    //marginBottom: 8,
  },
  optionalHeader2: {
    fontSize: 18,
    //  fontWeight: "bold",
    color: "blue",
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
   // backgroundColor: "#D9D9D9",
    // backgroundColor: "#9D6AF0",
    // color: "#9D6AF0",
    width: 100, // Fixed width for selected button
        backgroundColor: '#F6F6F6',
      //  shadowColor: '#000',
        elevation: 4,

        borderRadius: 14,
  },
  activeText: {
    // color: "#9D6AF0",
  },
  icon: {},
  textInput: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    //   height: 120,
    // marginBottom: 20,
    textAlignVertical: "top", // Align text at the top left
  },
  dueDateContainer: {
    flexDirection: "row",
    //   alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    //paddingVertical: 15,
    //paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 5,
    // marginBottom: 20,
  },
  dueDateContainer4: {
    flexDirection: "row",
    //   justifyContent: "space-between",
    //padding: 10,
    //paddingVertical: 15,
    //paddingHorizontal: 20,
    //    backgroundColor: "white",
    //    borderRadius: 5,
    // marginBottom: 20,
  },
  dueDateContainer2: {
    //    flexDirection: "row",
    //   alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    //paddingVertical: 15,
    //paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 20,
  },
  dueDateContainer3: {
    flexDirection: "column",
    alignItems: "flex-start",
    // height: "100%",
    // backgroundColor: "red",
  },
});

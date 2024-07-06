import React, { useState, useContext } from "react";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

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
        return "Task is broken up into sessions that span several days";
      default:
        return "";
    }
  };

  const addTodoWrapper = async () => {
    //console.log('task type', taskType)
    if (taskType == "") {
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
        importance: importance
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
        <TouchableOpacity onPress={() => {
          addTodoWrapper()
         
        }
        }>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>
        {/******task type ***********/}
        <View style={styles.taskType}>

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
      </View>

 <View style={styles.taskDescription}>
      <ScrollView>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          placeholder="Description"
          placeholderTextColor="#BEBEBE"
          value={value}
          onChangeText={setValue}
    scrollEnabled
          />
      </ScrollView>
</View>

{/******Importance ***********/}
 <View style={styles.importanceSection}>
        <View style={styles.selectionContainer}>
          <View style={styles.selectionContainerText}>
            <Text style={styles.optionalHeader}>Importance</Text>
          </View>

          <View style={styles.importanceContainers}>
            <View style={styles.importanceContainer}>
              <Pressable
                style={[
                  styles.importanceBox,
                  importance === 1 && styles.activeOption,
                ]}
                onPress={() => {
                  setImportance(1);
                }}
              >
                <Text style={styles.importanceNum}>1</Text>
              </Pressable>
              <Text style={styles.importanceText}>Low</Text>
            </View>
            <View style={styles.importanceContainer}>
              <Pressable
                style={[
                  styles.importanceBox,
                  importance === 2 && styles.activeOption,
                ]}
                onPress={() => {
                  setImportance(2);
                }}
              >
                <Text style={styles.importanceNum}>2</Text>
              </Pressable>
              <Text style={styles.importanceText}>Medium</Text>
            </View>
            <View style={styles.importanceContainer}>
              <Pressable
                style={[
                  styles.importanceBox,
                  importance === 3 && styles.activeOption,
                ]}
                onPress={() => {
                  setImportance(3);
                }}
              >
                <Text style={styles.importanceNum}>3</Text>
              </Pressable>
              <Text style={styles.importanceText}>High</Text>
            </View>
          </View>
        </View>
</View>
        {/*****************/}
 <View style={styles.importanceSection}>
        {/******Due date 2***********/}
        <View style={styles.selectionContainer}>
          <View style={styles.selectionContainerText}>
            <Text style={styles.optionalHeader}>Due Date</Text>
            {showDate && (
              <Text style={styles.dateText}>{date.toDateString()}</Text>
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
        {/*****************/}
 </View>
  {/******** Description *********/}

    {/******** stretch a certain num of lines before it scrolls.... *********/}


    </View>
  );
}
const styles = StyleSheet.create({
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
    //paddingHorizontal: 20,
    fontSize: 18,
    marginBottom: 5,
  },
taskType: {
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    //marginBottom: 20
   // backgroundColor: "yellow",
},
 taskTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
   // borderColor: "black",
   // borderWidth: 2,
   backgroundColor: "#F6F6F6",
    borderRadius: 10,
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
  smallText: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    color: "gray",
  },
    taskDescription: {
      padding: 20,
    },
  descriptionContainer: {
   paddingHorizontal: 10,
   borderWidth: 1,
   borderColor: "gray",
   backgroundColor: "#F6F6F6",

  },
  textInput: {
    fontSize: 18,
    borderColor: "#E0E0E0",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    maxHeight: 100,
    textAlignVertical: "top", // Ensures placeholder is at the top left
  },

importanceSection: {
    justifyContent: "flex-end",
   // backgroundColor: "red",
  //  paddingHorizontal: 10,
   // height: "68%",
//    alignItems: "space-between",
  //  bottom: 0,
   //  borderColor: "black",
   //   borderWidth: 2,
       padding: 20,
},
  importanceContainers: {
    flexDirection: "row",
  },
  importanceContainer: {
    alignItems: "center",
  },
    importanceNum: {
      color: "black",
      fontSize: 15,
      fontWeight: "bold",
    },
    importanceText: {
      width: 70,
      textAlign: "center",
      color: "black",
    },
      activeOption: {
        backgroundColor: "#81b0ff",
      },
  importanceBox: {
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

  dateText: {
    fontSize: 14,
    fontStyle: "italic",
    alignItems: "center",
    color: "gray",
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

  selectionContainer: {
    flexDirection: "row",
    //   alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    //paddingVertical: 15,
    //paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // marginBottom: 20,
    borderColor: "#F6F6F6",

        borderWidth: 2,
        backgroundColor: "#F6F6F6",
  },

  selectionContainerText: {
    flexDirection: "column",
    alignItems: "flex-start",
    // height: "100%",
    // backgroundColor: "red",
  },
});


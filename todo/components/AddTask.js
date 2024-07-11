import React, { useState, useContext } from "react";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

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
        importance: importance,
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
      <ScrollView>
        {/****** Task Type ***********/}
        <View style={styles.taskType}>
          <Text style={{padding:10}}>Task Type</Text>
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

        {/****** Description ***********/}
        <View style={styles.descriptionContainer}>
          <View style={styles.taskDescription}>
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
          </View>
        </View>

        {/****** Importance ***********/}
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
                  onPress={() => setImportance(1)}
                >
                  <Text
                    style={[
                      styles.importanceNum,
                      importance === 1 && styles.activeText2,
                    ]}
                  >
                    1
                  </Text>
                </Pressable>
                <Text style={styles.importanceText}>Low</Text>
              </View>
              <View style={styles.importanceContainer}>
                <Pressable
                  style={[
                    styles.importanceBox,
                    importance === 2 && styles.activeOption,
                  ]}
                  onPress={() => setImportance(2)}
                >
                  <Text
                    style={[
                      styles.importanceNum,
                      importance === 2 && styles.activeText2,
                    ]}
                  >
                    2
                  </Text>
                </Pressable>
                <Text style={styles.importanceText}>Medium</Text>
              </View>
              <View style={styles.importanceContainer}>
                <Pressable
                  style={[
                    styles.importanceBox,
                    importance === 3 && styles.activeOption,
                  ]}
                  onPress={() => setImportance(3)}
                >
                  <Text
                    style={[
                      styles.importanceNum,
                      importance === 3 && styles.activeText2,
                    ]}
                  >
                    3
                  </Text>
                </Pressable>
                <Text style={styles.importanceText}>High</Text>
              </View>
            </View>
          </View>
        </View>

        {/****** Due Date ***********/}
        <View style={styles.importanceSection}>
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
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate;
                setShowDatePicker(false);
                setDate(currentDate);
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins",
  },
  doneButton: {
    fontSize: 18,
  },
  header: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  taskType: {
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  taskTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
  },
  taskTypeSelection: {
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    width: 100,
  },
  selectedButton: {
    //backgroundColor: "black",
    width: 100,
    backgroundColor: "#F6F6F6",
    //backgroundColor: 'white',
    elevation: 4,
    borderRadius: 14,
    //color: "white",
  },
  smallText: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    color: "gray",
  },

  taskDescription: {
    // borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
  },
  descriptionContainer: {
    padding: 20,
  },
  textInput: {
    textAlignVertical: "top",
    fontSize: 16,
    padding: 10,
    maxHeight: 150,
  },
  importanceSection: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f4f4f4",
    padding: 10,
    //marginBottom: 15,
  },
  selectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 10,
    // marginTop: 10,
    // alignItems: "center",
    // backgroundColor: "#F6F6F6",
    borderRadius: 10,
  },
  selectionContainerText: {
    flexDirection: "column",
  },
  importanceContainers: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  importanceContainer: {
    alignItems: "center",
    marginHorizontal: 8,
    borderColor: "black",
  },
  importanceBox: {
    justifyContent: "center",
    alignItems: "center",
    //  borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: 40,
    backgroundColor: "#f4f4f4",
  },
  activeOption: {
    backgroundColor: "black",
    borderColor: "transparent",
  },
  activeText2: {
    color: "white",
  },
  importanceText: {
    paddingVertical: 10,
  },
  importanceNum: {
    fontSize: 20,
  },
  dateText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#81b0ff",
    fontWeight: "bold",
  },
});

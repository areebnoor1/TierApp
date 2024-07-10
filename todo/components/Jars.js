import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AddTaskModal from "./HomeScreen/AddTaskModal";
import Minutes from "./Minutes";
import Days from "./Days";
import Hours from "./Hours";

import AntDesign from "react-native-vector-icons/AntDesign";
import DatePicker from "react-native-date-picker";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import ToDoApp from "./ToDoApp";
import {
  ref,
  onValue,
  push,
  update,
  remove,
  orderByChild,
  equalTo,
  query,
} from "firebase/database";
import { db } from "./firebase.js";

import { TodoContext } from "./TodoContext";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry.js";

export default function Jars() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [taskType, setTaskType] = useState("");
  //const [jar, setJar] = useState('');
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const { todos, addTodo, removeTodo, toggleTodoCompleted } =
    useContext(TodoContext);

  const isToday = (date) => {
    const d = new Date(date);
    const t = new Date();
    const today = new Date(t.setHours(0, 0, 0, 0));
    const comparison = new Date(d.setHours(0, 0, 0, 0));
    return today.getTime() == comparison.getTime();
  };

  function isDateInThisWeek(date) {
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();
    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
  }

  const getTodosDueThisWeek = (type) => {
    const newArr = todos.filter(
      (todo) =>
        !todo.completed &&
        todo.task_type === type &&
        todo.has_due_date &&
        isDateInThisWeek(new Date(todo.due_date))
    );
    return newArr.length;
  };

  const dateExists = (date) => {
    if (Object.keys(date).length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const getDueToday = (type) => {
    const newArr = todos.filter(
      (todo) =>
        todo.task_type === type &&
        todo.completed === false &&
        todo.has_due_date === true &&
        isToday(todo.due_date) === true
    );
    const amount = newArr.length;
    return amount;
  };

  if (Object.keys(taskType).length === 0) {
    return (
      <View>
        <View style={styles.screen}>
          <Text style={styles.titleText}>My Tasks</Text>
          <TouchableOpacity
            style={styles.jarHeader}
            onPress={() => setTaskType("minutes")}
          >
            <View style={styles.iconBox}>
              <Entypo
                name="stopwatch"
                style={[
                  styles.icon,
                  taskType === "minutes" && styles.activeText,
                ]}
                size={24}
              />
            </View>
            {/*<Entypo name='stopwatch' style={[styles.icon, taskType === 'minutes' && styles.activeText]} size={40} /> */}
            <Text style={styles.label}>Minutes</Text>
            <Entypo name="chevron-right" style={styles.icon} size={30} />
          </TouchableOpacity>

          <View style={styles.minutesTaskTypeDisplay}>
            <View style={styles.taskNumberContainers}>
              <View style={styles.taskNumberContainer}>
                <View style={styles.inJarEllipse}>
                  <Text style={styles.inJarNumber}>
                    {
                      todos.filter(
                        (todo) =>
                          todo.task_type === "minutes" &&
                          todo.completed === false
                      ).length
                    }
                  </Text>
                </View>
                <Text style={styles.inJarText}>Tasks in Jar</Text>
              </View>
              <View style={styles.taskNumberContainer}>
                <View style={styles.dayEllipse}>
                  <Text style={styles.taskNumber}>
                    {getDueToday("minutes")}
                  </Text>
                </View>
                <Text style={styles.taskText}>Tasks Due Today</Text>
              </View>
              <View style={styles.taskNumberContainer}>
                <View style={styles.dayEllipse}>
                  <Text style={styles.taskNumber}>
                    {getTodosDueThisWeek("minutes")}
                  </Text>
                </View>
                <Text style={styles.taskText}>Tasks Due This Week</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.jarHeader}
            onPress={() => setTaskType("hours")}
          >
            <View style={styles.iconBox}>
              <Ionicons
                name="hourglass-outline"
                style={[styles.icon, taskType === "hours" && styles.activeText]}
                size={24}
              />
            </View>
            {/*  <Ionicons name='hourglass-outline' style={[styles.icon, taskType === 'hours' && styles.activeText]} size={40} /> */}
            <Text style={styles.label}>Hours</Text>
            <Entypo name="chevron-right" style={styles.icon} size={30} />
          </TouchableOpacity>
          <View style={styles.hoursTaskTypeDisplay}>
            <View style={styles.taskNumberContainers}>
              <View style={styles.taskNumberContainer}>
                {/*   <View style={styles.dayEllipse}>
                                <Text style={styles.taskNumber}>{todos.filter(todo => todo.task_type === 'hours' && todo.completed === false).length}</Text>
                                 <Text style={styles.taskText}>Tasks in jar</Text>
                            </View> */}
                <View style={styles.inJarEllipse}>
                  <Text style={styles.inJarNumber}>
                    {
                      todos.filter(
                        (todo) =>
                          todo.task_type === "hours" && todo.completed === false
                      ).length
                    }
                  </Text>
                </View>
                <Text style={styles.inJarText}>Tasks in Jar</Text>
              </View>
              <View style={styles.taskNumberContainer}>
                <View style={styles.dayEllipse}>
                  <Text style={styles.taskNumber}>{getDueToday("hours")}</Text>
                </View>
                <Text style={styles.taskText}>Tasks Due Today</Text>
              </View>
              <View style={styles.taskNumberContainer}>
                <View style={styles.dayEllipse}>
                  <Text style={styles.taskNumber}>
                    {getTodosDueThisWeek("hours")}
                  </Text>
                </View>
                <Text style={styles.taskText}>Due This Week</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.jarHeader}
            onPress={() => setTaskType("days")}
          >
            <View style={styles.iconBox}>
              <Entypo
                name="calendar"
                style={[styles.icon, taskType === "days" && styles.activeText]}
                size={24}
              />
            </View>
            <Text style={styles.label}>Days</Text>
            <Entypo name="chevron-right" style={styles.icon} size={30} />
          </TouchableOpacity>
          <View style={styles.daysTaskTypeDisplay}>
            <View style={styles.taskNumberContainers}>
              <View style={styles.taskNumberContainer}>
                <View style={styles.inJarEllipse}>
                  <Text style={styles.inJarNumber}>
                    {
                      todos.filter(
                        (todo) =>
                          todo.task_type === "days" && todo.completed === false
                      ).length
                    }
                  </Text>
                </View>
                <Text style={styles.inJarText}>Tasks in Jar</Text>
              </View>
              <View style={styles.taskNumberContainer}>
                <View style={styles.dayEllipse}>
                  <Text style={styles.taskNumber}>{getDueToday("days")}</Text>
                </View>
                <Text style={styles.taskText}>Tasks Due Today</Text>
              </View>
              <View style={styles.taskNumberContainer}>
                <View style={styles.dayEllipse}>
                  <Text style={styles.taskNumber}>
                    {getTodosDueThisWeek("days")}
                  </Text>
                </View>
                <Text style={styles.taskText}>Due This Week</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  } else if (taskType === "minutes") {
    return (
      <View>
        <View style={styles.topBar2}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => setTaskType("")}>
              <Entypo name="chevron-left" size={30} />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Minutes Jar</Text>
            <Text style={styles.buttonText}></Text>
          </View>
          <TouchableOpacity
            style={styles.addTaskButton}
            onPress={() => setAddModalVisible(true)}
          >
            <Ionicons name="add" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scroll}>
          <Minutes />
        </ScrollView>

        <AddTaskModal
          modalVisible={addModalVisible}
          setModalVisible={setAddModalVisible}
          inputTaskType={"minutes"}
          //  todos = {todos.filter(todo => todo.completed===false)}
          // setTodos = {setTodos}
        />
      </View>
    );
  } else if (taskType === "hours") {
    return (
      <View>
        <View style={styles.topBar2}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => setTaskType("")}>
              <Entypo name="chevron-left" size={30} />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Hours Jar</Text>
            <Text style={styles.buttonText}></Text>
          </View>
          <TouchableOpacity
            style={styles.addTaskButton}
            onPress={() => setAddModalVisible(true)}
          >
            <Ionicons name="add" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scroll}>
          <Hours />
        </ScrollView>

        <AddTaskModal
          modalVisible={addModalVisible}
          setModalVisible={setAddModalVisible}
          inputTaskType={"hours"}
        />
      </View>
    );
  } else if (taskType === "days") {
    return (
      <View>
        <View style={styles.topBar2}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => setTaskType("")}>
              <Entypo name="chevron-left" size={30} />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Days Jar</Text>
            <Text style={styles.buttonText}></Text>
          </View>
          <TouchableOpacity
            style={styles.addTaskButton}
            onPress={() => setAddModalVisible(true)}
          >
            <Ionicons name="add" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scroll}>
          <Days />
        </ScrollView>

        <AddTaskModal
          modalVisible={addModalVisible}
          setModalVisible={setAddModalVisible}
          inputTaskType={"days"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#FFF",
    padding: 20,
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginBottom: 24,
  },
  iconBox: {
    borderRadius: 7,
    padding: 3,
    borderColor: "#D9D9D9",
    borderWidth: 1,
  },
  jarHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  minutesTaskTypeDisplay: {
    backgroundColor: "#FF5CF8",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    alignItems: "center",
     elevation: 2,
  },
  hoursTaskTypeDisplay: {
    backgroundColor: "#9D6AF0",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    alignItems: "center",
     elevation: 2,
  },
  daysTaskTypeDisplay: {
    backgroundColor: "#7DA1FD",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    alignItems: "center",
     elevation: 2,
  },
  //holds the 3 circle info
  taskNumberContainers: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
  },
  //holds individual circle, num, and text
  taskNumberContainer: {
    alignItems: "center",
  },
  taskNumber: {
    color: "black",
    fontSize: 24,
  },
  taskText: {
    width: 70,
    textAlign: "center",
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
  },
  inJarEllipse: {
    width: 46,
    height: 46,
    backgroundColor: "black",
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  inJarText: {
    width: 60,
    textAlign: "center",
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
  },
  inJarNumber: {
    color: "white",
    fontSize: 24,
    //z     fontWeight: "bold",
  },
  dayEllipse: {
    width: 46,
    height: 46,
    backgroundColor: "#F0F2F8",
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  topBar2: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
  },
  activeText: {
    color: "blue",
  },
  scroll: {
    marginBottom: 50,
  },
});

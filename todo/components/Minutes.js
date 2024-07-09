import React, { useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
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
//import * as firebaseApp from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import TodoList from "./TodoList";
import EditTaskModal from "./EditTaskModal";
import AddTaskModal from "./HomeScreen/AddTaskModal";
import { TodoContext } from "./TodoContext";
import { createTodo, readTodos, updateTodo, deleteTodo } from "./TodosService";
import { db } from "./firebase.js";

export default function Minutes() {
  const [value, setValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState({});
  const [viewOption, setViewOption] = useState("all");

  const { todos, addTodo, removeTodo, toggleTodoCompleted } =
    useContext(TodoContext);

  const handleToggleTodo = async (key) => {
    await toggleTodoCompleted(key);
  };
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
  return (
    <View>
      <View style={styles.screen}>
        {/* <TouchableOpacity
        style={styles.addTaskButton}
        onPress={() => setAddModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="black" />
      </TouchableOpacity> 
      
        <View style={{ paddingHorizontal: 16 }}>
      */}

        <View>
          <View style={styles.minutesTaskTypeDisplay}>
            <View style={styles.taskNumberContainers}>
              <View
                style={[
                  styles.dayEllipse,
                  viewOption === "all" && styles.activeEllipse,
                  viewOption !== "all" && styles.inactiveEllipse,
                ]}
              >
                <Text
                  style={[
                    styles.taskNumber,
                    viewOption === "all" && styles.activeEllipseText,
                    viewOption !== "all" && styles.inactiveEllipseText,
                  ]}
                >
                  {
                    todos.filter(
                      (todo) =>
                        todo.task_type === "minutes" && todo.completed === false
                    ).length
                  }
                </Text>
              </View>

              <View
                style={[
                  styles.dayEllipse,
                  viewOption === "today" && styles.activeEllipse,
                  viewOption !== "today" && styles.inactiveEllipse,
                ]}
              >
                <Text
                  style={[
                    styles.taskNumber,
                    viewOption === "today" && styles.activeEllipseText,
                    viewOption !== "today" && styles.inactiveEllipseText,
                  ]}
                >
                  {getDueToday("minutes")}
                </Text>
              </View>

              <View
                style={[
                  styles.dayEllipse,
                  viewOption === "week" && styles.activeEllipse,
                  viewOption !== "week" && styles.inactiveEllipse,
                ]}
              >
                <Text
                  style={[
                    styles.taskNumber,
                    viewOption === "week" && styles.activeEllipseText,
                    viewOption !== "week" && styles.inactiveEllipseText,
                  ]}
                >
                  {getTodosDueThisWeek("minutes")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.progressTabs}>
          <TouchableOpacity
            style={[styles.tab, viewOption === "all" && styles.activeTab]}
            onPress={() => setViewOption("all")}
          >
            <Text
              style={[
                styles.tabText,
                viewOption === "all" && styles.activeTabText,
              ]}
            >
              All Tasks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, viewOption === "today" && styles.activeTab]}
            onPress={() => setViewOption("today")}
          >
            <Text
              style={[
                styles.tabText,
                viewOption === "today" && styles.activeTabText,
              ]}
            >
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, viewOption === "week" && styles.activeTab]}
            onPress={() => setViewOption("week")}
          >
            <Text
              style={[
                styles.tabText,
                viewOption === "week" && styles.activeTabText,
              ]}
            >
              This Week
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          {/*   <ScrollView style={styles.scroll}>  */}
          {viewOption === "all" && (
            <>
              {todos
                .filter((todo) => todo.task_type === "minutes")
                .map(
                  (item) =>
                    !item.completed && (
                      <TodoList
                        text={item.text}
                        key={item.key}
                        the_key={item.key}
                        todo={item}
                        completed={item.completed}
                        has_due_date={item.has_due_date}
                        due_date={item.due_date}
                        editMe={() => {
                          setModalVisible(true);
                          setEditingTask(item);
                        }}
                        setChecked={() => {
                          handleToggleTodo(item.key);
                        }}
                        deleteTodo={() => removeTodo(item.key)}
                      />
                    )
                )}
            </>
          )}

          {viewOption === "today" && (
            <>
              {todos
                .filter(
                  (todo) =>
                    todo.task_type === "minutes" && isToday(todo.due_date)
                )
                .map(
                  (item) =>
                    !item.completed && (
                      <TodoList
                        text={item.text}
                        key={item.key}
                        the_key={item.key}
                        todo={item}
                        completed={item.completed}
                        has_due_date={item.has_due_date}
                        due_date={item.due_date}
                        editMe={() => {
                          setModalVisible(true);
                          setEditingTask(item);
                        }}
                        setChecked={() => {
                          handleToggleTodo(item.key);
                        }}
                        deleteTodo={() => removeTodo(item.key)}
                      />
                    )
                )}
            </>
          )}

          {viewOption === "week" && (
            <>
              {todos
                .filter(
                  (todo) =>
                    todo.task_type === "minutes" &&
                    isDateInThisWeek(todo.due_date)
                )
                .map(
                  (item) =>
                    !item.completed && (
                      <TodoList
                        text={item.text}
                        key={item.key}
                        the_key={item.key}
                        todo={item}
                        completed={item.completed}
                        has_due_date={item.has_due_date}
                        due_date={item.due_date}
                        editMe={() => {
                          setModalVisible(true);
                          setEditingTask(item);
                        }}
                        setChecked={() => {
                          handleToggleTodo(item.key);
                        }}
                        deleteTodo={() => removeTodo(item.key)}
                      />
                    )
                )}
            </>
          )}
        </View>

        <AddTaskModal
          modalVisible={addModalVisible}
          setModalVisible={setAddModalVisible}
          inputTaskType={"minutes"}
          //  todos = {todos.filter(todo => todo.completed===false)}
          // setTodos = {setTodos}
        />

        <EditTaskModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          task={editingTask}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  minutesTaskTypeDisplay: {
    backgroundColor: "rgba(255, 38, 246, 0.75)",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    //marginBottom: 10,
    //padding: 15,
    alignItems: "center",
  },
  taskNumberContainers: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
  },
  taskNumberContainer: {
    alignItems: "center",
  },
  taskNumber: {
    color: "black",
    fontSize: 24,
  },
  dayEllipse: {
    width: 46,
    height: 46,
    backgroundColor: "#F0F2F8",
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  activeEllipse: {
    width: 46,
    height: 46,
    backgroundColor: "black",
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  activeEllipseText: {
    color: "white",
    fontSize: 24,
  },
  inactiveEllipseText: {
    color: "black",
    fontSize: 24,
  },
  inactiveEllipse: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },

  screen: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    // justifyContent: 'flex-start',
    //alignItems: 'center',
    //  backgroundColor: '#F5FCFF',
    // paddingBottom:25,
    flex: 1,
    //  backgroundColor: "blue",
  },
  container: {
   // backgroundColor: "red",
    alignItems: "center",
    flex: 1,
    // justifyContent: 'flex-start',
    //alignItems: 'center',
    //  backgroundColor: '#F5FCFF',
    // paddingBottom:25,
    //backgroundColor: "blue",
    marginBottom: 20,
  },
  addTaskButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  addTaskButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  addTaskButton: {
    // position: "absolute",

    borderRadius: 30,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    // bottom: 20,
    marginTop: 20,
    right: 20,
  },
  progressTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    //  paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: "#6200EE",
    backgroundColor: "rgba(255, 38, 246, 0.75)",
    backgroundColor: "#6200EE",
    backgroundColor: "rgba(255, 38, 246, 0.75)",
    backgroundColor: "black",
    //        borderRadius: 10,
    //       paddingHorizontal: 10,
  },
  tabText: {
    fontSize: 16,
    color: "#000",
  },
  activeTabText: {
    color: "#fff",
  },
});

import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import TodoList from "./TodoList";
import { readTodos, deleteCompletedTodos } from "./TodosService";
//import streakIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { startOfWeek, endOfWeek, parseISO, isWithinInterval } from 'date-fns';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import RemainingTasks from "./ActivityScreen/RemainingTasks";

import { TodoContext } from './TodoContext';

export default function Activity() {
  const [value, setValue] = useState("");
  // const [todos, setTodos] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [completedToday, setCompletedToday] = useState(0);
  const [dueToday, setDueToday] = useState(0);
  const [dueThisWeek, setDueThisWeek] = useState(0);
  const { todos, addTodo, removeTodo, toggleTodoCompleted } = useContext(TodoContext);

  //placeholder
  let streak = 3;
  //let completedToday = 3;
  //let dueToday = 2;
  //let dueThisWeek = 7;

  const isToday = (date) => {
    const t = new Date();
    const today = new Date(t.setHours(0,0,0,0))
    const comparison = new Date(date.setHours(0,0,0,0))
    return (
      date===comparison
    );
  };
  // Function to get todos due this week

  const getTodosDueThisWeek = () => {

    const now = new Date();
    const startOfWeekDate = startOfWeek(now, { weekStartsOn: 1 }); // assuming week starts on Monday
    const endOfWeekDate = endOfWeek(now, { weekStartsOn: 1 });
  
    return todos.filter(todo => {
      
      return dateExists(todo.due_date) && isWithinInterval(new Date(todo.due_date), { start: startOfWeekDate, end: endOfWeekDate });
    }).length;
  };


  const getCompletedToday = () => {
    return todos.filter(todo => todo.completed === true).length
  }

  const dateExists = (date) => {
    if (Object.keys(date).length === 0){
      return false
    }else{
      return true
    }
  }
  const getDueToday = () => {
    todos.filter(todo => todo.completed === false && dateExists(todo.due_date) && isToday(todo.due_date).length)
  }

  useEffect(() => {
    const date = new Date();
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const [month, day, year] = formattedDate.split(" ");
    setCurrentDate(`Today, ${month} ${day.replace(",", "")}, ${year}`);
  }, []);

  useEffect(() => {
    setCompletedToday(getCompletedToday())
    setDueToday(getDueToday())
    setDueThisWeek(getTodosDueThisWeek())

  }, [todos]);

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{currentDate}</Text>
      <View style={styles.streakContainer}>
        {/* if streak is null or 0,  display,  set task or complete daily goal to begin streak   */}
        <Text style={styles.streakHeader}>Streak: </Text>
        <Text style={styles.streakNumber}>{streak}</Text>
        <MaterialCommunityIcons name="fire" size={30} color="black" />
      </View>
      {/* if none, display reached daily goal... if daily goal not set, just don't have...*/}
      <RemainingTasks />
      {/* Summary Section */}
      <Text style={styles.summary}>Summary</Text>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBoxBlack}>
          <Text style={styles.summaryBlackBoxText}>Completed Today: </Text>
          <Text style={styles.summaryBlackBoxNum}>{completedToday}</Text>
        </View>
        <View style={styles.summaryBoxWhite}>
          <Text style={styles.summaryWhiteBoxText}>Due Today: </Text>
          <Text style={styles.summaryWhiteBoxNum}>{dueToday}</Text>
        </View>
        <View style={styles.summaryBoxWhite}>
          <Text style={styles.summaryWhiteBoxText}>Due this week: </Text>
          <Text style={styles.summaryWhiteBoxNum}>{dueThisWeek}</Text>
        </View>
      </View>

      {/* if streak is null or 0,  display,  set task or complete daily goal to begin streak   */}
      <Text style={styles.buttonText}>Completed Tasks</Text>
      <View>
        <ScrollView style={styles.scroll}>
          {todos.map(
            (item) =>
              item.completed && (
                <TodoList
                  text={item.text}
                  key={item.key}
                  not_editable={true}
                  due_date={item.due_date}
                  todoItem={item.completed}
                />
              )
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  scroll: {
    marginTop: 16,
    //flex: 1
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    //height: 48,
    width: "100%",
    //borderColor: "black",
    //  borderWidth: 1,
  },
  streakHeader: {
    fontFamily: "Inter",
    // letterSpacing: 0.4,
    color: "black",
    fontSize: 20,
  },
  streakNumber: {
    fontFamily: "Inter",
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },

  summary: {
    fontFamily: "Inter",
    color: "#A5A5A5",
    fontSize: 24,
    justifyContent: "flex-end",
  },
  summaryContainer: {
    flex: 1,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryBoxWhite: {
    width: 100,
    height: 80,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  summaryBoxBlack: {
    width: 100,
    height: 80,
    borderRadius: 10,
    backgroundColor: "black",
  },
  summaryBlackBoxText: {
    color: "white",
    left: 10,
    top: 5,
  },
  summaryWhiteBoxText: {
    color: "black",
    padding: 5,
  },
  summaryWhiteBoxNum: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    position: "absolute",
    bottom: 10,
    left: 20,
  },
  summaryBlackBoxNum: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    bottom: 10,
    left: 20,
  },
  setGoalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 16,
  },
});


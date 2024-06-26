import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import TodoList from "./TodoList";
//import { readTodos, deleteCompletedTodos } from "./TodosService";
//import streakIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { startOfWeek, endOfWeek, parseISO, isWithinInterval } from 'date-fns';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import RemainingTasks from "./ActivityScreen/RemainingTasks";
import GoalModal from "./ActivityScreen/GoalModal";
import SummarySection from "./ActivityScreen/SummarySection"; // Import the SummarySection component


import { TodoContext } from './TodoContext';

import { GoalContext } from "./DailyGoalContext";
import { GoalProvider } from "./DailyGoalContext";

export default function Activity() {
  const [currentDate, setCurrentDate] = useState("");
  const [goalModalVisible, setGoalModalVisible] = useState(false); // Add state for modal visibility
  //const [goalMode, setGoalMode] = useState("set"); // Add state for goal mode
  
  const [initialGoals, setInitialGoals] = useState({
    minutesGoal: "3",
    hoursGoal: "1",
    daysGoal: "1",
  }); // Add state for initial goals

  const [completedToday, setCompletedToday] = useState(0);
  const [dueToday, setDueToday] = useState(0);
  const [dueThisWeek, setDueThisWeek] = useState(0);
  //const [hasDailyGoal, setDailyGoal] = useState(false);

  const { todos, addTodo, removeTodo, toggleTodoCompleted } = useContext(TodoContext);
  const { goal, goalExists, updateGoal } = useContext(GoalContext);

  // Placeholder values
  let streak = 3;
  //let completedToday = 3;
  //let dueToday = 2;
  //let dueThisWeek = 7;

  const isToday = (date) => {
    const d = new Date(date)
    const t = new Date();
    const today = new Date(t.setHours(0, 0, 0, 0))
    const comparison = new Date(d.setHours(0, 0, 0, 0))
    return today.getTime() == comparison.getTime()
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

  const getTodosDueThisWeek = () => {
    const newArr = todos.filter(todo => !todo.completed && todo.has_due_date && isDateInThisWeek(new Date(todo.due_date)));
    return newArr.length
  };

  const getCompletedToday = () => {
    return todos.filter(todo => todo.completed === true).length
  }

  const dateExists = (date) => {
    if (Object.keys(date).length === 0) {
      return false
    } else {
      return true
    }
  }
  const getDueToday = () => {

    const newArr = todos.filter(todo => todo.completed === false && todo.has_due_date === true && isToday(todo.due_date) === true)
    const amount = newArr.length
    return amount
  }

  useEffect(() => {
    const date = new Date();
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const [month, day, year] = formattedDate.split(" ");
    setCurrentDate(`Today, ${month} ${day.replace(",", "")}, ${year}`);
  }, []);

  const openGoalModal = (mode) => {
    //setGoalMode(mode);
    setGoalModalVisible(true);
  };

  const closeGoalModal = () => {
    setGoalModalVisible(false);
  };

  const saveGoals = (goals) => {
    updateGoal({minutes_tasks: goals.minutes, hours_tasks: goals.hours, days_tasks: goals.days, completed: false, last_goal_refresh: Date.now()})
    //save goal to secure storage using the context
    setInitialGoals(goals);
    //setDailyGoal(true);
  };


  return (
    //<GoalProvider>
      <View style={styles.container}>
        <Text style={styles.dateText}>{currentDate}</Text>
        <ScrollView style={styles.scroll}>
          <View style={styles.streakContainer}>
            {/* If streak is null or 0, display "Set task or complete daily goal to begin streak" */}
            <Text style={styles.streakHeader}>Streak: </Text>
            <Text style={styles.streakNumber}>{streak}</Text>
            <MaterialCommunityIcons name="fire" size={30} color="black" />
          </View>
          {/* If none, display "reached daily goal"... If daily goal not set, just don't have... */}

          <View style={styles.dailyGoalContainer}>
            <Text style={styles.summary}>Daily Goal</Text>
            <Text style={styles.editGoalText}>Edit Goal</Text>

            {/* If none, display "reached daily goal"... If daily goal not set, just don't have... */}
          </View>

          <View style={styles.container}>
            {!goalExists() ? (
              <View style={styles.remainingTasksContainer}>
                <Text>Have not set a daily goal</Text>
                {/*     <TouchableOpacity oonPress={() => openGoalModal("set")} style={styles.button}>
                          <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity> */}
                <Button
                  onPress={() => openGoalModal("set")}
                  title="Set daily goal"
                />
              </View>
            ) : (
              <View>
                <Button
                  onPress={() => openGoalModal("edit")}
                  title="Edit daily goal"
                />
                <RemainingTasks />
              </View>
            )}
          </View>
          {/* Summary Section */}
          <Text style={styles.summary}>Summary</Text>
          {/* Replace the summary section with SummarySection */}
          <SummarySection
            completedToday={getCompletedToday()}
            dueToday={getDueToday()}
            dueThisWeek={getTodosDueThisWeek()}
          />

          {/* if streak is null or 0,  display,  set task or complete daily goal to begin streak   */}
          <Text style={styles.buttonText}>Completed Tasks</Text>
          <View>

            {todos.map((item) =>
              item.completed ? (
                <View
                  key={item.key}
                  style={
                    item.taskType === "minutes"
                      ? styles.minutesTask
                      : item.taskType === "hours"
                        ? styles.hoursTask
                        : styles.daysTask
                  }
                >
                  <TodoList
                    text={item.text}
                    key={item.key}
                    todo={item}
                    not_editable={true}
                    due_date={item.due_date}
                    todoItem={item.completed}
                  />
                </View>
              ) : null
            )}
          </View>
          <GoalModal
            visible={goalModalVisible}
            onClose={closeGoalModal}
            onSave={saveGoals}
            initialMode={goalExists()? "initialMode" : "set"}
            initialGoals={initialGoals}
          />
        </ScrollView>
      </View>
    //</GoalProvider>
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
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    //justifyContent: "flex-end",
  },
  streakHeader: {
    fontFamily: "Inter",
    color: "black",
    fontSize: 20,
  },
  streakNumber: {
    fontFamily: "Inter",
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  dailyGoalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  editGoalText: {
    fontFamily: "Inter",
    color: "#A5A5A5",
    fontSize: 16,
    justifyContent: "flex-end",
  },
  remainingTasksContainer: {
    width: "100%",
    padding: 16,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 16,
    backgroundColor: "black",
    marginTop: 40,
  },

  scroll: {
    marginTop: 16,
  },
  summary: {
    fontFamily: "Inter",
    color: "#A5A5A5",
    fontSize: 24,
    justifyContent: "flex-end",
  },
  minutesTask: {
    backgroundColor: "rgba(255, 38, 246, 0.75)",
    borderRadius: 5,
    marginVertical: 5,
  },
  hoursTask: {
    backgroundColor: "#9D6AF0",
    borderRadius: 5,
    marginVertical: 5,
  },
  daysTask: {
    backgroundColor: "#7DA1FD",
    borderRadius: 5,
    marginVertical: 5,
  },
});
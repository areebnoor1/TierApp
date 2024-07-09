import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import TodoList from "./TodoList";
//import { readTodos, deleteCompletedTodos } from "./TodosService";
//import streakIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { startOfWeek, endOfWeek, parseISO, isWithinInterval } from "date-fns";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import RemainingTasks from "./ActivityScreen/RemainingTasks";
import GoalModal from "./ActivityScreen/GoalModal";
import SummarySection from "./ActivityScreen/SummarySection"; // Import the SummarySection component
import DailyGoal from "./ActivityScreen/DailyGoal"; // Import the SummarySection component

import { TodoContext } from "./TodoContext";

import { GoalContext } from "./DailyGoalContext";
import { GoalProvider } from "./DailyGoalContext";
import TodoListCompleted from "./TodoListCompleted";
import FilledJarIcon from "./SVGicons/FilledJarIcon.js";
import EmptyJarIcon from "./SVGicons/EmptyJarIcon.js";
import DisabledJarIcon from "./SVGicons/DisabledJarIcon.js";
import WeekJars from "./ActivityScreen/WeekJars";


export default function Activity() {
  const [currentDate, setCurrentDate] = useState("");
  const [goalModalVisible, setGoalModalVisible] = useState(false); // Add state for modal visibility
  //const [goalMode, setGoalMode] = useState("set"); // Add state for goal mode
  const [viewOption, setViewOption] = useState("today");
  const [initialGoals, setInitialGoals] = useState({
    minutesGoal: "3",
    hoursGoal: "1",
    daysGoal: "1",
  }); // Add state for initial goals

  const [completedGoals, setCompletedGoals] = useState([]);
  const [completedToday, setCompletedToday] = useState(0);
  const [dueToday, setDueToday] = useState(0);
  const [dueThisWeek, setDueThisWeek] = useState(0);
  const [hasRemaining, setHasRemaining] = useState(true);
  //const [hasDailyGoal, setDailyGoal] = useState(false);

  const {
    todos,
    addTodo,
    removeTodo,
    toggleTodoCompleted,
    completedThisWeek,
    goal,
    goalExists,
    updateGoal,
    setCompleted,
  } = useContext(TodoContext);
  // const {  goal, goalExists, updateGoal, setCompleted} = useContext(GoalContext);

  // Placeholder values
  // let streak = 3;
  //let completedToday = 3;
  //let dueToday = 2;
  //let dueThisWeek = 7;

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

  const getTodosDueThisWeek = () => {
    const newArr = todos.filter(
      (todo) =>
        !todo.completed &&
        todo.has_due_date &&
        isDateInThisWeek(new Date(todo.due_date))
    );
    return newArr.length;
  };

  const getCompletedToday = () => {
    return todos.filter((todo) => todo.completed === true).length;
  };

  const dateExists = (date) => {
    if (Object.keys(date).length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const getDueToday = () => {
    const newArr = todos.filter(
      (todo) =>
        todo.completed === false &&
        todo.has_due_date === true &&
        isToday(todo.due_date) === true
    );
    const amount = newArr.length;
    return amount;
  };

  const minutesTasksLeft = () => {
    //og(goal);
    return (
      goal.minutes_tasks -
      todos.filter(
        (todo) => todo.completed === true && todo.task_type === "minutes"
      ).length
    );
  };
  const hoursTasksLeft = () => {
    return (
      goal.hours_tasks -
      todos.filter(
        (todo) => todo.completed === true && todo.task_type === "hours"
      ).length
    );
  };
  const daysTasksLeft = () => {
    return (
      goal.days_tasks -
      todos.filter(
        (todo) =>
          todo.task_type === "days" &&
          (todo.completed === true ||
            isToday(todo.most_recent_day_made_progress))
      ).length
    );
  };

  const hasRemainingTasks = () => {
    // console.log('check remaining')
    if (
      !("last_day_completed" in goal) &&
      minutesTasksLeft() === 0 &&
      hoursTasksLeft() === 0 &&
      daysTasksLeft() === 0
    ) {
      // console.log('set')
      setCompleted();
    } else if (
      "last_day_completed" in goal &&
      !isToday(goal.last_day_completed) &&
      minutesTasksLeft() === 0 &&
      hoursTasksLeft() === 0 &&
      daysTasksLeft() === 0
    ) {
      //console.log('set')
      setCompleted();
    }
    return (
      minutesTasksLeft() > 0 || hoursTasksLeft() > 0 || daysTasksLeft() > 0
    );
  };

  useEffect(() => {
    const date = new Date();
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const [month, day, year] = formattedDate.split(" ");
    setCurrentDate(`Today, ${month} ${day.replace(",", "")}, ${year}`);
  }, []);

  useEffect(() => {
    setHasRemaining();
  }, []);

  const openGoalModal = (mode) => {
    //setGoalMode(mode);
    setGoalModalVisible(true);
  };

  const closeGoalModal = () => {
    setGoalModalVisible(false);
  };

  const saveGoals = (goals) => {
    updateGoal({
      streak: "streak" in goal ? goal.streak : 0,
      minutes_tasks: goals.minutes,
      hours_tasks: goals.hours,
      days_tasks: goals.days,
      completed: false,
      last_goal_refresh: Date.now(),
    });
    //save goal to secure storage using the context
    setInitialGoals(goals);
    //setDailyGoal(true);
  };

  //<GoalProvider>
  return (
    <View>
      <ScrollView style={styles.scroll}>
        <View style={styles.topBar}>
          <Text style={styles.dateText}>{currentDate}</Text>
          {/*Streak Appearence-- Make so only visible once daily goal is set  */}

          {goalExists() && (
            <View style={styles.streakContainer}>
              <View style={styles.streakHeader}>
                {!("streak" in goal) ? (
                  <Text style={styles.streakNumber}>0</Text>
                ) : !hasRemainingTasks() &&
                  !isToday(goal.last_day_completed) ? (
                  <Text style={styles.streakNumber}>{goal.streak + 1}</Text>
                ) : (
                  <Text style={styles.streakNumber}>{goal.streak}</Text>
                )}
                <MaterialCommunityIcons name="fire" size={30} color="black" />
              </View>
              <Text style={styles.streakText}>Day Streak!</Text>
            </View>
          )}
        </View>
 {goalExists() && <WeekJars completedGoals={completedGoals} />}


        <View style={styles.container}>
          <View style={styles.dailyGoalContainer}>
            <Text style={styles.summary}>Daily Goal</Text>
            {goalExists() && (
              <TouchableOpacity onPress={() => openGoalModal("edit")}>
                <Text style={styles.editGoalText}>Edit Goal</Text>
              </TouchableOpacity>
            )}

            {/* If none, display "reached daily goal"... If daily goal not set, just don't have... */}
          </View>
          {/* If have daily goal, show "edit goal"*/}

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
                <RemainingTasks
                  remaining={hasRemainingTasks()}
                  minutesTasksLeft={minutesTasksLeft()}
                  hoursTasksLeft={hoursTasksLeft()}
                  daysTasksLeft={daysTasksLeft()}
                />
              </View>
            )}
          </View>
          {/* Summary Section */}
          <Text style={styles.summary}>Summary</Text>

          <SummarySection
            completedToday={getCompletedToday()}
            dueToday={getDueToday()}
            dueThisWeek={getTodosDueThisWeek()}
          />

          {/* progress tabs */}

          <View style={styles.progressTabs}>
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
                Daily Progress
              </Text>
              {/* Completed Today*/}
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
                Weekly Progress
              </Text>
              {/* Completed This Week*/}
            </TouchableOpacity>
          </View>
          {viewOption === "today" ? (
            <View>
              {todos.map((item) =>
                item.completed ? (
                  <View key={item.key}>
                    <TodoListCompleted
                      text={item.text}
                      key={item.key}
                      the_key={item.key}
                      todo={item}
                      not_editable={true}
                      due_date={item.due_date}
                      todoItem={item.completed}
                    />
                  </View>
                ) : "days_made_progress" in item &&
                  isToday(item.most_recent_day_made_progress) ? (
                  <TodoListCompleted
                    text={item.text}
                    key={item.key}
                    the_key={item.key}
                    todo={item}
                    not_editable={true}
                    due_date={item.due_date}
                    todoItem={item.completed}
                  />
                ) : null
              )}
            </View>
          ) : (
            <View>
              {completedThisWeek.map((item) =>
                item.completed ? (
                  <View key={item.key}>
                    <TodoListCompleted
                      text={item.text}
                      key={item.key}
                      the_key={item.key}
                      todo={item}
                      not_editable={true}
                      due_date={item.due_date}
                      todoItem={item.completed}
                    />
                  </View>
                ) : "days_made_progress" in item &&
                  isToday(item.most_recent_day_made_progress) ? (
                  <TodoListCompleted
                    text={item.text}
                    key={item.key}
                    the_key={item.key}
                    todo={item}
                    not_editable={true}
                    due_date={item.due_date}
                    todoItem={item.completed}
                  />
                ) : null
              )}
            </View>
          )}

          <GoalModal
            visible={goalModalVisible}
            onClose={closeGoalModal}
            onSave={saveGoals}
            initialMode={goalExists() ? "initialMode" : "set"}
            initialGoals={initialGoals}
          />
        </View>
        {/*</GoalProvider>*/}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  selected: {
    borderRadius: 10,
    backgroundColor: "#828282",
  },
  container: {
    //   flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "flex-start",
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  streakContainer: {
    //  flexDirection: "row",
    alignItems: "center",
    // width: "100%",
    //justifyContent: "flex-end",
    //position: "absolute",
    // top: 0,
    // top: 0,
    //right: 0,
  },
  streakHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakNumber: {
    fontFamily: "Inter",
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  streakText: {
    fontFamily: "Inter",
    color: "black",
    fontSize: 12,
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
  taskOptions: {
    fontFamily: "Inter",
    color: "#A5A5A5",
    fontSize: 20,
    flex: 1,
    // justifyContent: "flex-end",
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

  progressTabs: {
    flexDirection: "row",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    //marginVertical: 10,
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  tabText: {
    color: "#C4C4C4",
    fontFamily: "Inter",
    fontSize: 16,
  },
  activeTab: {
    backgroundColor: "black",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  activeTabText: {
    color: "white",
    fontFamily: "Inter",
    fontSize: 16,
  },
});

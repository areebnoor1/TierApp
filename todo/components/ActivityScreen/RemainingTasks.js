import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { GoalContext } from "../DailyGoalContext";
import { TodoContext } from "../TodoContext";

export default function RemainingTasks({ remaining, minutesTasksLeft, hoursTasksLeft, daysTasksLeft }) {

  // Check if any tasks are left
  const { todos, addTodo, removeTodo, toggleTodoCompleted } = useContext(TodoContext);
 // const { goal, goalExists, updateGoal, setCompleted } = useContext(GoalContext);
  //const [remaining, setRemaining] = useState(true)

  const isToday = (date) => {
    const d = new Date(date)
    const t = new Date();
    const today = new Date(t.setHours(0, 0, 0, 0))
    const comparison = new Date(d.setHours(0, 0, 0, 0))
    return today.getTime() == comparison.getTime()
  };




  useEffect(() => {
   // r = hasRemainingTasks()
    //console.log('remaining', r)
   // setRemaining(r)

  }, [])

  return (

    <View style={styles.remainingTasksContainer}>
      {remaining ? (
        <>
          <Text style={styles.header}>Remaining Tasks:</Text>

          <View style={styles.taskNumberContainers}>
            {minutesTasksLeft > 0 && (
              <View style={styles.taskNumberContainer}>
                <View style={styles.minuteEllipse}>
                  <Text style={styles.taskNumber}>{minutesTasksLeft}</Text>
                </View>
                <Text style={styles.taskText}>Minutes Tasks</Text>
              </View>
            )}

            {hoursTasksLeft > 0 && (
              <View style={styles.taskNumberContainer}>
                <View style={styles.hourEllipse}>
                  <Text style={styles.taskNumber}>{hoursTasksLeft}</Text>
                </View>
                <Text style={styles.taskText}>Hours Tasks</Text>
              </View>
            )}

            {daysTasksLeft > 0 && (
              <View style={styles.taskNumberContainer}>
                <View style={styles.dayEllipse}>
                  <Text style={styles.taskNumber}>{daysTasksLeft}</Text>
                </View>
                <Text style={styles.taskText}>Days Tasks</Text>
              </View>
            )}

            <View style={styles.arrowContainer}>
              <AntDesign name="right" size={24} color="black" />
            </View>
          </View>
        </>
      ) : (
      <>
        <AntDesign name="smile-circle" size={24} color="black" />
        <Text style={styles.finishedText}>Finished all daily tasks, great job!</Text>
        </>
      )}
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
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
    width: 44,
    height: 44,
    backgroundColor: "rgba(255, 38, 246, 0.75)",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  hourEllipse: {
    width: 44,
    height: 44,
    backgroundColor: "#9D6AF0",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  dayEllipse: {
    width: 44,
    height: 44,
    backgroundColor: "#7DA1FD",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  taskNumber: {
    color: "black",
    fontSize: 24,
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
});

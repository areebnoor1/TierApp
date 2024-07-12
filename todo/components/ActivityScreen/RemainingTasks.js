import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { TodoContext } from "../TodoContext";

export default function RemainingTasks({
  remaining,
  minutesTasksLeft,
  hoursTasksLeft,
  daysTasksLeft,
}) {
  const { todos, addTodo, removeTodo, toggleTodoCompleted } =
    useContext(TodoContext);

  const isToday = (date) => {
    const d = new Date(date);
    const t = new Date();
    const today = new Date(t.setHours(0, 0, 0, 0));
    const comparison = new Date(d.setHours(0, 0, 0, 0));
    return today.getTime() === comparison.getTime();
  };

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
          </View>
        </>
      ) : (
        <View style={styles.finishedContainer}>
          <AntDesign name="smile-circle" size={24} color="black" />
          <Text style={styles.finishedText}>
            Finished all daily tasks, great job!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  remainingTasksContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 2,
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
    paddingHorizontal: 10,
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
  finishedContainer: {
    alignItems: "center",
  },
  finishedText: {
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 20,
  },
});

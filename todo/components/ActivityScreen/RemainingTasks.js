import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function RemainingTasks() {
  let minutesTasksLeft = 1;
  let hoursTasksLeft = 1;
  let daysTasksLeft = 3;

  return (
    <View style={styles.container}>
      <View style={styles.remainingTasksContainer}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
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
});

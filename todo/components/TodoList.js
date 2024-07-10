import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TodoContext } from "./TodoContext";
import { format } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import StartTask from "./StartTask";

export default function TodoList(props) {
  const { toggleTodoCompleted } = useContext(TodoContext);
  const [completed, setCompleted] = useState(false);
  const [taskSelectionVisible, setTaskSelectionVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleTaskPress = () => {
    setCurrentTask(props.todo);
    setTaskSelectionVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTaskPress}>

        <View
          style={
            props.todo.task_type === "minutes"
              ? styles.minutesTask
              : props.todo.task_type === "hours"
              ? styles.hoursTask
              : styles.daysTask
          }
        >
          <Icon
            name={"ellipse-outline"}
            size={30}
            color="black"
            style={styles.icon}
            onPress={() => {
              setCompleted(!completed);
              toggleTodoCompleted(props.the_key);
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.listItem}>{props.text}</Text>
            {"days_made_progress" in props.todo && (
              <View style={styles.listItem}>
                <Text style={styles.sessionTitle}>Status: In Progress</Text>
                <View style={styles.sessionContainer}>
                  <View style={styles.totalSessions}>
                    <View style={{ paddingHorizontal: 4, padding: 2 }}>
                      <Text style={{ color: "white" }}>Total</Text>
                      <Text style={{ color: "white" }}>Sessions: </Text>
                    </View>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 24,
                      }}
                    >
                      {props.todo.days_made_progress}
                    </Text>
                  </View>
                  <View style={styles.sessionDate}>
                    <View
                      style={{ alignItems: "flex-start", marginRight: 20 }}
                    >
                      <Text style={{ color: "#001C66" }}>Most</Text>
                      <Text style={{ color: "#001C66" }}>Recent: </Text>
                    </View>
                    <View style={{ alignItems: "flex-start" }}>
                      <Text
                        style={{
                          alignContent: "flex-end",
                          color: "#001C66",
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        {format(
                          props.todo.most_recent_day_made_progress,
                          "eeee,"
                        )}
                      </Text>
                      <Text
                        style={{
                          color: "#001C66",
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        {format(
                          props.todo.most_recent_day_made_progress,
                          "MMMM do"
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            {props.has_due_date && (
              <Text style={styles.dateText}>
                {format(props.due_date, "eeee, MMMM do")}
              </Text>
            )}
          </View>
          <Ionicons
            name="ellipsis-horizontal-circle"
            size={30}
            style={styles.moreIcon}
            onPress={props.editMe}
          />
        </View>
      </TouchableOpacity>
      <StartTask
        currentTask={currentTask}
        taskSelectionVisible={taskSelectionVisible}
        setTaskSelectionVisible={setTaskSelectionVisible}
        setCurrentTask={setCurrentTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  minutesTask: {
  //  backgroundColor: "rgba(255, 38, 246, 0.75)",
    marginTop: "3%",
    justifyContent: "flex-start",
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    marginLeft: "2%",
    width: "96%",
    minHeight: 30,
  },
  hoursTask: {
    marginTop: "3%",
  //  backgroundColor: "#9D6AF0",
    justifyContent: "flex-start",
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    marginLeft: "2%",
    width: "96%",
    minHeight: 30,
  },
  daysTask: {
  //  backgroundColor: "#7DA1FD",
    marginTop: "3%",
    justifyContent: "flex-start",
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    marginLeft: "2%",
    width: "96%",
    minHeight: 30,
  },
  icon: {
    marginLeft: 8,
    marginTop: 8,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
  },
  listItem: {
    paddingHorizontal: 10,
    right: 10,
    marginTop: 12,
    marginBottom: 12,
    marginRight: 70,
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  dateText: {
     borderRadius: 10,
     marginBottom: 10,
     fontStyle: "italic",
   },
  moreIcon: {
    marginLeft: "auto",
    marginTop: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  sessionTitle: {
    fontSize: 16,
  },
  sessionContainer: {
    flexDirection: "row",
    alignItems: "space-between",
    width: "100%",
    padding: 5,
  },
  totalSessions: {
    borderRadius: 8,
    backgroundColor: "#001C66",
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 4,
    marginRight: 5,
  },
  sessionDate: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#001C66",
    flexDirection: "row",
    alignItems: "center",
  //  width: "90%",
    padding: 5,
  },
});

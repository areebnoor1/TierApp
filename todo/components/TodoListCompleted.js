import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TodoContext } from "./TodoContext";
import { format } from "date-fns";
import Line from "./SVGicons/DayTaskLine";

export default function TodoListCompleted(props) {
  const { todos, addTodo, removeTodo, toggleTodoCompleted } =
    useContext(TodoContext);

  const [completed, setCompleted] = useState(false);

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
  };
  return (
    <View
      styles={{
        //    justifyContent: "flex-end",
        flex: 1,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={
          props.todo.task_type === "minutes"
            ? styles.minutesTask
            : props.todo.task_type === "hours"
            ? styles.hoursTask
            : styles.daysTask
        }
      >
        {!props.todo.completed && "days_made_progress" in props.todo ? (
          <MaterialCommunityIcons
            name="progress-check"
            style={{
              marginLeft: 8,
              marginTop: 8,
              marginRight: 8,
              marginBottom: 8,
              //flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            size={30}
          />
        ) : (
          <Icon
            name={"checkmark-circle-outline"}
            size={30}
            color="black"
            style={{
              marginLeft: 8,
              marginTop: 8,
              marginRight: 8,
              marginBottom: 8,
              //flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
            // setCompleted(!completed)
             toggleTodoCompleted(props.the_key);
            }}
          />
        )}
        <View
          styles={{
            flex: 1,
            //flexDirection: 'row',
          }}
        >
          <Text style={styles.listItem}>{props.text}</Text>

          {!props.todo.completed && "days_made_progress" in props.todo && (
            <View style={styles.listItem}>
              <Text style={styles.sessionTitle}>Status: In Progress</Text>
              <Line />
              {/*     <View style={styles.sessionInfo}>
                         <Text style={{color: "#001C66",}}>Session Info</Text>
                          </View> */}

              <View style={styles.sessionContainer}>
                <View style={styles.totalSessions}>
                  <View style={{ paddingHorizontal: 4, padding: 2 }}>
                    <Text style={{ color: "#7DA1FD" }}>Total</Text>
                    <Text style={{ color: "#7DA1FD" }}>Sessions: </Text>
                  </View>
                  <Text
                    style={{
                      color: "#7DA1FD",
                      fontWeight: "bold",
                      fontSize: 24,
                    }}
                  >
                    {props.todo.days_made_progress}{" "}
                  </Text>
                </View>

                <View style={styles.sessionDate}>
                  <View style={{ alignItems: "flex-start", marginRight: 20 }}>
                    <Text style={{ color: "#001C66" }}>Most</Text>
                    <Text style={{ color: "#001C66" }}>Recent: </Text>
                  </View>
                  <View style={{ alignItems: "flex-start" }}>
                    {/*    <Text style={{alignContent: "flex-end",color: "#001C66",fontWeight: "bold", fontStyle: "italic",}}>{format(props.todo.most_recent_day_made_progress, "eeee,")} </Text>
                        <Text style={{color: "#001C66",fontWeight: "bold", fontStyle: "italic",}}>December 25th </Text> */}
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
                      )}{" "}
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
                      )}{" "}
                    </Text>
                  </View>
                </View>

                {/* <Text style={{color: "#7DA1FD",}}>{format(props.todo.most_recent_day_made_progress, "eeee, MMMM do")} </Text>
       <Text> Number of progress sessions: {props.todo.days_made_progress} </Text>  */}
              </View>
            </View>
          )}

          {props.has_due_date && (
            <Text style={styles.dateText}>
              {format(props.due_date, "eeee, MMMM do")}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  minutesTask: {
    backgroundColor: "rgba(255, 38, 246, 0.75)",
    marginTop: "3%",
    //margin
    justifyContent: "flex-start",
    borderWidth: 2,
    borderRadius: 10,
    //padding: 16,
    //display: 'flex',
    //justifyContent: 'center',
    flexDirection: "row",
    marginLeft: "2%",
    width: "96%",
    //alignItems: 'center',
    minHeight: 30,
  },
  hoursTask: {
    marginTop: "3%",
    backgroundColor: "#9D6AF0",
    //margin
    justifyContent: "flex-start",
    borderWidth: 2,
    borderRadius: 10,
    //padding: 16,
    //display: 'flex',
    //justifyContent: 'center',
    flexDirection: "row",
    marginLeft: "2%",
    width: "96%",
    //alignItems: 'center',
    minHeight: 30,
  },
  daysTask: {
    backgroundColor: "#7DA1FD",
    marginTop: "3%",
    //margin
    justifyContent: "flex-start",
    borderWidth: 2,
    borderRadius: 10,
    //padding: 16,
    //display: 'flex',
    //justifyContent: 'center',
    flexDirection: "row",
    marginLeft: "2%",
    width: "96%",
    //alignItems: 'center',
    minHeight: 30,
  },
  sessionTitle: {
    fontSize: 16,
    //  fontStyle: "italic"
    //   fontWeight: "bold",
  },
  sessionInfo: {
    borderWidth: 1,
    borderRadius: 12,
    borderOutline: "#001C66",
    marginTop: 5,
    paddingHorizontal: 5,
    width: "40%",
    alignItems: "center",
    marginBottom: 5,
  },
  sessionContainer: {
    flexDirection: "row",
    alignItems: "space-between",
    // backgroundColor: "red",
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
    //  justifyContent: "flex-end",
  //  width: "60%",

    borderRadius: 7,
    //   backgroundColor: "#001C66",
    flexDirection: "row",
    alignItems: "space-between",
    padding: 5,
  },

  listContainer: {
    marginTop: "3%",
    //margin
    justifyContent: "flex-start",
    borderWidth: 2,
    borderRadius: 10,
    //padding: 16,
    //display: 'flex',
    //justifyContent: 'center',
    flexDirection: "row",
    marginLeft: "2%",
    width: "96%",
    //alignItems: 'center',
    minHeight: 30,
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
    marginBottom: 10,
    fontStyle: "italic",
  },
});

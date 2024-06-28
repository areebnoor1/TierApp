import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import TodoList from "./TodoList";
import { readTodos, deleteCompletedTodos } from "./TodosService";
//import streakIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RemainingTasks from "./ActivityScreen/RemainingTasks";

export default function Activity() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  //placeholder
  let streak = 3;

  useFocusEffect(() => {
    const fetchTodos = async () => {
      const todos = await readTodos();
      deleteCompletedTodos();
      setTodos(todos);
    };
    fetchTodos();
  });

  useEffect(() => {
    const date = new Date();
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const [month, day, year] = formattedDate.split(" ");
    setCurrentDate(`Today, ${month} ${day.replace(",", "")}, ${year}`);
  }, []);

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
});

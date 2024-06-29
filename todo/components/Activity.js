import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Button} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import TodoList from "./TodoList";
import { readTodos, deleteCompletedTodos } from "./TodosService";
//import streakIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RemainingTasks from "./ActivityScreen/RemainingTasks";
import GoalModal from "./ActivityScreen/GoalModal";

export default function Activity() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('set');
  //placeholder
  let streak = 3;
    let completedToday = 3;
    let dueToday = 2;
    let dueThisWeek = 7;
    const [hasDailyGoal, setDailyGoal] = useState(false);

   /* useFocusEffect(() => {
        const fetchTodos = async () => {
          const todos = await readTodos();
          deleteCompletedTodos();
          setTodos(todos);
        };
        fetchTodos();
        //also delete all the tasks that are from a previous day
      })*/

  useEffect(() => {
    const date = new Date();
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const [month, day, year] = formattedDate.split(" ");
    setCurrentDate(`Today, ${month} ${day.replace(",", "")}, ${year}`);
  }, []);

    const openGoalModal = (mode) => {
      setModalMode(mode);
      setModalVisible(true);
    };

    const closeGoalModal = () => {
      setModalVisible(false);
    };

    const saveGoals = (goals) => {
      // Save the goals here
      setDailyGoal(true);
      console.log('Saved goals:', goals);
    };


  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{currentDate}</Text>
      <View style={styles.streakContainer}>
        {/* If streak is null or 0, display "Set task or complete daily goal to begin streak" */}
        <Text style={styles.streakHeader}>Streak: </Text>
        <Text style={styles.streakNumber}>{streak}</Text>
        <MaterialCommunityIcons name="fire" size={30} color="black" />
      </View>
      {/* If none, display "reached daily goal"... If daily goal not set, just don't have... */}
      <Text style={styles.summary}>Daily Goal</Text>

      <View style={styles.container}>
        {!hasDailyGoal ? (
          <View style={styles.remainingTasksContainer}>
            <Text>Have not set a daily goal</Text>
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
            <GoalModal
              visible={modalVisible}
              onClose={closeGoalModal}
              onSave={saveGoals}
              initialMode={modalMode}
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
    remainingTasksContainer: {
      width: "100%",
      padding: 16,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 10,
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


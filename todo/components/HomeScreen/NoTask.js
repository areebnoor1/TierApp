import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Modal,
  Alert,
} from "react-native";
import JarIcon from "../../components/SVGicons/JarIcon";
import TaskSelectionModal from "./TaskSelectionModal";
import RandomTask from "./RandomTask";
import { createTodo, readTodos, updateTodo, deleteTodo } from "../TodosService";
import { TodoContext } from "../TodoContext";
import MintutesJar from "../SVGicons/MinutesJar";
import HoursJar from "../SVGicons/HoursJar";
import DaysJar from "../SVGicons/DaysJar";

const [currentDate, setCurrentDate] = useState("");

useEffect(() => {
  const date = new Date();
  const options = { month: "short", day: "2-digit", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const [month, day, year] = formattedDate.split(" ");
  setCurrentDate(`Today, ${month} ${day.replace(",", "")}, ${year}`);
}, []);

export default function NoTask({ setModalVisible, setCurrentTask }) {
  const [jarModalVisible, setJarModalVisible] = useState(false);
  const [taskSelectionVisible, setTaskSelectionVisible] = useState(false);
  const [randomTaskSelectionVisible, setRandomTaskSelectionVisible] =
    useState(false);
  const [selectedJar, setSelectedJar] = useState(null);

  const { todos, addTodo, removeTodo, toggleTodoCompleted } =
    useContext(TodoContext);
  /*useEffect(() => {
    const fetchTodos = async () => {
      const todos = await readTodos();
      setTodos(todos.filter(todo => todo.completed === false));
    };
    fetchTodos();
  }, [todos]);*/

  const checkTodosExist = (taskType) => {
    console.log("checking", todos);
    filteredTodos = todos.filter(
      (todo) => todo.task_type === taskType && todo.completed === false
    );
    console.log("filteredtodos", filteredTodos);
    if (filteredTodos.length === 0) {
      return null;
    }
  };

  const openJarModal = (jar) => {
    setSelectedJar(jar);
    setJarModalVisible(true);
  };

  const closeModal = () => {
    setJarModalVisible(false);
    setSelectedJar(null); // Reset selectedJar when modal is closed
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.dateText}>{currentDate}</Text>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>No tasks active.</Text>
          <Text style={styles.welcomeText}>Select a jar to get started!</Text>
        </View>

        <View style={styles.jarsContainer}>
          {/* Container for Minutes */}
          <View style={styles.jarContainer}>
            <Pressable
              onPress={() => {
                if (checkTodosExist("minutes") === null) {
                  Alert.alert("", "No todos in this category", [
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                  ]);
                } else {
                  openJarModal("minutes");
                  setSelectedJar("minutes");
                  setJarModalVisible(true);
                }
              }}
              style={({ pressed }) => [
                { opacity: pressed || selectedJar === "minutes" ? 0.6 : 1 },
              ]}
            >
              <MintutesJar />
            </Pressable>
          </View>

          {/* Container for Hours */}
          <View style={styles.jarContainer}>
            <Pressable
              onPress={() => {
                if (checkTodosExist("hours") === null) {
                  Alert.alert("", "No todos in this category", [
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                  ]);
                } else {
                  openJarModal("hours");
                  setSelectedJar("hours");
                  setJarModalVisible(true);
                }
              }}
              style={({ pressed }) => [
                { opacity: pressed || selectedJar === "hours" ? 0.6 : 1 },
              ]}
            >
              <HoursJar />
            </Pressable>
          </View>

          {/* Container for Days */}
          <View style={styles.jarContainer}>
            <Pressable
              onPress={() => {
                if (checkTodosExist("days") === null) {
                  Alert.alert("", "No todos in this category", [
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                  ]);
                } else {
                  openJarModal("days");
                  setSelectedJar("days");
                  setJarModalVisible(true);
                }
              }}
              style={({ pressed }) => [
                { opacity: pressed || selectedJar === "days" ? 0.6 : 1 },
              ]}
            >
              <DaysJar />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Jar Selection Modal */}
      <Modal
        transparent={true}
        visible={jarModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            {/* Close Modal Button */}
            <Pressable style={styles.pressableContainer} onPress={closeModal}>
              <Text style={styles.buttonText}>X</Text>
            </Pressable>

            {/* Display selected jar */}
            <Text style={styles.selectedJarText}>
              Selected Jar: {selectedJar}
            </Text>

            {/* Choose Random Task Button */}
            <Pressable
              style={styles.pressableContainer}
              onPress={() => {
                //  closeModal();
                setRandomTaskSelectionVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Choose random task</Text>
            </Pressable>

            {/* Choose Task Button */}
            <Pressable
              style={styles.pressableContainer}
              onPress={() => {
                // closeModal();
                setTaskSelectionVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Choose task</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Task Selection Modal */}
      <TaskSelectionModal
        taskSelectionVisible={taskSelectionVisible}
        setTaskSelectionVisible={setTaskSelectionVisible}
        taskType={selectedJar}
        setCurrentTask={setCurrentTask}
        //todos = {todos}
      />

      <RandomTask
        randomTaskSelectionVisible={randomTaskSelectionVisible}
        setRandomTaskSelectionVisible={setRandomTaskSelectionVisible}
        filteredTodos={todos}
        taskType={selectedJar}
        setCurrentTask={setCurrentTask}
      />
      <Pressable
        style={styles.addTaskButton}
        onPress={() => setModalVisible(true)}
      >
        <Image
          style={{ width: 90, height: 90 }}
          source={require("../../assets/addButton.png")}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    //backgroundColor: "#48249c",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 40,
    backgroundColor: "#48249c",
    justifyContent: "space-around",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  welcomeTextContainer: {
    flexDirection: "column",
    //    justifyContent: "flex-end",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "95%",
    //   paddingHorizontal: 20,
    // marginBottom: 20,
    height: 190,
    backgroundColor: "blue",
  },

  welcomeText: {
    fontSize: 36,
    // fontWeight: "bold",
    fontFamily: "Poppins",
    // textAlign: "center",
    //marginTop: 12,
    // marginBottom: 50,
  },
  jarsContainer: {
    // marginTop: 30,
    flexDirection: "row",
    backgroundColor: "red",
    justifyContent: "space-around",
    width: "95%",
    //paddingHorizontal: 20,
  },
  jarContainer: {
    alignItems: "center",
    //height: 10,
    // backgroundColor: "white",
  },

  addTaskButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },

  //jar modal stuff:
  modalContainer: {
    padding: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",

    borderRadius: 10,
  },

  modalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },

  //rename its the modal buttons
  pressableContainer: {
    backgroundColor: "#48249c",
    textAlign: "center",
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "white",
    marginBottom: 5,
  },

  selectedJarText: {
    fontSize: 20,
    // fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#48249c",
    marginBottom: 20,
  },
});

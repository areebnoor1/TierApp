import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Modal,
  Alert,
} from "react-native";
import MintutesJar from "../SVGicons/MinutesJar";
import HoursJar from "../SVGicons/HoursJar";
import DaysJar from "../SVGicons/DaysJar";
import TaskSelectionModal from "./TaskSelectionModal";
import RandomTask from "./RandomTask";
import { TodoContext } from "../TodoContext";

export default function NoTask({ setModalVisible, setCurrentTask }) {
  const [jarModalVisible, setJarModalVisible] = useState(false);
  const [taskSelectionVisible, setTaskSelectionVisible] = useState(false);
  const [randomTaskSelectionVisible, setRandomTaskSelectionVisible] =
    useState(false);
  const [selectedJar, setSelectedJar] = useState(null);

  const { todos } = useContext(TodoContext);

  const checkTodosExist = (taskType) => {
    const filteredTodos = todos.filter(
      (todo) => todo.task_type === taskType && !todo.completed
    );
    return filteredTodos.length > 0;
  };

  const openJarModal = (jar) => {
    setSelectedJar(jar);
    setJarModalVisible(true);
  };

  const closeModal = () => {
    setJarModalVisible(false);
    setSelectedJar(null);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeTextTitle}>No tasks active.</Text>
        <Text style={styles.welcomeTextHeader}>
          Select a jar to get started!
        </Text>
      </View>

      <View style={styles.jarsContainer}>
        <View style={styles.jarContainer}>
          <Pressable
            onPress={() => {
              if (!checkTodosExist("minutes")) {
                Alert.alert("", "No todos in this category", [
                  { text: "OK", onPress: () => console.log("OK Pressed") },
                ]);
              } else {
                openJarModal("minutes");
              }
            }}
            style={({ pressed }) => [
              { opacity: pressed || selectedJar === "minutes" ? 0.6 : 1 },
            ]}
          >
            <MintutesJar />
          </Pressable>
        </View>

        <View style={styles.jarContainer}>
          <Pressable
            onPress={() => {
              if (!checkTodosExist("hours")) {
                Alert.alert("", "No todos in this category", [
                  { text: "OK", onPress: () => console.log("OK Pressed") },
                ]);
              } else {
                openJarModal("hours");
              }
            }}
            style={({ pressed }) => [
              { opacity: pressed || selectedJar === "hours" ? 0.6 : 1 },
            ]}
          >
            <HoursJar />
          </Pressable>
        </View>

        <View style={styles.jarContainer}>
          <Pressable
            onPress={() => {
              if (!checkTodosExist("days")) {
                Alert.alert("", "No todos in this category", [
                  { text: "OK", onPress: () => console.log("OK Pressed") },
                ]);
              } else {
                openJarModal("days");
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

      <Modal
        transparent={true}
        visible={jarModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <Pressable style={styles.pressableContainer} onPress={closeModal}>
              <Text style={styles.buttonText}>X</Text>
            </Pressable>

            <Text style={styles.selectedJarText}>
              Selected Jar: {selectedJar}
            </Text>

            <Pressable
              style={styles.pressableContainer}
              onPress={() => setRandomTaskSelectionVisible(true)}
            >
              <Text style={styles.buttonText}>Choose random task</Text>
            </Pressable>

            <Pressable
              style={styles.pressableContainer}
              onPress={() => setTaskSelectionVisible(true)}
            >
              <Text style={styles.buttonText}>Choose task</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <TaskSelectionModal
        taskSelectionVisible={taskSelectionVisible}
        setTaskSelectionVisible={setTaskSelectionVisible}
        taskType={selectedJar}
        setCurrentTask={setCurrentTask}
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
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center",
    margin: 10,
  },

  welcomeTextContainer: {
    alignItems: "center",
    justifyContent: "center", // Center content horizontally and vertically
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 180, // Adjust this value as needed
  },

  welcomeTextTitle: {
    fontSize: 36,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#48249c",
  },

  welcomeTextHeader: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: "#6a1b9a",
  },

  jarsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "88%",
    position: "absolute",
    bottom: 130,
  },

  jarContainer: {
    alignItems: "center",
  },

  addTaskButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },

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
  },

  selectedJarText: {
    fontSize: 20,
    fontFamily: "Poppins",
    color: "#48249c",
    marginBottom: 20,
  },
});

import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import MinutesJar from "../SVGicons/MinutesJar";
import HoursJar from "../SVGicons/HoursJar";
import DaysJar from "../SVGicons/DaysJar";
import TaskSelectionModal from "./TaskSelectionModal";
import RandomTask from "./RandomTask";
import { TodoContext } from "../TodoContext";
import LottieView from 'lottie-react-native';
import { EvilIcons } from '@expo/vector-icons';

export default function NoTask({ setModalVisible, setCurrentTask, setInputTaskType }) {
  const [jarModalVisible, setJarModalVisible] = useState(false);
  const [taskSelectionVisible, setTaskSelectionVisible] = useState(false);
  const [randomTaskSelectionVisible, setRandomTaskSelectionVisible] = useState(false);
  const [selectedJar, setSelectedJar] = useState(null);
  const [noTasksModalVisible, setNoTasksModalVisible] = useState(false);
  const [noTasksJar, setNoTasksJar] = useState(null);

  const { todos } = useContext(TodoContext);

  const checkTodosExist = (taskType) => {
    const filteredTodos = todos.filter(
      (todo) => todo.task_type === taskType && todo.completed === false
    );
    if (filteredTodos.length === 0) {
      setNoTasksJar(taskType);
      setNoTasksModalVisible(true);
      return null;
    }
    return filteredTodos;
  };

  const openJarModal = (jar) => {
    setSelectedJar(jar);
    setJarModalVisible(true);
  };

  const closeModal = () => {
    setJarModalVisible(false);
    setSelectedJar(null); // Reset selectedJar when modal is closed
  };

  const closeNoTasksModal = () => {
    setNoTasksModalVisible(false);
    setNoTasksJar(null);
  };


  const capitalizeFirstLetter = (string) => {
    if (!string) return ""; // Handle null or undefined case
    return string.charAt(0).toUpperCase() + string.slice(1);
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
              if (checkTodosExist("minutes") === null) {
                return;
              }
              openJarModal("minutes");
            }}
            style={({ pressed }) => [
              { opacity: pressed || selectedJar === "minutes" ? 0.6 : 1 },
            ]}
          >
            <MinutesJar styles={{

            }}
            />

           {/* */ }

          </Pressable>
        </View>

        <View style={styles.jarContainer}>
          <Pressable
            onPress={() => {
              if (checkTodosExist("hours") === null) {
                return;
              }
              openJarModal("hours");
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
              if (checkTodosExist("days") === null) {
                return;
              }
              openJarModal("days");
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
        animationType="fade"
        transparent={true}
        visible={jarModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <View style={styles.closeModalIcon}>
              <TouchableOpacity onPress={closeModal}>
                <EvilIcons name="close" size={30} color="black" />
              </TouchableOpacity>
            </View>

            {selectedJar && (
              <Text style={styles.modalTitle}>
                Start {capitalizeFirstLetter(selectedJar)} Task
              </Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setRandomTaskSelectionVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Random Task</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setTaskSelectionVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Choose Task</Text>
            </TouchableOpacity>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={noTasksModalVisible}
        onRequestClose={closeNoTasksModal}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <View style={styles.closeModalIcon}>
              <TouchableOpacity onPress={closeNoTasksModal}>
                <EvilIcons name="close" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={styles.noTasksModal}>
              No tasks in {capitalizeFirstLetter(noTasksJar)} jar.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                closeNoTasksModal();
                setModalVisible(true);
                setInputTaskType(noTasksJar)
              }}
            >
              <Text style={styles.buttonText}>
                Add new {capitalizeFirstLetter(noTasksJar)} task
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    padding: 40,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#D9D9D9",
    marginBottom: 20,
    textAlign: "center",
  },
  noTasksModal: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "black",
    //marginBottom: 20,
    textAlign: "center",
  },

  closeModalIcon: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  button: {
    backgroundColor: "black",
    textAlign: "center",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
});

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
import JarOverlay from "../SVGicons/JarOverlayIcon.js";
import HoursJar from "../SVGicons/HoursJar";
import DaysJar from "../SVGicons/DaysJar";

import TaskSelectionModal from "./TaskSelectionModal";
import { useIsFocused } from "@react-navigation/native";
import RandomTask from "./RandomTask";
import { TodoContext } from "../TodoContext";
import LottieView from "lottie-react-native";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

export default function NoTask({
  setModalVisible,
  setCurrentTask,
  setInputTaskType,
}) {
  const [jarModalVisible, setJarModalVisible] = useState(false);
  const [taskSelectionVisible, setTaskSelectionVisible] = useState(false);
  const [randomTaskSelectionVisible, setRandomTaskSelectionVisible] =
    useState(false);
  const [selectedJar, setSelectedJar] = useState(null);
  const [noTasksModalVisible, setNoTasksModalVisible] = useState(false);
  const [noTasksJar, setNoTasksJar] = useState(null);

  const { todos, goal } = useContext(TodoContext);

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
  const isToday = (date) => {
    const d = new Date(date);
    const t = new Date();
    const today = new Date(t.setHours(0, 0, 0, 0));
    const comparison = new Date(d.setHours(0, 0, 0, 0));
    return today.getTime() == comparison.getTime();
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

  const minutesTasksLeft = () => {
    let remaining =
      goal.minutes_tasks -
      todos.filter(
        (todo) => todo.completed === true && todo.task_type === "minutes"
      ).length;
    return Math.max(remaining, 0); // Ensure it doesn't go below 0
  };

  const minutesProgress = () => {
    const remaining = minutesTasksLeft();
    const progress =
      goal.minutes_tasks === 0
        ? 1
        : 0.6 * (1 - remaining / goal.minutes_tasks) + 0.25;
    return isNaN(progress) ? 0 : progress;
  };

  const hoursTasksLeft = () => {
    let remaining =
      goal.hours_tasks -
      todos.filter(
        (todo) => todo.completed === true && todo.task_type === "hours"
      ).length;
    return Math.max(remaining, 0); // Ensure it doesn't go below 0
  };

  const hoursProgress = () => {
    const remaining = hoursTasksLeft();
    const progress =
      goal.hours_tasks === 0
        ? 1
        : 0.6 * (1 - remaining / goal.hours_tasks) + 0.25;
    return isNaN(progress) ? 0 : progress;
  };

  const daysTasksLeft = () => {
    let remaining =
      goal.days_tasks -
      todos.filter(
        (todo) =>
          todo.task_type === "days" &&
          (todo.completed === true ||
            isToday(todo.most_recent_day_made_progress))
      ).length;
    return Math.max(remaining, 0); // Ensure it doesn't go below 0
  };

  const daysProgress = () => {
    const remaining = daysTasksLeft();
    const progress =
      goal.days_tasks === 0
        ? 1
        : 0.6 * (1 - remaining / goal.days_tasks) + 0.25;
    return isNaN(progress) ? 0 : progress;
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
        <Pressable
          onPress={() => {
            if (checkTodosExist("minutes") === null) {
              return;
            }
            openJarModal("minutes");
          }}
        >
          <View style={styles.jarContainer}>
            <MinutesJar progress={minutesProgress()} />
            <JarOverlay style={styles.overlayIcon2} />
            <JarOverlay style={styles.overlayIcon2} />
            <Text style={styles.jarText}>Minutes</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            if (checkTodosExist("hours") === null) {
              return;
            }
            openJarModal("hours");
          }}
        >
          <View style={styles.jarContainer}>
            <HoursJar progress={hoursProgress()} />
            <JarOverlay style={styles.overlayIcon2} />
            <JarOverlay style={styles.overlayIcon2} />
            <Text style={styles.jarText}>Hours</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            if (checkTodosExist("days") === null) {
              return;
            }
            openJarModal("days");
          }}
        >
          <View style={styles.jarContainer}>
            <DaysJar progress={daysProgress()} />
            <JarOverlay style={styles.overlayIcon2} />
            <JarOverlay style={styles.overlayIcon2} />
            <Text style={styles.jarText}>Days</Text>
          </View>
        </Pressable>
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

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome6 name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Add a Task</Text>
      </TouchableOpacity>

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
                setInputTaskType(noTasksJar);
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
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  welcomeTextContainer: {
    //alignItems: "center",
    //justifyContent: "center",
    // backgroundColor: "white",
    padding: 20,
    // borderRadius: 10,
    // elevation: 1,
  },
  welcomeTextTitle: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "black",
    //color: "#48249c",
  },
  welcomeTextHeader: {
    marginTop: 20,
    fontSize: 24,
    textAlign: "center",
    // color: "#6a1b9a",
    color: "black",
  },
  jarsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },

  jarContainer: {
    backgroundColor: "white",
    padding: 15,
    elevation: 2,
    textAlign: "center",
    borderRadius: 10,
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    borderWidth: 1,
    borderColor: "black",
  },

  jarText: {
    fontWeight: "bold",
    // marginTop: 10,
    alignContent: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  jarOverlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  overlayIcon: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  overlayIcon2: {
    position: "absolute",
    top: 15,
    //  left: 0,
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    width: "100%",
    elevation: 2,
  },
  addButtonText: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
  },
  button: {
    backgroundColor: "black",
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
    color: "#D9D9D9",
    marginBottom: 20,
    textAlign: "center",
  },
  noTasksModal: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  closeModalIcon: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

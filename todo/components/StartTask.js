import React, { useEffect, useState, useContext } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TodoContext } from "./TodoContext";

export default function StartTask({
  currentTask,
  taskSelectionVisible,
  setTaskSelectionVisible,
  setCurrentTask,
}) {
  const navigation = useNavigation();
  const { updateTodo } = useContext(TodoContext);

  const closeModal = () => {
    setTaskSelectionVisible(false);
  };

  const handleBeginTask = async () => {
    currentTask.started = true;
    await updateTodo(currentTask.key, currentTask);
    setCurrentTask(currentTask);
    setTaskSelectionVisible(false);
    navigation.navigate("Home", { currentTask }); // Pass currentTask as a parameter
  };

  return (
    <Modal
   //   animationType="fade"
      transparent={true}
      visible={taskSelectionVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.screen}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={closeModal} style={styles.closeModalIcon}>
            <EvilIcons name="close" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Start Task</Text>
          <View style={styles.taskContainer}>
            <ScrollView>
              <Text style={styles.itemText}>{currentTask?.text}</Text>
            </ScrollView>
          </View>

          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={handleBeginTask} style={styles.button}>
              <Text style={styles.buttonText}>Begin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
       </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 40,
    alignItems: "center",
    width: "90%",
    elevation: 5,
  },
  closeModalIcon: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#D9D9D9",
    marginBottom: 20,
    textAlign: "center",
  },
  taskContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    height: 120,
    marginBottom: 20,
    width: "100%",
  },
  itemText: {
    textAlignVertical: "top",
    fontSize: 16,
    padding: 10,
    maxHeight: 150,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "80%",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
});

import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { EvilIcons } from '@expo/vector-icons';

export default function StartTask({
  currentTask,
  taskSelectionVisible,
  setTaskSelectionVisible,
  setCurrentTask,
}) {
  const closeModal = () => {
    setTaskSelectionVisible(false);
  };

  const handleBeginTask = () => {
    // Logic to begin the task
    setTaskSelectionVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={taskSelectionVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={closeModal} style={styles.closeModalIcon}>
              <EvilIcons name="close" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Start Task</Text>
          <View style={styles.taskContainer}>
            <Text style={styles.itemText}>{currentTask?.text}</Text>
          </View>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={handleBeginTask} style={styles.iconContainer}>
              <Ionicons name="checkmark-circle-sharp" size={50} color="black" />
              <Text style={styles.buttonText}>Begin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "Poppins-Bold",
    color: "black",
    marginTop: 5,
    textAlign: "center",
  },
});

import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function RandomTask({
  filteredTodos,
  setRandomTaskSelectionVisible,
  randomTaskSelectionVisible,
  taskType,
  setCurrentTask
}) {
  const [item, setItem] = useState({});

  useEffect(() => {
    if (randomTaskSelectionVisible) {
      setItem(getRandomTodo());
    }
  }, [randomTaskSelectionVisible]);

  const getRandomTodo = () => {
    const filtered = filteredTodos.filter(todo => todo.task_type === taskType && !todo.completed);
    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
  };

  const closeModal = () => {
    setRandomTaskSelectionVisible(false);
  };

  const getTaskTypeMessage = (taskType) => {
    switch (taskType) {
      case 'minutes':
        return 'Random Minutes Task';
      case 'hours':
        return 'Random Hours Task';
      case 'days':
        return 'Random Days Task';
      default:
        return 'Random Task';
    }
  };

  const handlePickAgain = () => {
    setItem(getRandomTodo());
  };

  const handleBeginTask = () => {
    setCurrentTask(item);
    setRandomTaskSelectionVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={randomTaskSelectionVisible}
      onRequestClose={closeModal}
    >

      <View style={styles.centeredView}>
        <View style={styles.modalView}>

          <TouchableOpacity onPress={closeModal} style={styles.closeModalIcon}>
            <Ionicons name="arrow-back-circle" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{getTaskTypeMessage(taskType)}</Text>

          <ScrollView style={styles.taskContainer}>
            <Text style={styles.itemText}>{item.text}</Text>
          </ScrollView>

          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={handlePickAgain} style={styles.iconContainer}>
              <Ionicons name="refresh-outline" size={50} color="black" />
              <Text style={styles.buttonText}>Pick again</Text>
            </TouchableOpacity>

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
       textAlignVertical: "top",
       fontSize: 16,
       padding: 10,
       maxHeight: 150,
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

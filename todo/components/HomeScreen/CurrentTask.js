import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Modal, ScrollView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import VerticalLine from "../SVGicons/VerticalLine";
import { TodoContext } from '../TodoContext';

const windowHeight = Dimensions.get('window').height;

export default function CurrentTask({ visible, currentTask, setCurrentTask }) {
  const navigation = useNavigation();
  //const { toggleTodoCompleted } = useContext(TodoContext);
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useState(new Animated.Value(-windowHeight))[0];
  const opacity = useState(new Animated.Value(0))[0];

  const { todos, addTodo, removeTodo, toggleTodoCompleted, updateTodo } = useContext(TodoContext);

  const openModal = () => {
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -200,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -windowHeight,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setModalVisible(false));
  };

  const handleFinishTask = async () => {
    currentTask.completed = true;
    currentTask.completion_date = Date.now();
    await updateTodo(currentTask.key, currentTask);
    setCurrentTask({});
    closeModal(); // Close modal after finishing task
    navigation.navigate('Activity'); // Navigate back to the Activity component
  };

  const completeTask = async () => {
    currentTask.completed = true;
    currentTask.completion_date = Date.now();
    await updateTodo(currentTask.key, currentTask);
    setCurrentTask({});
    navigation.navigate("Activity"); // Navigate back to the Activity component
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.screen}>
        <TouchableOpacity onPress={openModal}>
          <View style={styles.exitTaskArrow}>
            <AntDesign name="downcircle" size={40} color="white" />
          </View>
        </TouchableOpacity>

        <View style={styles.curTask}>
          <ScrollView style={styles.scroll}>
            <Text style={styles.welcomeText}>Active Task</Text>
            <VerticalLine />
            <Text style={styles.taskText}>{currentTask.text}</Text>
          </ScrollView>

          {/* Overlay to darken background */}
          {modalVisible && (
            <Animated.View style={[styles.overlay, { opacity }]} />
          )}

          {/* Animated modal */}
          <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
            <View style={currentTask.task_type === 'days' ? styles.modalContentDay : styles.modalContent}>
              <View style={styles.closeIconContainer}>
                <TouchableOpacity onPress={() => setCurrentTask({})}>
                  <FontAwesome name="close" style={styles.closeIcon} size={40} />
                </TouchableOpacity>
              </View>
              {currentTask.task_type === 'days' && (
                <TouchableOpacity
                  onPress={() => {
                    setCurrentTask({});
                    const days_of_progress = "days_made_progress" in currentTask ? currentTask.days_made_progress + 1 : 1;
                    updateTodo(currentTask.key, {
                      most_recent_day_made_progress: Date.now(),
                      days_made_progress: days_of_progress,
                    });
                  }}
                >
                  <Text style={styles.madeProgressButton}>Made Progress</Text>
                </TouchableOpacity>
              )}
              <View style={styles.modalItem}>
                <TouchableOpacity onPress={() => {
                  toggleTodoCompleted(currentTask.key);
                  setCurrentTask({});
                  navigation.navigate("Activity");
                }}>
                  <Text style={styles.finishedTaskButton}>Finished Task</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalItem}>
                <TouchableOpacity onPress={closeModal}>
                  <AntDesign name="upcircle" size={40} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  exitTaskArrow: {
    position: "absolute",
    bottom: 70,
    alignItems: 'flex-end',
    right: 40,
  },
  curTask: {
    backgroundColor: "white",
    padding: 24,
    height: 450,
  },
  welcomeText: {
    fontSize: 32,
    color: '#BEBEBE',
    textAlign: 'left',
    marginBottom: 10,
  },
  taskText: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
    marginTop: 30,
  },
  scroll: {
    marginTop: 16,
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    height: 300,
  },
  modalContentDay: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    height: 400, // Adjust the height as needed for days tasks
  },
  closeIconContainer: {
    alignItems: "flex-start",
    width: "100%",
  },
  modalItem: {
    alignItems: "center",
    width: "100%",
    marginVertical: 20,

  },
  closeIcon: {
    alignSelf: "flex-start",
    color: 'black',
    marginBottom: 10,
  },
  finishedTaskButton: {
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
    padding: 10,
    width: 220,
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },
  madeProgressButton: {
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
    padding: 10,
    width: 220,
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Modal, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { updateTodo } from '../TodosService';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import VerticalLine from "../SVGicons/VerticalLine";
import TodoListButton from "../TodoListButton";
import { db } from "../firebase";
import { TodoContext } from '../TodoContext';

const windowHeight = Dimensions.get('window').height;

export default function CurrentTask({
  taskSelectionVisible,
  setTaskSelectionVisible,
  currentTask,
  setCurrentTask,
  taskType,
}) {
  const navigation = useNavigation();
  const { todos, addTodo, removeTodo, toggleTodoCompleted, updateTodo } = useContext(TodoContext);

  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useState(new Animated.Value(-windowHeight))[0];
  const opacity = useState(new Animated.Value(0))[0];

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
      {/* opens the exit task modal. Should be positioned absolute somewhere above taskcard.*/}
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



                {/* Custom animated modal */}
                  {modalVisible && (
                    <Animated.View style={[styles.overlay, { opacity }]} />
                  )}
                  <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
                    <View style={styles.modalContent}>
                      <View style={styles.closeIconContainer}>
                        {/* Close icon */}
                        <TouchableOpacity onPress={() => setCurrentTask({})}>
                          <FontAwesome name="close" style={styles.closeIcon} size={40} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.modalItem}>
                        {/* Finished Task button */}
                        <TouchableOpacity onPress={completeTask}>
                          <Text style={styles.finishedTaskButton}>Finished Task</Text>
                        </TouchableOpacity>

                                {currentTask.task_type === 'days' &&
                                  <TouchableOpacity onPress={() => {
                                    setCurrentTask({})
                                    days_of_progress = "days_made_progress" in currentTask ? currentTask.days_made_progress+1 : 1
                                    updateTodo(currentTask.key,{
                                      most_recent_day_made_progress: Date.now(), days_made_progress: days_of_progress
                                    })
                                  }}>
                                    <Text>Made progress</Text>
                                  </TouchableOpacity>
                                }

        <TouchableOpacity>
          <Text
            style={styles.welcomText}
            onPress={async () => {
              currentTask.completed = true;
              currentTask.completion_date = Date.now();
              await updateTodo(currentTask.key, currentTask);
              setCurrentTask({});
              navigation.navigate("Activity"); // Navigate back to the Activity component
            }}
          >
            Finished Task
          </Text>
        </TouchableOpacity>

                      </View>
                      <View style={styles.modalItem}>
                        {/* upcircle, moves modal back up */}
                        <TouchableOpacity onPress={closeModal}>
                          <AntDesign name="upcircle" size={40} color="black" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Animated.View>
                  {/* end Custom animated modal */}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
    // should be positioned above curTask
    exitTaskArrow: {
      position: "absolute",
      bottom: 70,
      alignItems: 'flex-end',
    },
      curTask: {
        backgroundColor: "white", //'#EBEBEB',
        padding: 24,
        height: 400,
      },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  closeButton: {
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    marginBottom: 10,
  },
  topBarText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  placeholder: {
    width: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  listContainer: {
    flex: 1,
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
      //justifyContent: "center",
      //alignItems: "center",
      alignItems: "space-evenly",
      width: "100%",
      backgroundColor: "white",
      padding: 20,
      height: 400,
    },
    closeIconContainer: {
      alignItems: "flex-start",
      width: "100%",
     // backgroundColor: "red",
    },
    modalItem: {
      alignItems: "center",
      width: "100%",
      marginVertical: 10,
      marginBottom: 10,
    },
    closeIcon: {
     // alignSelf: "flex-start",
      color: 'black',
      marginBottom: 10,
    },
    finishedTaskButton: {
      backgroundColor: "black",
      color: "white",
      borderRadius: 8,
      padding: 10,
      fontSize: 18,
      textAlign: "center",
      marginTop: 10,
    },
});

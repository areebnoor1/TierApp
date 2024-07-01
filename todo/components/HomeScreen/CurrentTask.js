import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { updateTodo } from '../TodosService';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;

export default function CurrentTask({
  currentTask,
  setCurrentTask,
}) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useState(new Animated.Value(-windowHeight))[0];

  const openModal = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setModalVisible(true);
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: -windowHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleFinishTask = async () => {
    currentTask.completed = true;
    currentTask.completion_date = Date.now();
    await updateTodo(currentTask.key, currentTask);
    setCurrentTask({});
    closeModal(); // Close modal after finishing task
    navigation.navigate('Activity'); // Navigate back to the Activity component
  };

  return (
    <View style={styles.screen}>
      <View style={styles.curTask}>
        <TouchableOpacity onPress={() => setCurrentTask({})}>
          <FontAwesome name="close" style={styles.icon} size={40} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFinishTask}>
          <Text style={styles.welcomeText}>Done</Text>
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Active task</Text>
        <Text style={{ fontSize: 25, color: 'white', marginBottom: 20 }}>{currentTask.text}</Text>

        {/* Arrow icon to open modal */}
        <TouchableOpacity onPress={openModal}>
           <AntDesign name="downcircleo" size={24} color="black" />
        </TouchableOpacity>

        {/* Custom animated modal */}
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal} />
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleFinishTask}>
              <Text style={styles.modalButton}>Finished task</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal}>

               <AntDesign name="upcircle" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  curTask: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
  },
  icon: {
    color: 'white',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center/',
    marginBottom: 10,
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: '#fff',
    //padding: 20,
   // borderTopLeftRadius: 20,
  //  borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalButton: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
  },
});

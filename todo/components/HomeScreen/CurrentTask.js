import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { updateTodo } from '../TodosService';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;

export default function CurrentTask({
  visible,
  currentTask,
  setCurrentTask,
}) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useState(new Animated.Value(-windowHeight))[0];

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(translateY, {
      toValue: -windowHeight / 3,
      duration: 300,
      useNativeDriver: true,
    }).start();
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
    <Modal visible={visible} transparent={true}>
      <View style={styles.screen}>
        {modalVisible && (
          <View style={styles.overlay} />
        )}
                  <TouchableOpacity onPress={openModal}>
                  <View style={styles.upArrowContainer}>
                    <AntDesign name="upcircle" size={24} color="white" />
                    </View>
                  </TouchableOpacity>

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
          <View style={styles.upArrowContainer}>
            <AntDesign name="upcircle" size={24} color="white" />
            </View>
          </TouchableOpacity>

          {/* Custom animated modal */}
          <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={handleFinishTask}>
                <Text style={styles.modalButton}>Finished</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <FontAwesome name="close" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <AntDesign name="downcircleo" size={24} color="black" />
              </TouchableOpacity>
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
    backgroundColor: '#000',
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    textAlign: 'center',
    marginBottom: 10,
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: windowHeight / 3,
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
  },
  upArrowContainer: {
      position: "absolute",
      bottom: 20,
      right: 20,
  }
});

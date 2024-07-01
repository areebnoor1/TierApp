import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Modal, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { updateTodo } from '../TodosService';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import VerticalLine from "../SVGicons/VerticalLine";
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
     toValue: -200,
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
             <AntDesign name="downcircle" size={24} color="white" />
           </View>
        </TouchableOpacity>

       <View style={styles.curTask}>
              {/* */}
 <ScrollView style={styles.scroll}>
         <Text style={styles.welcomeText}>Active Task</Text>
         <VerticalLine/>

         <Text style={styles.taskText}>{currentTask.text}</Text>

  </ScrollView>

         {/* Custom animated modal */}

         <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
           <View style={styles.modalContent}>

            {/* Close icon */}
                      <TouchableOpacity onPress={() => setCurrentTask({})}>
                        <FontAwesome name="close" style={styles.closeIcon} size={40} />
                      </TouchableOpacity>

     {/* Finished Task button */}
                                            <TouchableOpacity onPress={completeTask}>
                                              <Text>Finished Task</Text>
                                            </TouchableOpacity>
     {/* upcircle, moves modal back up  */}
             <TouchableOpacity onPress={closeModal}>
                 <AntDesign name="upcircle" size={24} color="black" />
             </TouchableOpacity>

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
  //should be positioned above curTask
  exitTaskArrow: {
       //position: "absolute",
      // bottom: 50,
     //  right: 20,
   //  marginBottom: 20,
    alignItems: 'flex-end',
   //position: "absolute",
  // left: 286,
  // top: 96,
  },
 curTask: {
   backgroundColor:  "white", //'#EBEBEB',
   padding: 24,
     //width: "100%",
   //  position: "absolute",
   //  justifyContent: "center",
   height: 400,
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
  // backgroundColor: "red",
 },
 modalContent: {
   width: '100%',
   height: windowHeight / 3,
  backgroundColor: '#F5FCFF',
   padding: 20,
   alignItems: 'center',
 },
  closeIcon: {
    color: 'black',
    marginBottom: 10,
  },
});

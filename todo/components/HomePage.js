import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Pressable,
    Image,
    Button,
    Modal
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ToDoApp from './ToDoApp';
import AddTask from './AddTask';
import TaskSelectionView from './TaskSelectionView';


export default function HomePage({ navigation }) {
    const [currentTask, setCurrentTask] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [completedTasks, setCompletedTasks] = useState(0)

const [taskSelectionVisible, setTaskSelectionVisible] = useState(false)
    console.log(currentTask)
    if (Object.keys(currentTask).length === 0) {
        return (
            <View style={styles.screen}>
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    style={styles.modalView} 
                >
                    <View  >
                        <AddTask setModalVisible={setModalVisible} />
                    </View>

                </Modal>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={taskSelectionVisible}>
                    <TaskSelectionView setCurrentTask={setCurrentTask} setTaskSelectionVisible={setTaskSelectionVisible} />
                </Modal>



{/* completed task view/stats */}



                <Text style={styles.welcomText}>No tasks active.</Text>
                <Pressable style={styles.pressableContainer} onPress={() => setTaskSelectionVisible(true)}>
                    <View >
                        <Text style={styles.buttonText}>Select a task</Text>
                        <Text style={styles.smallText}>start with an easier task to gain motivation.</Text>
                    </View>
                </Pressable>
                <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Image style={{
                        width: 90,
                        height: 90
                    }} source={require('../assets/addButton.png')} />
                </Pressable>
            </View>

        );
    }
    else {
        return (
            <View style={styles.screen}>
                <View style={styles.curTask}>
                    <TouchableOpacity onPress={() => setCurrentTask({})}>
                        <FontAwesome name='close' style={styles.icon} size={40} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.welcomText} onPress={() => {
                            setCurrentTask({})

                        }}> Done </Text>
                    </TouchableOpacity>
                    <Text style={styles.welcomText}> Active task </Text>
                    <Text style={{
                        fontSize: 25,
                        color: 'white'
                    }}> {currentTask.text} </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    curTask: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 14,
        backgroundColor: 'rgb(182, 36, 255)',
        opacity: 1,
        color: 'rgb(240, 240, 240)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderLeft: 1,
        boxShadow: 'rgb(182, 36, 255)',
        padding: 16,
        borderRadius: 28,
        textShadow: 'rgba(240, 240, 240, 0.47)'
    },

    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,

    },
    screen: {
        flex: 1,
       // backgroundColor: "#232138",
        // padding: 10,
        justifyContent: "center",
    },

    smallText: {
        fontStyle: 'italic',
        fontFamily: 'Avenir-Book',
        marginBottom: 20,
        fontSize: 18,
        color: 'white'
    },

    pressableContainer: {
        backgroundColor: "#48249c",
        textAlign: 'center',
        borderRadius: 20,
        marginBottom: 10,
        alignItems: 'center',
    },
    modalView: {
        //margin: 20,
        //borderRadius: 20,
        //padding: 35,
        // alignItems: 'center',
        flex: 1,
        //backgroundColor: 'transparent',
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        justifyContent: 'center',


    },
    welcomText: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 30,
        marginTop: 12,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 50,
        fontWeight: 'bold',
        fontFamily: "Poppins",
        textAlign: "center",
        //color: 'white'
    },
    buttonText: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 26,
        marginTop: 12,
        marginLeft: 8,
        marginBottom: 5,
        fontWeight: 'bold',
        fontFamily: "Poppins",
        textAlign: "center",
        color: 'white'
    }
});
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Pressable,
    Image,
    Button
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Stack from '../App';
import ToDoApp from './ToDoApp';
import HomeScreen from '../App';


export default function HomePage({ navigation }) {
    const [currentTask, setCurrentTask] = useState({});

    console.log(currentTask)
    if (Object.keys(currentTask).length === 0) {
        return (
            <View style={styles.screen}>
                <Text style={styles.welcomText}>No tasks active. Let's get started!</Text>

                <Pressable style={styles.pressableContainer}>
                    <View >
                        <Text style={styles.buttonText}>Select a Minutes task</Text>
                        <Text style={styles.smallText}>start with an easier task to gain motivation.</Text>
                    </View>
                </Pressable>
                <Pressable style={styles.addButton} onPress={() => navigation.navigate ('HomeScreen', { screen: 'AddTask' })}>
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
            <View style={styles.curTask}>
                <Text style={styles.welcomText}>THE ACTIVE TASK WHEE</Text>
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
        backgroundColor: "#232138",
        padding: 10,
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
    welcomText: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 70,
        marginTop: 12,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 50,
        fontWeight: 'bold',
        fontFamily: "Poppins",
        textAlign: "center",
        color: 'white'
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
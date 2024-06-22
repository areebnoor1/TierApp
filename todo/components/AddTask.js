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
    Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import ToDoApp from './ToDoApp';
import {
    ref,
    onValue,
    push,
    update,
    remove
} from 'firebase/database';
import { db } from "./firebase.js"

export default function AddTask() {
    const [taskType, setTaskType] = useState('');
    const [value, setValue] = useState('');

    let addTodo = () => {
        if (taskType == '') {
            Alert.alert('', 'Please specify a task type (Minutes, Hours, Days).', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        } else {
            push(ref(db, '/todos'), {
                text: value, key: Date.now(), checked: false, task_type: taskType
            });
            if (value.length > 0) {
                setValue('');
            }
        }
    };
    return (
        <View style={styles.screen}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
            }}>

                <TouchableOpacity onPress={() => setTaskType('days')}>
                    <Entypo name='calendar' style={styles.icon} size={60} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTaskType('hours')}>
                    <Ionicons name='hourglass-outline' style={styles.icon} size={60} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTaskType('minutes')}>
                    <Entypo name='stopwatch' style={styles.icon} size={60} />
                </TouchableOpacity>

            </View>
            <View >
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder="Enter task"
                    placeholderTextColor="#abbabb"
                    value={value}
                    onChangeText={_value => setValue(_value)}
                />
            </View>

            <TouchableOpacity style={styles.addButton} onPress={() => addTodo()}>
                <Image style={{
                    width: 90,
                    height: 90
                }} source={require('../assets/checkButton.png')} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {

        borderColor: 'purple',
        borderWidth: 2,
        height: 180,
        borderRadius: 28,
        fontSize: 18,
    },
    icon: {
        padding: 10,
        color: 'white',
    },

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
        top: 10,
        right: 10,

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
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Alert,
    Text,
    Pressable
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import Minutes from './Minutes';
import Days from './Days';
import Hours from './Hours';

import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ToDoApp from './ToDoApp';
import {
    ref,
    onValue,
    push,
    update,
    remove,
    orderByChild,
    equalTo,
    query
} from 'firebase/database';
import { db } from "./firebase.js"

import { TodoContext } from './TodoContext';

export default function Jars() {
    const [taskType, setTaskType] = useState('');
    //const [jar, setJar] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [showDate, setShowDate] = useState(false)
    const [showTime, setShowTime] = useState(false)


    const { todos, addTodo, removeTodo, toggleTodoCompleted } = useContext(TodoContext);

    const isToday = (date) => {
        const d = new Date(date)
        const t = new Date();
        const today = new Date(t.setHours(0, 0, 0, 0))
        const comparison = new Date(d.setHours(0, 0, 0, 0))
        return today.getTime() == comparison.getTime()
    };

    function isDateInThisWeek(date) {
        const todayObj = new Date();
        const todayDate = todayObj.getDate();
        const todayDay = todayObj.getDay();
        const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
        return date >= firstDayOfWeek && date <= lastDayOfWeek;
    }

    const getTodosDueThisWeek = () => {
        const newArr = todos.filter(todo => !todo.completed && todo.has_due_date && isDateInThisWeek(new Date(todo.due_date)));
        return newArr.length
    };

    const getCompletedToday = () => {
        return todos.filter(todo => todo.completed === true).length
    }

    const dateExists = (date) => {
        if (Object.keys(date).length === 0) {
            return false
        } else {
            return true
        }
    }

    const getDueToday = () => {
        const newArr = todos.filter(todo => todo.completed === false && todo.has_due_date === true && isToday(todo.due_date) === true)
        const amount = newArr.length
        return amount
    }


    if (Object.keys(taskType).length === 0) {
        return (
            <View style={styles.screen}>
                <View style={styles.topBar}>
                    <Text style={styles.buttonText}>My Tasks</Text>
                </View>
                <TouchableOpacity style={styles.jarHeader} onPress={() => setTaskType('minutes')}>
                    <Entypo name='stopwatch' style={[styles.icon, taskType === 'minutes' && styles.activeText]} size={40} />
                    <Text style={styles.label}>Minutes</Text>
                    <Entypo name='chevron-right' style={styles.icon} size={30} />
                </TouchableOpacity>
                <View style={styles.taskTypeDisplay}>
                    <Text>Interesting facts go here</Text>
                </View>
                <TouchableOpacity style={styles.jarHeader} onPress={() => setTaskType('hours')}>
                    <Ionicons name='hourglass-outline' style={[styles.icon, taskType === 'hours' && styles.activeText]} size={40} />
                    <Text style={styles.label} >Hours</Text>
                    <Entypo name='chevron-right' style={styles.icon} size={30} />
                </TouchableOpacity>
                <View style={styles.taskTypeDisplay}>
                    <View style={styles.taskNumberContainers}>
                        <View style={styles.taskNumberContainer}>
                            <View style={styles.dayEllipse}>
                                <Text style={styles.taskNumber}>{todos.filter(todo => todo.task_type === 'hours').length}</Text>
                            </View>
                            <Text style={styles.taskText}>Tasks in jar</Text>
                        </View>
                        <View style={styles.taskNumberContainer}>
                            <View style={styles.dayEllipse}>
                                <Text style={styles.taskNumber}>{todos.filter(todo => todo.task_type === 'hours').length}</Text>
                            </View>
                            <Text style={styles.taskText}>Tasks due today</Text>
                        </View>
                        <View style={styles.taskNumberContainer}>
                            <View style={styles.dayEllipse}>
                                <Text style={styles.taskNumber}>{todos.filter(todo => todo.task_type === 'hours').length}</Text>
                            </View>
                            <Text style={styles.taskText}>Tasks due this week</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.jarHeader} onPress={() => setTaskType('days')}>
                    <Entypo name='calendar' style={[styles.icon, taskType === 'days' && styles.activeText]} size={40} />
                    <Text style={styles.label}>Days</Text>
                    <Entypo name='chevron-right' style={styles.icon} size={30} />
                </TouchableOpacity>
                <View style={styles.taskTypeDisplay}>
                    <Text>Interesting facts go here</Text>
                </View>
            </View>
        );
    } else if (taskType === 'minutes') {
        return (
            <View>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => setTaskType("")}>
                        <Entypo name='chevron-left' size={30} />
                    </TouchableOpacity>

                    <Text style={styles.buttonText}>Minutes Jar
                    </Text>


                    <Text style={styles.buttonText}></Text>

                </View>
                <Minutes />
            </View>
        );

    } else if (taskType === 'hours') {
        return (
            <View>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => setTaskType("")}>
                        <Entypo name='chevron-left' size={30} />
                    </TouchableOpacity>
                    <Text style={styles.buttonText}>Hours Jar</Text>
                    <Text style={styles.buttonText}></Text>
                </View>
                <Hours />
            </View>
        );
    } else if (taskType === 'days') {
        return (
            <View>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => setTaskType("")}>
                        <Entypo name='chevron-left' size={30} />
                    </TouchableOpacity>

                    <Text style={styles.buttonText}>Days Jar
                    </Text>


                    <Text style={styles.buttonText}></Text>

                </View>
                <Days />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    taskTypeDisplay: {
        backgroundColor: "#b7babd",
        textAlign: 'center',
        borderRadius: 20,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        padding: 20,
        alignItems: 'center',
    },

    label: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    taskNumberContainers: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    jarHeader: {
        flexDirection: 'row',
    },

    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    activeText: {
        color: 'blue',

    },

    textInput: {
        borderColor: 'purple',
        borderWidth: 2,
        //height: 250,
        //width: 200,
        padding: 10,
        borderRadius: 20,
        fontSize: 18,
        margin: 10
    },
    icon: {
        //padding: 10,
        // color: 'white',
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

    remainingTasksContainer: {
        width: "100%",
        padding: 16,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
    },
    header: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    taskNumberContainers: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    taskNumberContainer: {
        alignItems: "center",
        marginRight: 16,
    },
    minuteEllipse: {
        width: 44,
        height: 44,
        backgroundColor: "rgba(255, 38, 246, 0.75)",
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
    },
    hourEllipse: {
        width: 44,
        height: 44,
        backgroundColor: "#9D6AF0",
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
    },
    dayEllipse: {
        width: 44,
        height: 44,
        backgroundColor: "#7DA1FD",
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
    },
    taskNumber: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
    },
    taskText: {
        width: 70,
        textAlign: "center",
        color: "black",
    },
    arrowContainer: {
        marginLeft: "auto",
    },
    finishedText: {
        fontSize: 16,
        textAlign: "center",
        fontStyle: "italic",
        marginTop: 20,
    },

    screen: {
        //flex: 1,
        backgroundColor: "#FFF",
        //padding: 20,
        //justifyContent: "center",
    },

    smallText: {
        fontStyle: 'italic',
        fontFamily: 'Avenir-Book',
        marginBottom: 20,
        fontSize: 18,
        alignItems: 'center',
        //color: 'white'
    },
    pressableContainer: {
        backgroundColor: "#48249c",
        textAlign: 'center',
        borderRadius: 20,
        marginBottom: 10,

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
        //color: 'white'
    },
    buttonText: {
        display: 'flex',
        alignItems: 'center',
        // gap: 6,
        fontSize: 30,
        // marginTop: 12,
        //  marginLeft: 8,
        //   marginBottom: 5,
        fontWeight: 'bold',
        fontFamily: "Poppins",
        textAlign: "center",
        //color: 'white'
    }
});
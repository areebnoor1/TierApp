import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TodoContext } from './TodoContext';
import { format } from "date-fns";
import Ionicons from '@expo/vector-icons/Ionicons';
import StartTask from "./StartTask"; // Import StartTask modal component

export default function TodoList(props) {
  const { todos, toggleTodoCompleted } = useContext(TodoContext);
  const [taskSelectionVisible, setTaskSelectionVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleTaskPress = (task) => {
    setCurrentTask(task);
    setTaskSelectionVisible(true);
  };

  const handleEditTask = (task) => {
    // Handle editing task
    props.editMe(); // Assuming editMe is passed as a prop
  };

  const handleCompleteTask = (taskKey) => {
    toggleTodoCompleted(taskKey);
  };

  return (
    <View style={styles.container}>
      {todos.map((todo, index) => (
        <TouchableOpacity key={index} onPress={() => handleTaskPress(todo)}>
          <View style={styles.listContainer}>
            <Icon
              name={'ellipse-outline'}
              size={30}
              color='black'
              style={styles.icon}
              onPress={() => handleCompleteTask(todo.key)}
            />
            <View style={styles.textContainer}>
              <Text style={styles.listItem}>{todo.text}</Text>
              {"days_made_progress" in todo && (
                <View style={styles.progressContainer}>
                  <Text>Last day made progress: {format(todo.most_recent_day_made_progress, "eeee, MMMM do")}</Text>
                  <Text>Number of progress sessions: {todo.days_made_progress}</Text>
                </View>
              )}
              {todo.has_due_date && (
                <Text style={styles.dateText}>{format(todo.due_date, "eeee, MMMM do")}</Text>
              )}
            </View>
            <Ionicons
              name="ellipsis-horizontal-circle"
              size={30}
              style={styles.moreIcon}
              onPress={() => handleEditTask(todo)}
            />
          </View>
        </TouchableOpacity>
      ))}
      <StartTask
        currentTask={currentTask}
        setTaskSelectionVisible={setTaskSelectionVisible}
        taskSelectionVisible={taskSelectionVisible}
        setCurrentTask={setCurrentTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    marginTop: '3%',
    justifyContent: "flex-start",
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    marginLeft: '2%',
    width: '96%',
    minHeight: 30,
  },
  icon: {
    marginLeft: 8,
    marginTop: 8,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  listItem: {
    paddingHorizontal: 10,
    right: 10,
    marginTop: 12,
    marginBottom: 12,
    marginRight: 70,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  progressContainer: {
    marginTop: 5,
  },
  dateText: {
    borderRadius: 10,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  moreIcon: {
    marginLeft: 'auto',
    marginTop: 8,
    marginRight: 8,
    marginBottom: 8,
  },
});

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
import { Ionicons } from '@expo/vector-icons';
import StartTask from "./StartTask"; // Import StartTask modal component

export default function TodoList(props) {
  const { toggleTodoCompleted } = useContext(TodoContext);
  const [completed, setCompleted] = useState(false);
  const [taskSelectionVisible, setTaskSelectionVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleTaskPress = () => {
    setCurrentTask(props.todo);
    setTaskSelectionVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTaskPress}>
        <View style={styles.listContainer}>
          <Icon
            name={'ellipse-outline'}
            size={30}
            color='black'
            style={styles.icon}
            onPress={() => {
              setCompleted(!completed);
              toggleTodoCompleted(props.the_key);
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.listItem}>{props.text}</Text>
            {"days_made_progress" in props.todo && (
              <View>
                <Text style={styles.listItem}>
                  Last day made progress: {format(props.todo.most_recent_day_made_progress, "eeee, MMMM do")}
                </Text>
                <Text style={styles.listItem}>
                  Number of progress sessions: {props.todo.days_made_progress}
                </Text>
              </View>
            )}
            {props.has_due_date && (
              <Text style={styles.dateText}>{format(props.due_date, "eeee, MMMM do")}</Text>
            )}
          </View>
          <Ionicons
            name="ellipsis-horizontal-circle"
            size={30}
            style={styles.moreIcon}
            onPress={props.editMe}
          />
        </View>
      </TouchableOpacity>
      <StartTask
        currentTask={currentTask}
        taskSelectionVisible={taskSelectionVisible}
        setTaskSelectionVisible={setTaskSelectionVisible}
        setCurrentTask={setCurrentTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
	//paddingBottom: 5,
		paddingHorizontal: 10,
		right: 10,
		marginTop: 12,
		marginBottom: 12,
		marginRight: 70,
		fontSize: 17,
		fontWeight: 'bold',
		color: 'black'
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

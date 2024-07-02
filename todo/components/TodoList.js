
import React, { useState, useEffect, useContext } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TodoContext } from './TodoContext';
import { format } from "date-fns";

export default function TodoList(props) {
	const { todos, addTodo, removeTodo, toggleTodoCompleted } = useContext(TodoContext);

	const [completed, setCompleted] = useState(false)

	const formatDate = (date) => {
		const options = { month: 'long', day: 'numeric' };
		const formattedDate = date.toLocaleDateString('en-US', options);
	}


	return (
		<TouchableOpacity onPress={() => {
			props.editMe()
		}}>
		<View style={styles.listContainer}>
			<Icon
				name={'ellipse-outline'}
				size={25}
				color='black'
				style={{ marginLeft: 15 }}
				onPress={() => {
					setCompleted(!completed)
					toggleTodoCompleted(props.the_key)
				}}
			/>

			
			<View >

				<Text style={styles.listItem}>{props.text}</Text>

				{"days_made_progress" in props.todo &&
					<View>
						<Text> Last day made progress: {format(props.todo.most_recent_day_made_progress, "eeee, MMMM do")} </Text>
						<Text> Number of progress sessions: {props.todo.days_made_progress} </Text>
					</View>
			}

				{props.has_due_date &&
					<Text style={styles.dateText}>{format(props.due_date, "eeee, MMMM do, HH:mm")}</Text>}
			</View>
			{/*<Icon
				name="trash-bin"
				size={25}
				//color="red"
				style={{ marginLeft: 'auto' }}
				marginRight={30}
				onPress={props.deleteTodo}
				/>*/}
		</View>

		</TouchableOpacity>
	)

}

const styles = StyleSheet.create({
	listContainer: {
		marginTop: '5%',
		borderWidth: 2,
		borderRadius: 10,
		flexDirection: 'row',
		width: '100%',
		alignItems: 'stretch',
		minHeight: 40
	},
	listItem: {
		paddingBottom: 10,
		paddingHorizontal: 10,
		right: 10,
		marginTop: 6,
		fontSize: 17,
		fontWeight: 'bold',
		color: 'black'
	},
	dateText: {
		marginBottom: 10,
		fontStyle: 'italic',
	}
})
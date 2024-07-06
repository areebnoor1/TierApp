
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
		<View styles={{
			justifyContent: "flex-end",
			flex: 1,
			padding: 16,
			flexDirection: "row",
			justifyContent: "space-between",
		}}>
			<TouchableOpacity onPress={() => {
				props.editMe()
			}}>

				<View style={[
              styles.listContainer,
              props.todo.importance == 2 && styles.important,
			  props.todo.importance === 3 && styles.veryimportant,
            ]} 
			>


					<Icon
						name={'ellipse-outline'}
						size={30}
						color='black'
						style={{
							marginLeft: 8,
							marginTop: 8,
							marginRight: 8,
							marginBottom: 8,
							//flex: 1,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center'
						
						}}
						onPress={() => {
							setCompleted(!completed)
							toggleTodoCompleted(props.the_key)
						}}
					/>


					<View styles={{
						flex:1,
						//flexDirection: 'row',
					}} >

						<Text style={styles.listItem}>{props.text}</Text>

						{"days_made_progress" in props.todo &&
							<View style={styles.listItem}>
								<Text> Last day made progress: {format(props.todo.most_recent_day_made_progress, "eeee, MMMM do")} </Text>
								<Text> Number of progress sessions: {props.todo.days_made_progress} </Text>
							</View>
						}

						{props.has_due_date &&
							<Text style={styles.dateText}>{format(props.due_date, "eeee, MMMM do")}</Text>}
					</View>
					{<Icon
				name="close-circle-outline"
				size={30}
				style={{ marginLeft: 'auto',
				//marginLeft: 8,
				marginTop: 8,
				marginRight: 8,
				marginBottom: 8,
			
			}}
				marginRight={8}
				onPress={props.deleteTodo}
				/>}
				</View>

			</TouchableOpacity>
		</View>
	)

}

const styles = StyleSheet.create({
	veryimportant:{
		borderWidth: 6
	},
	important:{
		borderWidth: 4
	},
	listContainer: {
		marginTop: '3%',
		//margin
		justifyContent: "flex-start",
		borderWidth: 2,
		borderRadius: 10,
		//padding: 16,
		//display: 'flex',
		//justifyContent: 'center',
		flexDirection: 'row',
		marginLeft: '2%',
		width: '96%',
		//alignItems: 'center',
		minHeight: 30
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
	}
})
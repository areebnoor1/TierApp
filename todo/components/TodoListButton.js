
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

export default function TodoListButton(props) {
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
			
				<View style={styles.listContainer}>


				

					<View styles={{
						flex:1,
						//flexDirection: 'row',
					}} >

						<Text style={styles.listItem}>{props.text}</Text>

						

						{props.has_due_date &&
							<Text style={styles.dateText}>{format(props.due_date, "eeee, MMMM do")}</Text>}
					</View>
					
				</View>

			
		</View>
	)

}

const styles = StyleSheet.create({
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
		marginRight: 30,
		marginLeft: 20,
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
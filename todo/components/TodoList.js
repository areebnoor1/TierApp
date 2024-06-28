
import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from "date-fns";

export default function TodoList(props) {
	return (
		<View style={styles.listContainer}>
			<Icon
				name={props.completed ? 'check' : 'square'}
				size={25}
				color='black'
				style={{ marginLeft: 15 }}
				onPress={props.setChecked}
			/>
			<Icon
				name={'edit'}
				size={25}
				color='black'
				style={{ marginLeft: 15 }}
				onPress={props.editMe}
			/>
			<View style={{



			}}>
				<Text style={styles.listItem}>{props.text}</Text>
				{Object.keys(props.due_date).length !== 0 &&
					<Text style={styles.dateText}>{format(props.due_date, "eeee, MMMM do, HH:mm")}</Text>
				}
			</View>
			<Icon
				name="trash-2"
				size={25}
				//color="red"
				style={{ marginLeft: 'auto' }}
				marginRight={30}
				onPress={props.deleteTodo}
			/>


		</View>
	)

}

const styles = StyleSheet.create({
	listContainer: {
		marginTop: '5%',
		flexDirection: 'row',
		width: '100%',
		alignItems: 'stretch',
		minHeight: 40
	},
	listItem: {
		paddingBottom: 10,
		paddingLeft: 10,
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
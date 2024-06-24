
import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function TodoListButton(props) {
	return (
		<View style={styles.pressableContainer}>
			<Text style={styles.listItem}>{props.text}</Text>
		</View>
	)

}

const styles = StyleSheet.create({
	pressableContainer: {
		backgroundColor: "#808080",
		textAlign: 'center',
		borderRadius: 20,
		alignItems: 'center',
		marginTop: '5%',
		flexDirection: 'row',
		width: '100%',
		alignItems: 'stretch',
		minHeight: 40
	},
	listItem: {
		paddingBottom: 20,
		paddingLeft: 10,
		marginTop: 6,
		fontSize: 17,
		fontWeight: 'bold',
		color: 'black'
	}
})
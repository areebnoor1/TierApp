
import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput, 
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function TodoList(props){
  return(
    <View style = {styles.listContainer}>
      <Icon
        name={props.checked? 'check':'square'}
        size={30}
        color='black'
        style={{marginLeft:15}}
        onPress={props.setChecked}
      />
      <Text style={styles.listItem}>{props.text}</Text>
      <Icon
				name="trash-2"
				size={30}
				color="red"
				style={{ marginLeft: 'auto' }}
				onPress={props.deleteTodo}
			/>
    </View>
  )

}

const styles = StyleSheet.create({
  	listContainer: {
		marginTop: '5%',
		flexDirection: 'row',
		borderColor: '#aaaaaa',
		borderBottomWidth: 1.5,
		width: '100%',
		alignItems: 'stretch',
		minHeight: 40
	},
	listItem: {
		paddingBottom: 20,
		paddingLeft: 10,
		marginTop: 6,
		borderColor: 'green',
		borderBottomWidth: 1,
		fontSize: 17,
		fontWeight: 'bold',
		color: 'black'
	}
})
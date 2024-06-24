
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
        size={25}
        color='black'
        style={{marginLeft:15}}
        onPress={props.setChecked}
      />
	  <Icon
        name={'edit'}
        size={25}
        color='black'
        style={{marginLeft:15}}
        onPress={props.setChecked}
      />
      <Text style={styles.listItem}>{props.text}</Text>
	  <Text>{props.due_date}</Text>
      <Icon
				name="trash-2"
				size={25}
				//color="red"
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
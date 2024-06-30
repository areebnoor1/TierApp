import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { updateTodo } from '../TodosService';
import { useNavigation } from "@react-navigation/native";

export default function CurrentTask({
  taskSelectionVisible,
  setTaskSelectionVisible,
  currentTask,
  setCurrentTask,
  taskType,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <View style={styles.curTask}>
        <TouchableOpacity onPress={() => setCurrentTask({})}>
          <FontAwesome name='close' style={styles.icon} size={40} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.welcomText}
            onPress={async () => {
              currentTask.completed = true;
              currentTask.completion_date = Date.now();
              await updateTodo(currentTask.key, currentTask);
              setCurrentTask({});
              navigation.navigate("Activity"); // Navigate back to the Activity component
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
        <Text style={styles.welcomText}>Active task</Text>
        <Text style={{ fontSize: 25, color: 'white' }}>{currentTask.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  closeButton: {
    alignItems: "center",
  },
  topBarText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  placeholder: {
    width: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  listContainer: {
    flex: 1,
  },
});

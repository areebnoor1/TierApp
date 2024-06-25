import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function CurrentTask({ currentTask, setCurrentTask }) {
  return (
    <View style={styles.curTask}>
      <TouchableOpacity onPress={() => setCurrentTask({})}>
        <FontAwesome name="close" style={styles.icon} size={40} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.welcomText} onPress={() => setCurrentTask({})}>
          {" "}
          Done{" "}
        </Text>
      </TouchableOpacity>
      <Text style={styles.welcomText}> Active task </Text>
      <Text style={{ fontSize: 25, color: "white" }}> {currentTask.text} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  curTask: {
    display: "flex",
    alignItems: "center",
    marginTop: 14,
    backgroundColor: "rgb(182, 36, 255)",
    opacity: 1,
    color: "rgb(240, 240, 240)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderLeft: 1,
    boxShadow: "rgb(182, 36, 255)",
    padding: 16,
    borderRadius: 28,
    textShadow: "rgba(240, 240, 240, 0.47)",
  },
  welcomText: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 30,
    marginTop: 12,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
    //color: 'white'
  },
});

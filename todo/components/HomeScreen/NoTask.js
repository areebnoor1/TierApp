import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";

export default function NoTask({ setTaskSelectionVisible, setModalVisible }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.welcomText}>No tasks active.</Text>
      <Pressable
        style={styles.pressableContainer}
        onPress={() => setTaskSelectionVisible(true)}
      >
        <View>
          <Text style={styles.buttonText}>Select a task</Text>
          <Text style={styles.smallText}>
            start with an easier task to gain motivation.
          </Text>
        </View>
      </Pressable>
      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Image
          style={{ width: 90, height: 90 }}
          source={require("../../assets/addButton.png")}
        />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  screen: {
    flex: 1,
    // backgroundColor: "#232138",
    // padding: 10,
    justifyContent: "center",
  },

  smallText: {
    fontStyle: "italic",
    fontFamily: "Avenir-Book",
    marginBottom: 20,
    fontSize: 18,
    color: "white",
  },

  pressableContainer: {
    backgroundColor: "#48249c",
    textAlign: "center",
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
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
  buttonText: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 26,
    marginTop: 12,
    marginLeft: 8,
    marginBottom: 5,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
    color: "white",
  },
});

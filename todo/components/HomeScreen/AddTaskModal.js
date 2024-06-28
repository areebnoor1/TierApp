import React from "react";
import { StyleSheet, View, Modal } from "react-native";
import AddTask from "../AddTask.js";

export default function AddTaskModal({ modalVisible, setModalVisible, todos, setTodos }) {
  return (
    <Modal transparent={true} visible={modalVisible} style={styles.modalView}>
      <View>
        <AddTask setModalVisible={setModalVisible} 
         todos = {todos}
         setTodos = {setTodos}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    //margin: 20,
    //borderRadius: 20,
    //padding: 35,
    // alignItems: 'center',
    flex: 1,
    //backgroundColor: 'transparent',
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
});

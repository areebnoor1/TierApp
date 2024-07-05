import React from "react";
import { StyleSheet, View, Modal } from "react-native";
import EditTask from "./EditTask";

export default function EditTaskModal({ modalVisible, setModalVisible, task }) {
  return (
    <Modal transparent={true} animationType="slide" visible={modalVisible}>
      <View style={styles.modalView}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <EditTask setModalVisible={setModalVisible} task={task} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});

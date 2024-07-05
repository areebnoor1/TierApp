import React from "react";
import { StyleSheet, View, Modal } from "react-native";
import EditTask from "./EditTask";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function EditTaskModal({
  modalVisible,
  setModalVisible,
  task,
}) {
  return (
    <>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        style={styles.modalView}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <EditTask
              setModalVisible={setModalVisible}
              task={task}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalView: {
    //margin: 20,
    //borderRadius: 20,
    //padding: 35,
    // alignItems: 'center',
    //height: "100%",
    flex: 1,
    //backgroundColor: 'transparent',
    //backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    //  backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    //backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "99%",
    height: "99%",
    elevation: 1,
    //  backgroundColor: "#EBEBEB",
    borderRadius: 20,
    backgroundColor: "white",
    //      padding: 20,
  },
});

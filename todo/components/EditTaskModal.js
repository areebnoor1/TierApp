import React from "react";
import { StyleSheet, View, Modal } from "react-native";
import EditTask from "./EditTask.js";

export default function EditTaskModal({ modalVisible, setModalVisible, task}) {


  return (
  <>
    <Modal transparent={true}  animationType="slide" visible={modalVisible} style={styles.modalView}>

          <View style={styles.modalContainer}>
                              <View style={styles.modalContent}>
                              <EditTask setModalVisible={setModalVisible} task = {task} />
                              </View>
                            </View>
    </Modal>
{/*
            <Modal visible={true} animationType="slide" transparent={true}>
                      <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                        </View>
                      </View>
                    </Modal>

*/}
    </>
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
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "95%",
      height: "95%",
      backgroundColor: "#EBEBEB",
      borderRadius: 10,
//      padding: 20,
    },
});

import React from "react";
import { Modal } from "react-native";
import TaskSelectionView from "../TaskSelectionView";

export default function TaskSelectionModal({
  taskSelectionVisible,
  setTaskSelectionVisible,
  setCurrentTask,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={taskSelectionVisible}
    >
      <TaskSelectionView
        setCurrentTask={setCurrentTask}
        setTaskSelectionVisible={setTaskSelectionVisible}
      />
    </Modal>
  );
}

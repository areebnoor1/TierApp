import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";

export default function GoalModal({ visible, onClose, onSave, initialMode }) {
  const [minutesGoal, setMinutesGoal] = useState('');
  const [hoursGoal, setHoursGoal] = useState('');
  const [daysGoal, setDaysGoal] = useState('');

  const handleSave = () => {
    onSave({ minutesGoal, hoursGoal, daysGoal });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{initialMode === 'set' ? 'Set Daily Goal' : 'Edit Daily Goal'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Minutes Goal"
            keyboardType="numeric"
            value={minutesGoal}
            onChangeText={setMinutesGoal}
          />
          <TextInput
            style={styles.input}
            placeholder="Hours Goal"
            keyboardType="numeric"
            value={hoursGoal}
            onChangeText={setHoursGoal}
          />
          <TextInput
            style={styles.input}
            placeholder="Days Goal"
            keyboardType="numeric"
            value={daysGoal}
            onChangeText={setDaysGoal}
          />
          <Button title="Confirm" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: '80%',
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  cancelButton: {
    alignSelf: "flex-start",
  },
  cancelText: {
    color: "red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

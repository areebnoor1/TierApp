import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { GoalContext } from "../DailyGoalContext";
import { AntDesign } from "@expo/vector-icons";

export default function GoalModal({
  visible,
  onClose,
  onSave,
  initialMode,
  initialGoals,
}) {
  const [minutesGoal, setMinutesGoal] = useState("3");
  const [hoursGoal, setHoursGoal] = useState("1");
  const [daysGoal, setDaysGoal] = useState("1");

  //const { goal, updateGoal } = useContext(GoalContext);

  useEffect(() => {
    if (initialMode === "edit" && initialGoals) {
      setMinutesGoal(initialGoals.minutesGoal);
      setHoursGoal(initialGoals.hoursGoal);
      setDaysGoal(initialGoals.daysGoal);
    } else if (initialMode === "set") {
      setMinutesGoal("3");
      setHoursGoal("1");
      setDaysGoal("1");
    }
  }, [initialMode, initialGoals]);

  const handleSave = () => {
    onSave({ minutes: minutesGoal, hours: hoursGoal, days: daysGoal });
    onClose();
  };

  const incrementGoal = (goal, setGoal) => {
    setGoal((prevGoal) => (parseInt(prevGoal) + 1).toString());
  };

  const decrementGoal = (goal, setGoal) => {
    if (parseInt(goal) > 0) {
      setGoal((prevGoal) => (parseInt(prevGoal) - 1).toString());
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {initialMode === "set" ? "Set Daily Goal" : "Edit Daily Goal"}
          </Text>
          <Text style={styles.goalTitle}>Tasks/Day</Text>

          <View style={styles.taskGoalContainer}>
            <Text style={styles.taskText}>Minutes Tasks/Day</Text>
            <View style={styles.taskCountContainer}>
              <TouchableOpacity
                onPress={() => decrementGoal(minutesGoal, setMinutesGoal)}
                disabled={parseInt(minutesGoal) === 0}
              >
                <AntDesign
                  name="minuscircle"
                  size={44}
                  color={parseInt(minutesGoal) === 0 ? "#ccc" : "black"}
                />
              </TouchableOpacity>
              <Text style={styles.input}>{minutesGoal}</Text>
              <TouchableOpacity
                onPress={() => incrementGoal(minutesGoal, setMinutesGoal)}
              >
                <AntDesign name="pluscircle" size={44} color="black" />
              </TouchableOpacity>
            </View>

            <Text style={styles.taskText}>Hours Tasks/Day</Text>
            <View style={styles.taskCountContainer}>
              <TouchableOpacity
                onPress={() => decrementGoal(hoursGoal, setHoursGoal)}
                disabled={parseInt(hoursGoal) === 0}
              >
                <AntDesign
                  name="minuscircle"
                  size={44}
                  color={parseInt(hoursGoal) === 0 ? "#ccc" : "black"}
                />
              </TouchableOpacity>
              <Text style={styles.input}>{hoursGoal}</Text>
              <TouchableOpacity
                onPress={() => incrementGoal(hoursGoal, setHoursGoal)}
                disabled={parseInt(hoursGoal) === 24}
              >
                <AntDesign
                  name="pluscircle"
                  size={44}
                  color={parseInt(hoursGoal) === 24 ? "#ccc" : "black"}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.taskText}>Days Tasks/Day</Text>
            <View style={styles.taskCountContainer}>
              <TouchableOpacity
                onPress={() => decrementGoal(daysGoal, setDaysGoal)}
                disabled={parseInt(daysGoal) === 0}
              >
                <AntDesign
                  name="minuscircle"
                  size={44}
                  color={parseInt(daysGoal) === 0 ? "#ccc" : "black"}
                />
              </TouchableOpacity>
              <Text style={styles.input}>{daysGoal}</Text>
              <TouchableOpacity
                onPress={() => incrementGoal(daysGoal, setDaysGoal)}
                disabled={parseInt(daysGoal) === 24}
              >
                <AntDesign
                  name="pluscircle"
                  size={44}
                  color={parseInt(daysGoal) === 24 ? "#ccc" : "black"}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleSave} style={styles.button}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    padding: 20,
    alignItems: "center",
  },
  cancelButton: {
    alignSelf: "flex-start",
  },
  cancelText: {
    color: "black",
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
  },
  goalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  taskText: {
    fontSize: 20,
    marginBottom: 10,
  },
  taskGoalContainer: {
    alignItems: "center",
  },
  taskCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
    width: "90%",
  },
  input: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "white",
    padding: 10,
    textAlign: "center",
    width: 100,
    fontSize: 24,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 16,
    backgroundColor: "black",
    marginTop: 40,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
       <View style={styles.modalContent2}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.goalTitle}>
            {initialMode === "set" ? "Set Daily Goal" : "Edit Daily Goal"}
          </Text>

           <Text style={styles.subheader}>
                  How many tasks in each jar you'll aim to complete each day
                    </Text>
          <View style={styles.taskGoalContainer}>
            {renderGoalInput(
              "Minutes Tasks/Day",
              minutesGoal,
              setMinutesGoal,
              incrementGoal,
              decrementGoal
            )}
            {renderGoalInput(
              "Hours Tasks/Day",
              hoursGoal,
              setHoursGoal,
              incrementGoal,
              decrementGoal
            )}
            {renderGoalInput(
              "Days Tasks/Day",
              daysGoal,
              setDaysGoal,
              incrementGoal,
              decrementGoal
            )}
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

const renderGoalInput = (label, goal, setGoal, incrementGoal, decrementGoal) => (
  <View style={styles.taskContainer}>
    <Text style={styles.taskText}>{label}</Text>
    <View style={styles.taskCountContainer}>
      <TouchableOpacity
        onPress={() => decrementGoal(goal, setGoal)}
        disabled={parseInt(goal) === 0}
      >
        <AntDesign
          name="minuscircle"
          size={36}
          color={parseInt(goal) === 0 ? "#ccc" : "black"}
        />
      </TouchableOpacity>
      <Text style={styles.input}>{goal}</Text>
      <TouchableOpacity onPress={() => incrementGoal(goal, setGoal)}>
        <AntDesign name="pluscircle" size={36} color="black" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",

  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  cancelButton: {
    alignSelf: "flex-start",
  },
  goalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subheader: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#D1D1D1",
  },
  taskGoalContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    //    borderTopWidth: 1,
    //    borderBottomWidth: 1,
        borderColor: "#f4f4f4",
        paddingVertical: 15,
        padding: 10,
  },
  taskContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  taskText: {
    fontSize: 18,
    marginBottom: 10,
  },
  taskCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  input: {
 //   borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    textAlign: "center",
    width: 60,
    width: "40%",
    fontSize: 20,
    marginHorizontal: 10,
   backgroundColor: "#F6F6F6",
 // backgroundColor: "black",
 // color: "white",
  },
    inputMinutes: {
      borderWidth: 1,
      borderRadius: 12,
      padding: 10,
      textAlign: "center",
      width: 60,
      width: "40%",
      fontSize: 20,
      marginHorizontal: 10,
     backgroundColor: "#FF5CF8",
    },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 16,
    //backgroundColor: "black",
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
   // color: "white",
   color: "black",
  },

  modalContainer: {
       flex: 1,
       justifyContent: "flex-end",
       alignItems: "center",
     //  backgroundColor: "rgba(0, 0, 0, 0.5)",
     },
     modalContent: {
//flex: 1,
       width: "95%",
     //  height: "95%",
       backgroundColor: "#EBEBEB",
       borderRadius: 0,
       padding: 20,
       alignItems: "center",

           width: "100%",
           height: "80%",

           borderRadius: 20,
           backgroundColor: "white",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

     },
          modalContent2: {

            width: "95%",
            height: "95%",
            backgroundColor: "#EBEBEB",
            borderRadius: 10,
           //padding: 20,
            alignItems: "center",

                width: "99%",
                height: "99%",
                elevation: 5,
                borderRadius: 20,
                backgroundColor: "white",
                backgroundColor: "#F6F6F6",
          },
/*
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
           borderTopWidth: 1,
           borderBottomWidth: 1,
           borderColor: "#f4f4f4",
           padding: 10,
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
       backgroundColor: "#F6F6F6",
       padding: 10,
       textAlign: "center",
       width: 100,
       fontSize: 24,
     },
 /*
     button: {
       alignItems: "center",
       justifyContent: "center",
       paddingVertical: 12,
       paddingHorizontal: 100,
       borderRadius: 16,
       backgroundColor: "black",
       marginTop: 40,
     }
 */
     buttonText: {
       fontSize: 16,
       fontWeight: "bold",
       color: "white",
     },

});

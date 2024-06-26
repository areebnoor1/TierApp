import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Image, Modal } from "react-native";
import JarIcon from "../../components/SVGicons/JarIcon";
import TaskSelectionModal from "./TaskSelectionModal";

export default function NoTask({ setModalVisible, setCurrentTask }) {
  const [jarModalVisible, setJarModalVisible] = useState(false);
  const [taskSelectionVisible, setTaskSelectionVisible] = useState(false);
  const [selectedJar, setSelectedJar] = useState(null);

  const openJarModal = (jar) => {
    setSelectedJar(jar);
    setJarModalVisible(true);
  };

  const closeModal = () => {
    setJarModalVisible(false);
    setSelectedJar(null); // Reset selectedJar when modal is closed
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.welcomeText}>No tasks active.</Text>

      <View style={styles.jarsContainer}>
        {/* Container for Minutes */}
        <View style={styles.jarContainer}>
          <View style={styles.iconTextContainer}>
            <Pressable
              onPress={() => {openJarModal("minutes")
              setSelectedJar('minutes');
    setJarModalVisible(true);}
            }
              style={({ pressed }) => [
                { opacity: pressed || selectedJar === "minutes" ? 0.6 : 1 },
              ]}
            >
              <JarIcon
                style={styles.jarIcon}
                isActive={selectedJar === "minutes"}
              />
            </Pressable>
            <Text style={styles.jarText}>Minutes</Text>
          </View>
        </View>

        {/* Container for Hours */}
        <View style={styles.jarContainer}>
          <View style={styles.iconTextContainer}>
            <Pressable
              onPress={() => openJarModal("hours")}
              style={({ pressed }) => [
                { opacity: pressed || selectedJar === "hours" ? 0.6 : 1 },
              ]}
            >
              <JarIcon
                style={styles.jarIcon}
                isActive={selectedJar === "hours"}
              />
            </Pressable>
            <Text style={styles.jarText}>Hours</Text>
          </View>
        </View>

        {/* Container for Days */}
        <View style={styles.jarContainer}>
          <View style={styles.iconTextContainer}>
            <Pressable
              onPress={() => openJarModal("days")}
              style={({ pressed }) => [
                { opacity: pressed || selectedJar === "days" ? 0.6 : 1 },
              ]}
            >
              <JarIcon
                style={styles.jarIcon}
                isActive={selectedJar === "days"}
              />
            </Pressable>
            <Text style={styles.jarText}>Days</Text>
          </View>
        </View>
      </View>

      {/* Jar Selection Modal */}
      <Modal
        transparent={true}
        visible={jarModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            {/* Close Modal Button */}
            <Pressable style={styles.pressableContainer} onPress={closeModal}>
              <Text style={styles.buttonText}>X</Text>
            </Pressable>

            {/* Display selected jar */}
            <Text style={styles.selectedJarText}>
              Selected Jar: {selectedJar}
            </Text>

            {/* Choose Random Task Button */}
            <Pressable
              style={styles.pressableContainer}
              onPress={() => {
              //  closeModal();
                setTaskSelectionVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Choose random task</Text>
            </Pressable>

            {/* Choose Task Button */}
            <Pressable
              style={styles.pressableContainer}
              onPress={() => {
               // closeModal();
                setTaskSelectionVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Choose task</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Task Selection Modal */}
      <TaskSelectionModal
        taskSelectionVisible={taskSelectionVisible}
        setTaskSelectionVisible={setTaskSelectionVisible}
        taskType={selectedJar}
        setCurrentTask={setCurrentTask}
      />

      {/* Add Button */}
      <Pressable
        style={styles.addTaskButton}
        onPress={() => setModalVisible(true)}
      >
        <Image
          style={{ width: 90, height: 90 }}
          source={require("../../assets/addButton.png")}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#48249c",
    textAlign: "center",
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
    padding: 10,
  },
  addTaskButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pressableContainer: {
    backgroundColor: "#48249c",
    textAlign: "center",
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
    padding: 10,
  },
  welcomeText: {
    fontSize: 30,
    // fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "white",
    marginBottom: 5,
  },
  modalContainer: {
    padding: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",

    borderRadius: 10,
  },

  modalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  jarsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
  jarContainer: {
    alignItems: "center",
  },
  iconTextContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  jarIcon: {
    width: 145,
    height: 167,
  },
  jarText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    position: "absolute",
  },
  selectedJarText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#48249c",
    marginBottom: 20,
  },
});

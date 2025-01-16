/** @format */

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Home = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    console.log("Recording started");
    // Legg til logikk for å starte videoopptak
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    console.log("Recording stopped");
    // Legg til logikk for å stoppe videoopptak og lagre/send video til server
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.recordButtonContainer}>
        <TouchableOpacity
          onPressIn={handleStartRecording}
          onPressOut={handleStopRecording}
          style={[
            styles.recordButton,
            isRecording && styles.recordButtonActive,
          ]}
        >
          {isRecording && <View style={styles.innerButton} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  recordButtonContainer: {
    width: "100%",
    alignItems: "center",
  },
  recordButton: {
    width: 80,
    height: 80,
    backgroundColor: "#6200ee",
    borderRadius: 40, // Gjør knappen rund
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Skyggeeffekt for Android
  },
  recordButtonActive: {
    backgroundColor: "red",
  },
  innerButton: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
  },
});

export default Home;

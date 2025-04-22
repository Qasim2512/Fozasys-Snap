/** @format */

import styles from "./RecordingButton.style.js";
import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";

const Button = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    console.log("Recording started");
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    console.log("Recording stopped");
  };
  return (
    <View style={styles.container}>
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

export default Button;

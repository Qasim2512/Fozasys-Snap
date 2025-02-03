/** @format */

import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import RecordingButton from "../../Components/Button/RecordingButton";
import styles from "./Home.style";

const Home = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{message}</Text>
      <RecordingButton />
    </View>
  );
};

export default Home;

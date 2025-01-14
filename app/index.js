/** @format */

import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [message, setmMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setmMessage(data.message));
  }, []);
  return (
    <View>
      <Text>{message}</Text>
    </View>
  );
};

export default Home;

/** @format */

import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

const Home = () => {
  const handleVideoCapture = () => {
    console.log("Video capture initiated");
    
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 20, fontSize: 20 }}>Home</Text>
      <Button 
        icon="camera" 
        mode="contained" 
        onPress={handleVideoCapture}
      >
        Start Video Capture
      </Button>
    </View>
  );
};

export default Home;
/** @format */

import {
  Camera,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { Video, ResizeMode } from "expo-av"; // for preview
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NewFile() {
  const cameraRef = useRef(null);

  const [facing, setFacing] = useState("back");
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();

  // Wait for permissions to load
  if (!cameraPermission || !micPermission) {
    // Permissions are still loading or undefined
    return <View />;
  }
  // If camera permission not granted, prompt the user
  if (!cameraPermission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>We need your permission to use the camera</Text>
        <Button
          title="Grant Camera Permission"
          onPress={requestCameraPermission}
        />
      </View>
    );
  }
  // If microphone permission not granted, prompt the user
  if (!micPermission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          We need your permission to use the microphone for video recording
        </Text>
        <Button
          title="Grant Microphone Permission"
          onPress={requestMicPermission}
        />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function handleRecord() {
    if (isRecording) {
      // Stop the video recording
      cameraRef.current.stopRecording();
      // The promise from recordAsync will resolve after this
    } else {
      // Start video recording
      setIsRecording(true);
      try {
        const video = await cameraRef.current.recordAsync();
        // recordAsync resolves when stopRecording() is called
        setVideoUri(video.uri);
      } catch (e) {
        console.error("Recording error:", e);
      } finally {
        setIsRecording(false);
      }
    }
  }

  async function uploadToCloudinary() {
    if (!videoUri) return;
    const data = new FormData();
    data.append("file", {
      uri: videoUri,
      type: "video/mp4",
      name: "video.mp4",
    });
    data.append("upload_preset", "YOUR_UNSIGNED_UPLOAD_PRESET"); // create this in Cloudinary
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/video/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      console.log("Cloudinary response:", result);
      alert("Upload successful! Video URL: " + result.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload error: " + err.message);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        facing={facing}
        mode="video"
        style={styles.camera}
      >
        <View>
          <Button
            onPress={toggleCameraFacing}
            style={styles.message}
            title="Flip Camera"
          />
        </View>
      </CameraView>

      <Button
        onPress={handleRecord}
        title={isRecording ? "Stop video" : "Start Video"}
        color="#841584"
      />

      {videoUri && (
        <View style={{ flex: 1 }}>
          <Video
            source={{ uri: videoUri }}
            style={{ width: "100%", height: 300 }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onError={(e) => console.error(e)}
          />
          <Button title="Upload to Cloudinary" onPress={uploadToCloudinary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#3498db",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

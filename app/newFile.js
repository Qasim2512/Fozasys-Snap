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
import axios from "axios";
import * as FileSystem from "expo-file-system";

export default function NewFile() {
  const cameraRef = useRef(null);

  const [facing, setFacing] = useState("back");
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoForCloud, setVideoForCloud] = useState(null); //For sending video taken to cloud and get secure_url

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

        console.log("Video URI:", video.uri);

        convertVideoToBase64(video.uri);
      } catch (e) {
        console.error("Recording error:", e);
      } finally {
        setIsRecording(false);
      }
    }
  }

  const convertVideoToBase64 = async (videoUri) => {
    try {
      // Remove 'file://' prefix if present
      const path = videoUri.startsWith("file://")
        ? videoUri.replace("file://", "")
        : videoUri;

      const base64String = await FileSystem.readAsStringAsync(path, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log("Base64 String:", base64String);

      const cloudinaryDataUrl = `data:video/webm;base64,${base64String}`;

      setVideoForCloud(cloudinaryDataUrl);
      return base64String;
    } catch (error) {
      console.error("Error converting video to base64:", error);
    }
  };

  const uploadVideoToCloudinary = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", videoForCloud);
    data.append("upload_preset", "video_preset");

    try {
      let cloudName = "dand5cke0";
      let resourceType = "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const url = res.data.secure_url;
      setVideoUri(null) // Reset videoUri after upload
      setLoading(false);
      return url;
    } catch (error) {
      console.error(error);
    }
  };

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

      {loading && <Text style={styles.message}>Uploading...</Text>}

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
          <Button
            title="Upload to Cloudinary"
            onPress={uploadVideoToCloudinary}
          />
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

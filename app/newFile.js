/** @format */

import {
  Camera,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { Video, ResizeMode } from "expo-av"; // for preview
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
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

      const cloudinaryDataUrl = `data:video/webm;base64,${base64String}`;

      setVideoForCloud(cloudinaryDataUrl);
      return base64String;
    } catch (error) {
      console.error("Error converting video to base64:", error);
    }
  };

  const uploadVideoToCloudinary = async () => {
    const data = new FormData();
    data.append("file", videoForCloud);
    data.append("upload_preset", "video_preset");

    try {
      let cloudName = "dand5cke0";
      let resourceType = "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const url = res.data.secure_url;
      return url;
    } catch (error) {
      console.error(error);
    }
  };

  const Post = async () => {
    setLoading(true);
    const cloudSecureUrl = await uploadVideoToCloudinary();
    console.log("Cloudinary URL:", cloudSecureUrl);

    const baseUrl =
      Platform.OS === "web"
        ? `http://localhost:3000/video`
        : `http://172.20.10.3:3000/video`;

    const formData = new FormData();
    formData.append("file", cloudSecureUrl);

    formData.append("name", "video");
    formData.append("description", "description");

    axios
      .post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Video uploaded successfully:", response.data);
        setVideoUri(null);
      })
      .catch((error) => {
        console.log("Error uploading video:", error);
        console.error(error);
      });

    setLoading(false);
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
          <Button title="Upload to Cloudinary" onPress={Post} />
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

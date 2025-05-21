/** @format */

import {
  Camera,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { Video, ResizeMode } from "expo-av";
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";
import axios from "axios";
import * as FileSystem from "expo-file-system";

export default function videoApp() {
  const cameraRef = useRef(null);

  const [facing, setFacing] = useState("back");
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoForCloud, setVideoForCloud] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();

  if (!cameraPermission || !micPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View>
        <Text>We need your permission to use the camera</Text>
        <Button
          title="Grant Camera Permission"
          onPress={requestCameraPermission}
        />
      </View>
    );
  }

  if (!micPermission.granted) {
    return (
      <View>
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
      cameraRef.current.stopRecording();
    } else {
      setIsRecording(true);
      try {
        const video = await cameraRef.current.recordAsync();
        console.log("Video URI:", video.uri);
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
      const path = videoUri.replace("file://", "");
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
      return res.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
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
    formData.append("name", name);
    formData.append("description", description);

    try {
      const response = await axios.post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Video uploaded successfully:", response.data);
      setVideoUri(null);
    } catch (error) {
      console.error("Error uploading video:", error);
    }

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CameraView
        ref={cameraRef}
        facing={facing}
        mode="video"
        style={styles.camera}
      >
        <TouchableOpacity
          style={styles.captureButton}
          onPress={toggleCameraFacing}
        >
          <Text style={styles.buttonText}>🔁 Flip</Text>
        </TouchableOpacity>
      </CameraView>

      <TouchableOpacity
        style={[styles.captureButton, { backgroundColor: "#841584" }]}
        onPress={handleRecord}
      >
        <Text style={styles.buttonText}>
          {isRecording ? "⏹ Stop Video" : "🎥 Start Video"}
        </Text>
      </TouchableOpacity>

      {loading && <Text style={styles.message}>⏳ Uploading...</Text>}

      {videoUri && (
        <View style={styles.videoContainer}>
          <TextInput
            style={styles.input}
            placeholder="Navn"
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <Video
            source={{ uri: videoUri }}
            style={styles.preview}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay={false}
            onError={(e) => console.error("Video preview error:", e)}
          />

          <TextInput
            style={styles.input}
            placeholder="Beskrivelse"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setVideoUri(null)}
          >
            <Text style={styles.buttonText}>❌ Slett</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.postButton} onPress={Post}>
            <Text style={styles.buttonText}>📤 Post</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: "#ecf0f1",
    alignItems: "center",
  },
  camera: {
    width: 300,
    height: 300,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#3498db",
  },
  captureButton: {
    backgroundColor: "#3498db",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    elevation: 5,
    alignSelf: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#2c3e50",
    marginVertical: 10,
  },
  videoContainer: {
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  preview: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    backgroundColor: "#000",
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderColor: "#3498db",
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#c0392b",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    elevation: 5,
  },
  postButton: {
    backgroundColor: "#2ecc71",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    elevation: 5,
  },
});

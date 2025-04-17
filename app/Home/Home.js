/** @format */

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import { useRouter } from "expo-router";
import styles from "./Home.style";
import axios from "axios";

const Home = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const [latestMedia, setLatestMedia] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const { videoForCloud, setVideoForCloud } = useState(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      setHasPermission(true);
    } else {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }
  }, []);

  const startWebCamera = async () => {
    if (Platform.OS === "web") {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
      }
      setCameraStarted(true);
    }
  };

  const takePicture = async () => {
    if (!cameraStarted) return;

    if (Platform.OS === "web") {
      if (!videoRef.current) return;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL("image/png");
      setLatestMedia({ type: "image", uri: imageData });
    } else {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        setLatestMedia({ type: "image", uri: photo.uri });
      }
    }
  };

  const startRecording = async () => {
    if (!cameraStarted) return;

    if (Platform.OS === "web") {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      mediaRecorderRef.current = new MediaRecorder(stream);
      recordedChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });

        const videoURL = URL.createObjectURL(blob);
        setLatestMedia({ type: "video", uri: videoURL });
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      setTimeout(() => {
        stopRecording();
      }, 120000);
    }
  };

  const stopRecording = () => {
    if (Platform.OS === "web" && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>Ingen tilgang til kamera</Text>;

  const uploadFile = async () => {
    const data = new FormData();
    data.append("file", video);
    data.append("upload_preset", "video_preset");

    try {
      let cloudName = "dand5cke0";
      let resourceType = "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const Post = () => {
    const formData = new FormData();
    formData.append("file", latestMedia.uri);
    formData.append("name", name);
    formData.append("description", description);

    console.log("latesMedia");
    console.log(latestMedia);

    const mama = uploadFile();

    console.log("fra cloud video");
    console.log(mama);

    const endpoint = latestMedia.type === "image" ? "photo" : "video";

    axios
      .post(`http://localhost:3000/${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setLatestMedia(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {Platform.OS === "web" ? (
          <>
            <video ref={videoRef} autoPlay style={styles.camera} />
            {!cameraStarted && (
              <TouchableOpacity
                style={styles.captureButton}
                onPress={startWebCamera}
              >
                <Text style={styles.buttonText}>Start kamera</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Camera ref={cameraRef} style={styles.camera} />
        )}

        {cameraStarted && !latestMedia && (
          <>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <Text style={styles.buttonText}>📸 Ta bilde</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={isRecording ? stopRecording : startRecording}
            >
              <Text style={styles.buttonText}>
                {isRecording ? "⏹ Stopp opptak" : "🎥 Ta video"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {latestMedia && (
          <View style={styles.imageContainer}>
            <TextInput
              style={styles.input}
              placeholder="name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            {latestMedia.type === "image" ? (
              <Image source={{ uri: latestMedia.uri }} style={styles.preview} />
            ) : (
              <video controls src={latestMedia.uri} style={styles.preview} />
            )}

            <TextInput
              style={styles.input}
              placeholder="description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => setLatestMedia(null)}
            >
              <Text style={styles.buttonText}>❌ Slett</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.postButton} onPress={() => Post()}>
              <Text style={styles.buttonText}>📤 Post</Text>
            </TouchableOpacity>
          </View>
        )}
        <input
          type="file"
          accept="video/*"
          id="video"
          onChange={(e) => setVideo((prev) => e.target.files[0])}
        />
      </ScrollView>
    </View>
  );
};

export default Home;

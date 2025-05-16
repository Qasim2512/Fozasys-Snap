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
import { CameraView } from "expo-camera";
import styles from "./Home.style";
import axios from "axios";

const Home = () => {
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [latestMedia, setLatestMedia] = useState(null); //Image: Show and send to backend. Video: Only show, videoForCloud sent to Cloud and then backend
  const [videoForCloud, setVideoForCloud] = useState(null); //For sending video taken to cloud and get secure_url

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

  //KUN for web, for å starte kameraet
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

  //Tar bilde og setter latestMedia til bilde både for web og app
  const takePicture = async () => {
    if (Platform.OS === "web") {
      if (!videoRef.current) return;
      if (!cameraStarted) return;

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

  //Kun for web, fungerer ikke i appen
  const startRecording = async () => {
    if (Platform.OS === "web") {
      if (!cameraStarted) return;

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

        const reader = new FileReader();
        reader.onloadend = function () {
          const base64String = reader.result;
          const base64Video = base64String.split(",")[1];

          const cloudinaryDataUrl = `data:video/webm;base64,${base64Video}`;
          setVideoForCloud(cloudinaryDataUrl);
        };

        reader.readAsDataURL(blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      setTimeout(() => {
        stopRecording();
      }, 120000);
    }
  };

  //Fungerer i web, vet ikke om det fungerer i appen
  const stopRecording = () => {
    if (Platform.OS === "web" && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    if (hasPermission === null) return <View />;
    if (hasPermission === false) return <Text>Ingen tilgang til kamera</Text>;
  };

  //Fungerer i web, vet ikke om det fungerer i appen
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

  //Oppdater url slik at den funker i appen
  //   http://192.168.0.14:3000 //APP

  const Post = async () => {
    const cloudSecureUrl = await uploadVideoToCloudinary();
    console.log(cloudSecureUrl);
    const endpoint = latestMedia.type === "image" ? "photo" : "video";

    const baseUrl =
      Platform.OS === "web"
        ? `http://localhost:3000/${endpoint}`
        : `http://172.20.10.3:3000/${endpoint}`;

    const formData = new FormData();
    formData.append(
      "file",
      endpoint === "photo" ? latestMedia.uri : cloudSecureUrl
    );
    formData.append("name", name);
    formData.append("description", description);

    axios
      .post(baseUrl, formData, {
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
          <>
            <CameraView ref={cameraRef} style={styles.camera} />
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
          //  For å få den fiksa på appen må man skrive kode her inne bare å jobbe med det :)
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
              style={[
                styles.captureButton,
                { backgroundColor: isRecording ? "red" : "#3498db" },
              ]}
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
              placeholder="navn"
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
              placeholder="beskrivelse"
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
      </ScrollView>
    </View>
  );
};

export default Home;

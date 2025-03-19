import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Platform } from "react-native";
import { Camera } from "expo-camera";
import styles from "./Home.style";

const Home = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const [latestImage, setLatestImage] = useState(null);
  const [savedMedia, setSavedMedia] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

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
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true; // Forhindrer at lyden spilles av under opptak
      }
      setCameraStarted(true);
    }
  };

  const takePicture = async () => {
    if (Platform.OS === "web") {
      if (!videoRef.current) return;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL("image/png");
      setLatestImage(imageData);
      setSavedMedia([...savedMedia, { type: "image", uri: imageData }]);
    } else {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        setLatestImage(photo.uri);
        setSavedMedia([...savedMedia, { type: "image", uri: photo.uri }]);
      }
    }
  };

  const startRecording = async () => {
    if (Platform.OS === "web") {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
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
        setSavedMedia([...savedMedia, { type: "video", uri: videoURL }]);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      setTimeout(() => {
        stopRecording();
      }, 120000); // Stopper opptaket automatisk etter 2 minutter
    }
  };

  const stopRecording = () => {
    if (Platform.OS === "web" && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const deleteMedia = (index) => {
    const newMedia = savedMedia.filter((_, i) => i !== index);
    setSavedMedia(newMedia);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainScroll} contentContainerStyle={{ alignItems: "center" }}>
        {Platform.OS === "web" ? (
          <>
            <video ref={videoRef} autoPlay style={styles.camera} />
            {!cameraStarted && (
              <TouchableOpacity style={styles.captureButton} onPress={startWebCamera}>
                <Text style={styles.buttonText}>Start kamera</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Camera ref={cameraRef} style={styles.camera} />
        )}

        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Text style={styles.buttonText}>Ta bilde</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={isRecording ? stopRecording : startRecording}>
          <Text style={styles.buttonText}>{isRecording ? "Stopp opptak" : "Ta video"}</Text>
        </TouchableOpacity>

        {savedMedia.length > 0 && (
          <View style={styles.imageContainer}>
            <Text style={styles.historyTitle}>Lagrede medier:</Text>
            <ScrollView horizontal style={styles.scrollView}>
              {savedMedia.map((item, index) => (
                <View key={index} style={styles.imageWrapper}>
                  {item.type === "image" ? (
                    <Image source={{ uri: item.uri }} style={styles.preview} />
                  ) : (
                    <video controls src={item.uri} style={styles.preview} />
                  )}
                  <TouchableOpacity style={styles.deleteButton} onPress={() => deleteMedia(index)}>
                    <Text style={styles.buttonText}>Slett</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
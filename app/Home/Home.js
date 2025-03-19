import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  Text,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library"; // 🔹 For å lagre bilder
import styles from "./Home.style";

const Home = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [mediaPermission, setMediaPermission] = useState(null);
  const [cameraStarted, setCameraStarted] = useState(false); // 🔹 Kamera-status
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "web") {
        setHasPermission(true);
      } else {
        const { status } = await Camera.requestCameraPermissionsAsync();
        const mediaStatus = await MediaLibrary.requestPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(
            "Tillatelse kreves",
            "Gå til innstillinger for å aktivere kamera."
          );
        }

        if (mediaStatus.status !== "granted") {
          Alert.alert(
            "Lagringstillatelse kreves",
            "Gå til innstillinger for å tillate lagring av bilder."
          );
        }

        setHasPermission(status === "granted");
        setMediaPermission(mediaStatus.status === "granted");
      }
    })();
  }, []);

  const startWebCamera = async () => {
    if (Platform.OS === "web") {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraStarted(true); // 🔹 Sett kamera til aktivt
      } catch (error) {
        console.error("Kameraet kunne ikke starte:", error);
        alert(
          "Kameraet kunne ikke starte. Sjekk nettlesertillatelser og at ingen andre apper bruker kameraet."
        );
      }
    } else {
      setCameraStarted(true); // 🔹 For mobil, vi antar at kameraet starter
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
      setPhotoUri(canvas.toDataURL("image/png"));
    } else {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        setPhotoUri(photo.uri);
      }
    }
  };

  const savePicture = async () => {
    if (Platform.OS === "web") {
      const link = document.createElement("a");
      link.href = photoUri;
      link.download = "photo.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("Bildet er lastet ned!");
    } else {
      if (mediaPermission) {
        await MediaLibrary.saveToLibraryAsync(photoUri);
        alert("Bildet er lagret i galleriet!");
      } else {
        alert("Du må gi tilgang til lagring for å lagre bilder.");
      }
    }
  };

  const deletePicture = () => {
    setPhotoUri(null);
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>Ingen tilgang til kamera</Text>;

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: photoUri }} style={styles.preview} />

          {/* X-knapp for å slette bildet */}
          <TouchableOpacity style={styles.deleteButton} onPress={deletePicture}>
            <Text style={styles.buttonText}>❌</Text>
          </TouchableOpacity>

          {/* Post-knapp for å laste ned bildet */}
          <TouchableOpacity style={styles.postButton} onPress={savePicture}>
            <Text style={styles.buttonText}>Last ned 📤</Text>
          </TouchableOpacity>
        </View>
      ) : Platform.OS === "web" ? (
        <View style={styles.cameraContainer}>
          <video ref={videoRef} autoPlay style={styles.camera} />
          {!cameraStarted && (
            <TouchableOpacity
              style={styles.startButton}
              onPress={startWebCamera}
            >
              <Text style={styles.startButtonText}>📷 Start kamera</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Camera ref={cameraRef} style={styles.camera} />
      )}

      {/* Ta bilde knapp (kun synlig når kameraet er startet) */}
      {cameraStarted && !photoUri && (
        <TouchableOpacity
          style={styles.captureButton}
          onPress={takePicture}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>📸 Ta bilde</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Home;

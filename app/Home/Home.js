import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import styles from "./Home.style";

const Home = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const [latestImage, setLatestImage] = useState(null); // 🆕 Siste bilde tatt
  const [savedImages, setSavedImages] = useState([]); // 🆕 Lagrede bilder
  const [imageHistory, setImageHistory] = useState([]);
  const [cameraStarted, setCameraStarted] = useState(false);

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
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
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
      setLatestImage(imageData); // 🆕 Oppdater siste bilde
      setImageHistory([...imageHistory, imageData]);
    } else {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        setLatestImage(photo.uri); // 🆕 Oppdater siste bilde
        setImageHistory([...imageHistory, photo.uri]);
      }
    }
  };

  const saveImage = () => {
    if (latestImage) {
      setSavedImages([...savedImages, latestImage]); // 🆕 Lagre bildet
      setLatestImage(null); // Tøm forhåndsvisningen
    }
  };

  const deleteImage = (index) => {
    const newImages = savedImages.filter((_, i) => i !== index);
    setSavedImages(newImages);
  };

  const downloadImage = (uri) => {
    const link = document.createElement("a");
    link.href = uri;
    link.download = "saved-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Ingen tilgang til kamera</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {/* Kamera- eller videovindu */}
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

        {/* Ta bilde knapp */}
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Text style={styles.buttonText}>Ta bilde</Text>
        </TouchableOpacity>

        {/* Siste bilde tatt */}
        {latestImage && (
          <View style={styles.latestImageContainer}>
            <Text style={styles.historyTitle}>Siste bilde:</Text>
            <Image source={{ uri: latestImage }} style={styles.previewLarge} />
            <TouchableOpacity style={styles.saveButton} onPress={saveImage}>
              <Text style={styles.buttonText}>Lagre bilde</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Lagrede bilder seksjon */}
        {savedImages.length > 0 && (
          <View style={styles.imageContainer}>
            <Text style={styles.historyTitle}>Lagrede bilder:</Text>
            <ScrollView horizontal style={styles.scrollView}>
              {savedImages.map((uri, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri }} style={styles.preview} />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteImage(index)}
                  >
                    <Text style={styles.buttonText}>Slett</Text>
                  </TouchableOpacity>
                  {Platform.OS === "web" && (
                    <TouchableOpacity
                      style={styles.downloadButton}
                      onPress={() => downloadImage(uri)}
                    >
                      <Text style={styles.buttonText}>Last ned</Text>
                    </TouchableOpacity>
                  )}
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

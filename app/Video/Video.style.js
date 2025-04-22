/** @format */

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    padding: 10,
    alignItems: "center",
  },
  searchbar: {
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    elevation: 3,
    padding: 6,
    fontSize: 14,
    borderColor: "#007aff",
    borderWidth: 1,
    color: "#007aff",
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
    textAlign: "center",
    textShadowColor: "#dcdcdc",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  videoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    overflow: "hidden",
    elevation: 3,
    marginBottom: 20,
    marginTop: 20,
    width: 450,
    height: 450,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  videoWrapper: {
    borderWidth: 5,
    borderColor: "#3498db",
    borderRadius: 6,
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  videoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
    resizeMode: "cover",
  },
  videoText: {
    fontSize: 14,
    color: "#34495e",
    fontWeight: "500",
    marginBottom: 3,
    textAlign: "center",
  },
  photoDescription: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#ff4757",
    borderRadius: 15,
    padding: 6,
    marginTop: 6,
    elevation: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 12,
  },
  buttonLogo: {
    color: "black",
  },
  playButton: {
    backgroundColor: "#007BFF", // Endre bakgrunnsfarge
    padding: 10, // Legg til padding
    borderRadius: 5, // Rundede hjørner
    alignItems: "center", // Sentrer innholdet
    justifyContent: "center", // Sentrer innholdet vertikalt
    marginTop: 10, // Margin over knappen
  },
  playButtonText: {
    color: "#FFFFFF", // Tekstfarge (hvit)
    fontSize: 16, // Tekststørrelse
    fontWeight: "bold", // Fet skrift
  },
  loadingText: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
  },
});

export default styles;

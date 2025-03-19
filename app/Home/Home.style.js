import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    position: "absolute",
    bottom: 50,
    left: "50%",
    width: 120,
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateX: -60 }],
  },
  deleteButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 20,
  },
  postButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
  },
  startButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

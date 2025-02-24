import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
    paddingTop: 20,
    paddingBottom: 20,
  },
  mainScroll: {
    width: "100%",
    flexGrow: 1,
  },
  camera: {
    width: "80%",
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
  captureButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  latestImageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  previewLarge: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#FFCC00",
    padding: 10,
    borderRadius: 5,
  },
  imageContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  historyTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  scrollView: {
    width: "100%",
    maxHeight: 200,
  },
  imageWrapper: {
    marginRight: 10,
    alignItems: "center",
  },
  preview: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  downloadButton: {
    backgroundColor: "#28A745",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
});

/** @format */

// Home.style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1", // Lys bakgrunnsfarge
    padding: 15,
    alignItems: "center",
  },
  mainScroll: {
    flexGrow: 1,
    width: "100%",
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
  captureButton: {
    backgroundColor:"#3498db",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 10,
    elevation: 5,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },

  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    width: "50%", // Gjør containeren så bred som mulig
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  preview: {
    width: "100%", // Sett bredden til å være 100%
    height: 300, // Sett til en maksimal høyde der hele bildet kan vises
    borderRadius: 10,
    resizeMode: "contain", // Sørg for at hele bildet vises uten kutting
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#c0392b", // Rød farge for slett-knappen
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    elevation: 5,
  },
  postButton: {
    backgroundColor: "#2ecc71", // Grønn farge for post-knappen
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: "#3498db",
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: "100%", // Setter til full bredde
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    textAlign: "center",
  },
});

export default styles;

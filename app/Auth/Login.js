/** @format */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from "react-native";

const Login = ({ onLoginSuccess, showRegisterPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0)); // For the fade-in effect

  const handleLogin = async () => {
    const userData = { username, password };

    const baseUrl =
      Platform.OS === "web"
        ? `http://localhost:3000/auth/login`
        : `http://172.20.10.3:3000/auth/login`;

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User logged in successfully:", data.user);
        onLoginSuccess(data.token, data.user);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred during login.");
    }
  };

  // Fade-in animation on component mount
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.welcomeText}>Welcome to ForzaSport ⚽</Text>
      <Text style={styles.subHeading}>A moment to capture with fans!</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerLinkContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={showRegisterPage}>
          <Text style={styles.registerLink}>Create one here</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5", 
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#000", 
    marginBottom: 10,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 18,
    color: "#000", 
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderColor: "#000", 
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#000", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: "#000", 
    padding: 12,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#fff", 
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 16,
    textAlign: "center",
  },
  registerLinkContainer: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  registerText: {
    fontSize: 16,
    color: "#000", 
  },
  registerLink: {
    fontSize: 16,
    color: "#4CAF50",
    textDecorationLine: "underline",
  },
});

export default Login;

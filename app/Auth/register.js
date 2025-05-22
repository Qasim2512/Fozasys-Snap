/** @format */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Platform,
} from "react-native";

const Register = ({ onRegisterSuccess, onGoToLogin }) => {
  // Added onGoToLogin prop
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0)); // For fade-in effect

  const handleRegister = async () => {
    const userData = {
      username,
      password,
      email,
    };

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const baseUrl =
      Platform.OS === "web"
        ? `http://localhost:3000/auth/register`
        : `http://172.20.10.3:3000/auth/register`;

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User registered successfully.");
        onRegisterSuccess(); 
      } else {
        const errorText = await response.text();
        setError(`Failed to register user: ${errorText}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("An error occurred while registering.");
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
      <Image
        style={styles.logo}
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Icon-Soccer.svg",
        }} // Relevant football emoji as a logo
      />
      <Text style={styles.headingText}>Register for ForzaSport</Text>
      <Text style={styles.subheadingText}>
        Join the community of champions ⚽💪
      </Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Already have an account? Login here */}
      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={onGoToLogin}>
          <Text style={styles.loginLink}>Login here</Text>
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
    backgroundColor: "#fff", 
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  headingText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000", 
    marginBottom: 20,
    textAlign: "center",
  },
  subheadingText: {
    fontSize: 16,
    color: "#333", 
    marginBottom: 30,
    textAlign: "center",
    fontStyle: "italic",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 20,
    borderColor: "#000", 
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "#fff", 
    fontSize: 16,
    color: "#000", 
  },
  button: {
    backgroundColor: "#000", 
    padding: 14,
    width: "100%",
    alignItems: "center",
    borderRadius: 8,
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
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
  loginLinkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    fontSize: 16,
    color: "#000", 
  },
  loginLink: {
    fontSize: 16,
    color: "#000", 
    textDecorationLine: "underline",
  },
});

export default Register;

import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../src/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("test@demo.com");
  const [password, setPassword] = useState("password123");
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace("/products");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
   <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="email-address"
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don’t have an account?{" "}
          <Text style={styles.link}>Register</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    color: "#222",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#2a9d8f",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 14,
    color: "#444",
  },
  link: {
    color: "#2a9d8f",
    fontWeight: "600",
  },
});

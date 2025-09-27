import React, { useContext } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { CartContext } from "../src/context/CartContext";
import { AuthContext } from "../src/context/AuthContext";
import { useRouter } from "expo-router";

export default function Checkout() {
  const { items, total, clear } = useContext(CartContext);
  const { token, API } = useContext(AuthContext);
  const router = useRouter();

  const placeOrder = async () => {
    try {
      const res = await axios.post(
        `${API}/orders`,
        {
          items: items.map((i) => ({ id: i.id, price: i.price, qty: i.qty })),
          total,
          paymentMethod: "online",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        alert("Order placed!");
        clear();
        router.replace("/orders");
      }
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
     <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.label}>Items in Cart:</Text>
        <Text style={styles.value}>{items.length}</Text>

        <Text style={styles.label}>Total Amount:</Text>
        <Text style={styles.total}>₹{total}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={placeOrder}>
        <Text style={styles.buttonText}>Place Order (Online)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#222",
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  total: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2a9d8f",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#2a9d8f",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: "auto",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

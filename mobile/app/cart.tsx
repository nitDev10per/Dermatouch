// app/cart.tsx
import React, { useContext } from "react";
import { View, Text, FlatList, Button, Image, StyleSheet } from "react-native";
import { CartContext } from "../src/context/CartContext";
import { useRouter } from "expo-router";
const product = require('../assets/images/Niacinamide_30ml_1024x1024.webp');

export default function Cart() {
  const { items, total, remove } = useContext(CartContext);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={product} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>
                ₹{item.price} x {item.qty}
              </Text>
              <Text style={styles.subtotal}>Subtotal: ₹{item.price * item.qty}</Text>
              <Button title="Remove" onPress={() => remove(item.id)} />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Your cart is empty 🛒</Text>
        }
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ₹{total}</Text>
        <Button title="Checkout" onPress={() => router.push("/checkout")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#fff" },
  card: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
  },
  image: { width: 70, height: 70, borderRadius: 6, marginRight: 12 },
  details: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  price: { fontSize: 14, color: "#444" },
  subtotal: { fontSize: 14, fontWeight: "500", marginVertical: 4 },
  empty: { textAlign: "center", marginTop: 40, fontSize: 16 },
  footer: {
    borderTopWidth: 1,
    borderColor: "#eee",
    padding: 12,
    backgroundColor: "#fff",
  },
  total: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
});

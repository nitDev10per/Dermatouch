import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { AuthContext } from "../src/context/AuthContext";

export default function Orders() {
  const { token, API } = useContext(AuthContext);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(o) => "" + o.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.orderId}>Order #{item.id}</Text>
            <Text style={styles.total}>Total: ₹{item.total}</Text>
            <Text style={styles.date}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>

            <View style={styles.itemsContainer}>
              <Text style={styles.itemsTitle}>Items:</Text>
              {item.OrderItems &&
                item.OrderItems.map((i: any) => (
                  <Text key={i.id} style={styles.item}>
                    • {i.product ? i.product.title : i.productId} x {i.qty}
                  </Text>
                ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  total: {
    fontSize: 16,
    color: "#28a745",
    fontWeight: "600",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  itemsContainer: {
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  itemsTitle: {
    fontWeight: "600",
    marginBottom: 4,
    fontSize: 15,
  },
  item: {
    fontSize: 14,
    color: "#444",
    marginLeft: 4,
  },
});

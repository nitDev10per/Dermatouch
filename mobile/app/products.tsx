import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { CartContext } from "../src/context/CartContext";
import { AuthContext } from "../src/context/AuthContext";
import { useRouter } from "expo-router";
import imageProduct from '../assets/images/Niacinamide_30ml_1024x1024.webp';

export default function Products() {
  const { add } = useContext(CartContext);
  const { API } = useContext(AuthContext);
  const [products, setProducts] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`, { params: { q, category } });
    setProducts(res.data);
    console.log('products', res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search products"
          value={q}
          onChangeText={setQ}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchButton} onPress={fetchProducts}>
          <Text style={styles.searchButtonText}>Go</Text>
        </TouchableOpacity>
      </View>

      {/* Category Buttons */}
      <View style={styles.categoryContainer}>
        {["All", "Skincare", "Hair", "Cart", "Orders"].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={styles.categoryButton}
            onPress={() => {
              if (cat === "All") setCategory("");
              else if (cat === "Cart") router.push("/cart");
              else if (cat === "Orders") router.push("/orders");
              else setCategory(cat);

              if (cat !== "Cart" && cat !== "Orders") fetchProducts();
            }}
          >
            <Text style={styles.categoryButtonText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Products List */}
      <FlatList
        data={products}
        keyExtractor={(item) => "" + item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View><Image source={{ uri: item.image }} style={styles.image} /></View>
            <View>
              <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productCategory}>
              {item.category} • <Text style={styles.price}>₹{item.price}</Text>
            </Text>
            <TouchableOpacity style={styles.addButton} onPress={() => add(item)}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
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
  image: { width: 70, height: 70, borderRadius: 6, marginRight: 12 },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  searchButton: {
    backgroundColor: "#28a745",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
    gap: 8,
  },
  categoryButton: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryButtonText: {
    color: "#333",
    fontWeight: "600",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  price: {
    color: "#28a745",
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

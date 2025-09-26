import { Stack } from "expo-router";
import { AuthProvider } from "../src/context/AuthContext";
import { CartProvider } from "../src/context/CartContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: true }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ title: "Login" }} />
          <Stack.Screen name="products" options={{ title: "Products" }} />
          <Stack.Screen name="cart" options={{ title: "Cart" }} />
          <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
          <Stack.Screen name="orders" options={{ title: "Orders" }} />
        </Stack>
      </CartProvider>
    </AuthProvider>
  );
}

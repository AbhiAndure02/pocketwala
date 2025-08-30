import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Order from "./pages/Order";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import SingleOrder from "./pages/SingleOrder";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import AddProduct from "./admin/AddProduct";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/MyCart";
import Footer from "./components/Footer";
import UserList from "./admin/UserList";
const App = () => {
  const [cart, setCart] = useState([]);

  // Add product to cart or increase quantity if already added
  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove product from cart completely
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Update product quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/single-order" element={<SingleOrder />} />
        <Route path="/admin/products" element={<AddProduct />} />
        <Route path="/" element={<Home cart={cart} addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />
        <Route path="/order" element={<Order />} />{" "}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin/users" element={<UserList />} />{" "}
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

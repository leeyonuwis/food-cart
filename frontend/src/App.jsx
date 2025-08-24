import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PrivateRoute from "./routes/PrivateRoute";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./layouts/DashboardLayout";
import Payments from "./pages/dashboard/Payments";
import Cart from "./pages/dashboard/Cart";
import Orders from "./pages/dashboard/Orders";
import DashboardHome from "./pages/dashboard/DashboardHome";
import OrderPlaced from "./pages/dashboard/orders/OrderPlaced";
import PaymentHistory from "./pages/dashboard/PaymentHistory";
import ScrollToTop from "./ScrollToTop";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-placed/:orderId" element={<OrderPlaced />} />
          <Route path="cart" element={<Cart />} />
          <Route path="payments" element={<Payments />} />
          <Route path="payment-history" element={<PaymentHistory />} />
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;

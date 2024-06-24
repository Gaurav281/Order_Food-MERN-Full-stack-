import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import CartProvider from "./components/contextReducer";
import Home from "./screens/Home";
import Login from "./screens/Login";
import MyOrder from "./screens/MyOrder.jsx";
import MyPay from "./screens/MyPay.jsx";
import PaymentSuccess from "./screens/PaymentSuccess.jsx";
import Signup from "./screens/Signup";
const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/payment" element={<MyPay />} />
          <Route exact path="/paymentSuccess" element={<PaymentSuccess />} />
          <Route exact path="/loginuser" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="/myOrder" element={<MyOrder />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;

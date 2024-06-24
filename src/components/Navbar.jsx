import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import { Link, useNavigate } from "react-router-dom";
import Modals from "../Modals";
import "../css/navbar.css";
import Cart from "../screens/Cart";
import { UseCart } from "./contextReducer";

const Navbar = () => {
  const data = UseCart(); // Invoking the UseCart hook to get cart data
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userType");
    setTimeout(() => {
      navigate("/loginuser");
    }, 100);
    console.log("Logged out successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light navbar-main">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-bold p-2 " to="/">
            Foody
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item ">
                <Link
                  className="nav-link active text-white fs-3"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item ">
                  <Link
                    className="nav-link active text-white fs-3"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="mx-1 btn bg-white text-success"
                  to="/loginuser"
                >
                  Login
                </Link>
                <Link
                  className="mx-1 btn bg-white text-success"
                  to="/createuser"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <button
                  className="mx-1 btn bg-white text-success"
                  onClick={() => setCartView(true)}
                >
                  My Cart {"  "}
                  <Badge pill page="danger">
                    {data ? data.length : 0} {/* Update badge value */}
                  </Badge>
                </button>
                {cartView ? (
                  <Modals onClose={() => setCartView(false)}>
                    <Cart />
                  </Modals>
                ) : null}
                <button
                  className="mx-1 btn bg-white text-danger"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

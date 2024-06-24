import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";
const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    userType: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userType: credentials.userType,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (!data.success) {
      alert("Enter Valid Data");
    } else {
      localStorage.setItem("userType", credentials.userType);
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", data.authToken);
      // console.log(localStorage.getItem("authToken"));
      navigate("/");
      alert("Login Successful");
    }
  };
  return (
    <div className="login-main">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Login in to your account</p>
        <div className="input-container">
          <input
            placeholder="UserType"
            type="text"
            name="userType"
            value={credentials.userType}
            onChange={onChange}
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Enter email"
            type="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Enter password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button className="submit" type="submit">
          Sign in
        </button>

        <p className="signup-link">
          No account?
          <Link to="/createuser">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

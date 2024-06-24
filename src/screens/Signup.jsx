import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/signup.css";
const Signup = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    userType: "",
    fname: "",
    lname: "",
    email: "",
    location: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userType: credentials.userType,
        fname: credentials.fname,
        lname: credentials.lname,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (!data.success) {
      alert("Enter Valid Data");
    } else {
      navigate("/loginuser");
      alert("SignUp Successful");
    }
  };
  return (
    <div className="signup-main">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
        <label>
          <input
            className="input"
            type="text"
            name="userType"
            value={credentials.userType}
            onChange={onChange}
            placeholder=""
            required=""
          />
          <span>UserType</span>
        </label>
        <div className="flex">
          <label>
            <input
              className="input"
              type="text"
              name="fname"
              value={credentials.fname}
              onChange={onChange}
              placeholder=""
              required=""
            />
            <span>Firstname</span>
          </label>

          <label>
            <input
              className="input"
              name="lname"
              value={credentials.lname}
              onChange={onChange}
              type="text"
              placeholder=""
              required=""
            />
            <span>Lastname</span>
          </label>
        </div>

        <label>
          <input
            className="input"
            name="email"
            value={credentials.email}
            onChange={onChange}
            type="email"
            placeholder=""
            required=""
          />
          <span>Email</span>
        </label>

        <label>
          <input
            className="input"
            name="password"
            value={credentials.password}
            onChange={onChange}
            type="password"
            placeholder=""
            required=""
          />
          <span>Password</span>
        </label>
        <label>
          <input
            className="input"
            name="location"
            value={credentials.location}
            onChange={onChange}
            type="text"
            placeholder=""
            required=""
          />
          <span>Location</span>
        </label>
        <button className="submit">Submit</button>
        <p className="signin">
          Already have an acount ? <Link to="/loginuser">Login</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Signup;

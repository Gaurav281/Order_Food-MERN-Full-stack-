// import { useEffect } from "react";
import axios from "axios";
import { UseCart, UseDispatchCart } from "../components/contextReducer";
import "./Cart.css";

const Cart = () => {
  const data = UseCart();
  const dispatch = UseDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-2 text-warning">
          The cart is Empty
        </div>
      </div>
    );
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckOut = async (amount) => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        console.error("User email not found in localStorage");
        return;
      }

      const fetchData = await axios.post(
        "http://localhost:3000/api/orderData",
        {
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }
      );

      console.log("Response from server:", fetchData.data);

      // Fetch keyData from server
      const { data: keyData } = await axios.get(
        "http://localhost:3000/api/getkey"
      );

      // Make a POST request to initiate checkout
      const { data: orderData } = await axios.post(
        "http://localhost:3000/api/checkout",
        { amount }
      );

      const options = {
        key: keyData.key,
        amount: orderData.order.amount,
        currency: "INR",
        name: "",
        description: "Test Transaction",
        image: "",
        order_id: orderData.order.id,
        callback_url: "http://localhost:3000/api/paymentverification",
        prefill: {
          name: "",
          email: userEmail,
          contact: "",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
      razor.on("payment.success", async function (response) {
        console.log("Payment Successful!", response);
        // Dispatch action here upon successful payment and data posting
        dispatch({ type: "DROP" });
      });
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr className="table-heading">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Options</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.Quantity}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    <img id="trash-svg" src="trash-outline.svg" alt="delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button
            className="bg-white h-100 w-100 text-danger fs-3 "
            onClick={() => handleCheckOut(totalPrice)}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

// const { data: keyData } = await axios.get(
//   "http://localhost:3000/api/getkey"
// );
// const { data: orderData } = await axios.post(
//   "http://localhost:3000/api/checkout",
//   { amount }
// );

// const options = {
//   key: keyData.key,
//   amount: orderData.order.amount,
//   currency: "INR",
//   name: "",
//   description: "Test Transaction",
//   image: "",
//   order_id: orderData.order.id,
//   callback_url: "http://localhost:3000/api/paymentverification",
//   prefill: {
//     name: "",
//     email: userEmail,
//     contact: "",
//   },
//   notes: {
//     address: "Razorpay Corporate Office",
//   },
//   theme: {
//     color: "#3399cc",
//   },
// };

// const razor = new window.Razorpay(options);
// razor.open();

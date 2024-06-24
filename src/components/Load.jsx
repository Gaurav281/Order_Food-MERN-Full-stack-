/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useRef, useState } from "react";
import "../css/card.css";
import { UseCart, UseDispatchCart } from "./contextReducer";

const Load = ({ foodItems, _id }) => {
  const data = UseCart();
  const dispatch = UseDispatchCart();
  const [Quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const optionNames = foodItems.options.map((option) => option);
  // const [addToCartClicked, setAddToCartClicked] = useState(false);
  const priceRef = useRef();
  let finalPrice = Quantity * foodItems.price;
  useEffect(() => {
    setSize(priceRef.current.value);
    // console.log(finalPrice);
    // Log the updated state after it has been updated
    // setAddToCartClicked(false);
  }, []);

  const handleAddToCart = async () => {
    const finalPrice = Quantity * foodItems.price;

    const existingItemIndex = data.findIndex(
      (item) => item.id === foodItems._id && item.size === size
    );

    if (existingItemIndex !== -1) {
      // Item already exists in cart, update it
      await dispatch({
        type: "UPDATE",
        index: existingItemIndex,
        Quantity: Quantity,
        price: finalPrice,
      });
    } else {
      // Item doesn't exist in cart, add it
      await dispatch({
        type: "ADD",
        id: foodItems._id,
        name: foodItems.name,
        Quantity: Quantity,
        size: size,
        price: finalPrice,
        img: foodItems.img,
      });
    }
  };

  return (
    <div key={_id} className="card-data-wrapper">
      <div className="image_container">
        <img className="image" src={foodItems.img} alt={foodItems.name} />
      </div>
      <div className="title">
        <span>
          {foodItems.name} -{foodItems.category}
        </span>
      </div>
      <div className="description">{foodItems.description}</div>
      <div className="item-details">
        <select
          className="item-count"
          value={Quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        >
          {Array.from(Array(20), (e, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          className="item-type"
          value={size}
          ref={priceRef}
          onChange={(e) => setSize(e.target.value)}
        >
          {optionNames.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="action">
        <div className="price">
          <span>₹{finalPrice}</span>
        </div>
        <button className="cart-button" onClick={handleAddToCart}>
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default Load;

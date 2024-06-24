import { Box, Stack } from "@chakra-ui/react";
import axios from "axios";
import PaymentCard from "../components/PaymentCard";

const MyPay = () => {
  const checkoutHandler = async (amount) => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      const { data: keyData } = await axios.get(
        "http://localhost:3000/api/getkey"
      );
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
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <Box>
      <Stack
        h={"100vh"}
        justifyContent={"center"}
        direction={["column", "row"]}
      >
        <PaymentCard
          amount={5000}
          img={
            "https://cdn.shopify.com/s/files/1/1684/4603/products/MacBookPro13_Mid2012_NonRetina_Silver.png?v=1620371415"
          }
          checkoutHandler={checkoutHandler}
        />
      </Stack>
    </Box>
  );
};

export default MyPay;

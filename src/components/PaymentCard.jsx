/* eslint-disable react/prop-types */
import { Button, Image, Text, VStack } from "@chakra-ui/react";

const PaymentCard = ({ amount, img, checkoutHandler }) => {
  return (
    <VStack>
      <Image src={img} boxSize={64} objectFit={"cover"} />
      <Text>{amount}</Text>
      <Button onClick={() => checkoutHandler(amount)}>Buy Now</Button>
    </VStack>
  );
};

export default PaymentCard;

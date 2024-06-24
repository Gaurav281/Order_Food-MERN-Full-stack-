/* eslint-disable no-unused-vars */
import { Box, Button, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10); // Set initial countdown value to 10 seconds
  const timerRef = useRef(null); // Ref to hold the timeout ID
  const [isNavigationStopped, setIsNavigationStopped] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  const colorPairs = [
    { bg: "#ffcccc", text: "#000000" },
    { bg: "#ffccff", text: "#000000" },
    { bg: "#ccccff", text: "#000000" },
    { bg: "#ccffff", text: "#000000" },
    { bg: "#ccffcc", text: "#000000" },
  ];

  const bgChange = keyframes`
    0% { background-color: ${colorPairs[0].bg}; color: ${colorPairs[0].text}; }
    25% { background-color: ${colorPairs[1].bg}; color: ${colorPairs[1].text}; }
    50% { background-color: ${colorPairs[2].bg}; color: ${colorPairs[2].text}; }
    75% { background-color: ${colorPairs[3].bg}; color: ${colorPairs[3].text}; }
    100% { background-color: ${colorPairs[4].bg}; color: ${colorPairs[4].text}; }
  `;

  useEffect(() => {
    // Set up the countdown timer
    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Set up the redirection timer
    timerRef.current = setTimeout(() => {
      navigate("/");
    }, 10000); // Navigate to home after 10 seconds

    return () => {
      clearTimeout(timerRef.current); // Cleanup the redirection timer on component unmount
      clearInterval(intervalId); // Cleanup the countdown timer on component unmount
    };
  }, [navigate]);

  const handleCopyReference = () => {
    navigator.clipboard.writeText(referenceNum);
    alert("Reference number copied to clipboard");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleStayHere = () => {
    clearTimeout(timerRef.current); // Clear the redirection timer
    setIsNavigationStopped(true); // Set the navigation stopped state to true
  };

  return (
    <Box
      css={css`
        animation: ${bgChange} 10s linear infinite;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      `}
    >
      <VStack
        h={"100vh"}
        justifyContent={"center"}
        textColor={colorPairs[colorIndex].text}
        fontSize={"30px"}
        fontWeight={900}
      >
        <Heading textTransform={"uppercase"} textColor={"greenyellow"}>
          Order Successful
        </Heading>
        <Heading>Reference No. = {referenceNum}</Heading>
        {!isNavigationStopped && (
          <HStack>
            <Heading>
              You will be redirected to Home in{" "}
              <Text as="span" color="red">
                {countdown}
              </Text>{" "}
              seconds
            </Heading>
          </HStack>
        )}
        <HStack>
          <Button onClick={handleCopyReference}>Copy Reference No.</Button>
          <Button onClick={handleBackToHome}>Back To Home</Button>
        </HStack>
        <Button onClick={handleStayHere}>Stay Here</Button>
      </VStack>
    </Box>
  );
};

export default PaymentSuccess;

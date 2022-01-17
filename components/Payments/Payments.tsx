import React from "react";
import { Text, Box } from "@chakra-ui/react";
import { MotionBox, MotionFlex } from "components/MotionComponents";
import PaymentChoice from "./PaymentChoice";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const text = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
};

const item = {
  hidden: { opacity: 0, y: -50 },
  show: { opacity: 1, y: 0 },
};

const Payments = () => {
  return (
    <Box mt={10}>
      <MotionBox variants={text} initial="hidden" animate="show">
        <Text
          textAlign="left"
          fontWeight="bold"
          fontSize={{ base: "5xl", sm: "6xl" }}
        >
          Your best choice to get into Web3.
        </Text>
      </MotionBox>
      <MotionFlex
        mt={10}
        w={{ base: "100%", sm: "80%", md: "58%", lg: "36%" }}
        flexDirection="column"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <MotionBox variants={item}>
          <PaymentChoice
            title="PAY 1 ETH FOR A RETURNABLE DEPOSIT"
            action={() => {}}
          />
        </MotionBox>
        <MotionBox variants={item}>
          <PaymentChoice title="PAY 4 ETH FOR FULL TUITION" action={() => {}} />
        </MotionBox>
      </MotionFlex>
    </Box>
  );
};

export default Payments;

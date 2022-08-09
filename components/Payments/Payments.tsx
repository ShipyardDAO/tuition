import React, { useState, useCallback, useEffect } from "react";
import { parseUnits } from "ethers/lib/utils";
import { MotionBox, MotionFlex } from "components/MotionComponents";
import PaymentChoice from "./PaymentChoice";
import {
  useContractFunction,
  useEthers,
  useSendTransaction,
} from "@usedapp/core";
import {
  activateWalletAndHandleError,
  handleContractInteractionResponse,
  getEthPricePeggedInUsd,
  usdcContract,
} from "utils";
import { toast } from "react-toastify";
import Loading from "components/Loading";
import ThankYou from "./ThankYou";
import { Flex, Text } from "@chakra-ui/react";
import { TREASURY_ADDRESS, USDC_DECIMALS } from "utils/constants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -50 },
  show: { opacity: 1, y: 0 },
};

const Payments = () => {
  const { account, activateBrowserWallet } = useEthers();
  const [isLoading, setIsLoading] = useState(false);
  const { state: contributionStatus, sendTransaction } = useSendTransaction();

  console.log("contributionStatus yyy", contributionStatus);

  const { state: contributionStatus2, send: sendUsdc } = useContractFunction(
    usdcContract,
    "transfer"
  );

  const handleEthContribution = async () => {
    if (account) {
      const ethValue = await getEthPricePeggedInUsd({ usdAmount: 3_000 });
      sendTransaction({
        to: TREASURY_ADDRESS,
        value: ethValue,
      });
    } else {
      activateWalletAndHandleError(activateBrowserWallet, toast);
    }
  };

  const handleUsdcContribution = async () => {
    if (account) {
      console.log("yyy 10 are we hitting this");
      // usdc has 6 decimals, not 18 like eth
      sendUsdc({
        to: TREASURY_ADDRESS,
        value: parseUnits("3000", USDC_DECIMALS),
      });

      console.log("yyy 12 are we hitting this");
    } else {
      activateWalletAndHandleError(activateBrowserWallet, toast);
    }
  };

  useEffect(() => {
    handleContractInteractionResponse(contributionStatus, toast, setIsLoading);
  }, [contributionStatus]);

  return (
    <MotionFlex
      mt={7}
      w={{ base: "100%" }}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Loading isLoading={isLoading}>
        {account && contributionStatus?.status === "Success" ? (
          <ThankYou itemVariant={item} />
        ) : (
          <>
            <Flex
              justifyContent="flex-start"
              flexDirection={{
                base: "column",
                md: "row",
              }}
              // minWidth={{ base: "100%" }}
              w={{ base: "100%" }}
            >
              <MotionBox
                variants={item}
                marginRight={{ base: "0px", md: "20px" }}
              >
                <PaymentChoice
                  title="Contribute ETH *"
                  action={() => handleEthContribution()}
                />
              </MotionBox>
              <MotionBox
                variants={item}
                marginRight={{ base: "0px", md: "20px" }}
              >
                <PaymentChoice
                  title="Contribute 3,000 USDC"
                  action={() => handleUsdcContribution()}
                />
              </MotionBox>
            </Flex>
            <Text
              mt="4"
              color="black.100"
              textAlign="left"
              fontStyle="italic"
              fontSize={{ base: "lg", md: "xl" }}
            >
              *If Tuition is paid in ETH, it will be equivalent to $3,000 USD.
              <br />
              We calculate exchange rate at time of transaction.
              <br />
              Actual rate may vary by a few basis points.
            </Text>
          </>
        )}
      </Loading>
    </MotionFlex>
  );
};

export default Payments;

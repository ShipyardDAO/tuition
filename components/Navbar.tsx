import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Button from "components/Button";
import { useEthers } from "@usedapp/core";
import { trimAddress } from "utils/helpers";
import { toast } from "react-toastify";
import { activateWalletAndHandleError } from "utils";
import Image from "next/image";

const Navbar = () => {
  const { account, activateBrowserWallet } = useEthers();

  const handleWalletConnect = async () => {
    activateWalletAndHandleError(activateBrowserWallet, toast);
  };

  return (
    <Flex
      px={{ base: 4, sm: 14 }}
      py={6}
      justifyContent="space-between"
      alignItems="center"
      userSelect="none"
    >
      <Box
        w={250}
        h={125}
        position="relative"
      >
        <Image layout="fill" src="/assets/macro-logo.png" alt="boat" />
      </Box>
      <Flex>
        <Button action={handleWalletConnect}>
          {account ? trimAddress(account) : "Connect Wallet"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;

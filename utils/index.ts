import Tuition from "artifacts/contracts/Tuition.sol/Tuition.json";
import { Contract } from "ethers";

export const TuitionObject = {
  abi: Tuition.abi,
  address: "0x818df997213BE7db19EBc1f25902C08E3Ec8d43F",
};

export const tuition = new Contract(TuitionObject.address, TuitionObject.abi);

export const getErrorFromReversion = (revertReason: string) => {
  const revertErrors = [
    "ALREADY_PAID",
    "NOT_TAKING_PAYMENTS",
    "User denied transaction",
    "insufficient funds",
  ];

  const error = revertErrors.find((errorConstant) =>
    revertReason.includes(errorConstant)
  );

  return mapErrorToFriendlyMessage(error);
};

const mapErrorToFriendlyMessage = (error: string | undefined) => {
  switch (error) {
    case "ALREADY_PAID":
      return "You already donated!";
    case "NOT_TAKING_PAYMENTS":
      return "Not taking payments at the moment, please try again later.";
    case "User denied transaction":
      return "Transaction denied by user!";
    case "insufficient funds":
      return "Insufficient funds!";
    default:
      return "An error occured calling this method!";
  }
};

export const activateWalletAndHandleError = (activate: any, toast: any) => {
  activate(() => {
    toast.error("Please use a Web3-enabled browser!");
  });
};

export const handleContractInteractionResponse = async (
  state: any,
  toast: any
) => {
  switch (state.status) {
    case "Fail":
    case "Exception":
      toast.error(getErrorFromReversion(state.errorMessage as string));
      break;
    case "Mining":
      toast.success(
        "Transaction sent! Waiting for confirmation from the network..."
      );
    case "Success":
      toast.success("Transaction mined!");
      break;
  }
};

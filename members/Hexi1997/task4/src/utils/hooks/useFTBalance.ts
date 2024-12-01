import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ftContractUtils } from "../contractUtils";

export function useFTBalance() {
  const { address } = useAccount();
  const [balance, setBalance] = useState<string>();
  const refreshBalance = useCallback(() => {
    if (!address) {
      setBalance(undefined);
    } else {
      ftContractUtils
        .getAddressBalance(address)
        .then(setBalance)
        .catch(console.error);
    }
  }, [address]);
  useEffect(() => {
    refreshBalance();
  }, [refreshBalance]);
  return { balance, refreshBalance };
}

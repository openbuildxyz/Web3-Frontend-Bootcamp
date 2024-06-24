import { parseEther, formatEther } from "viem";
import hre from "hardhat";

async function main() {
  const [bobWalletClient, aliceWalletClient] =
    await hre.viem.getWalletClients();

  const publicClient = await hre.viem.getPublicClient();
  const bobBalance = await publicClient.getBalance({
    address: bobWalletClient.account.address,
  });

  console.log('bobBalance', bobBalance)

  console.log(
    `Balance of ${bobWalletClient.account.address}: ${formatEther(
      bobBalance
    )} ETH`
  );

  const hash = await bobWalletClient.sendTransaction({
    to: aliceWalletClient.account.address,
    value: parseEther("1"),
  });
  await publicClient.waitForTransactionReceipt({ hash });

  const bobBalance1 = await publicClient.getBalance({
    address: bobWalletClient.account.address,
  });

  console.log('bobBalance1', bobBalance1)

  console.log(
    `Balance of ${bobWalletClient.account.address}: ${formatEther(
      bobBalance1
    )} ETH`
  );
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
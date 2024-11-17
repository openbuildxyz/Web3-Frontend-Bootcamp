module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const MissopContract = await deploy("MissopToken", {
    from: deployer,
    log: true,
    waitConfirmations: 1,
  });
  await deploy("NftMarket", {
    from: deployer,
    log: true,
    waitConfirmations: 1,
    args: [MissopContract.address],
  });
};

module.exports.tags = ["NftMarket"];

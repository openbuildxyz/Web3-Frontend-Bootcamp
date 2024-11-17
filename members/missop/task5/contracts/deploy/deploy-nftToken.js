module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("NftToken", {
    from: deployer,
    log: true,
    waitConfirmations: 1,
  });
};

module.exports.tags = ["NftToken"];

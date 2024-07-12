const HelloMorph = artifacts.require("HelloMorph");

module.exports = function (deployer) {
  deployer.deploy(HelloMorph);
};

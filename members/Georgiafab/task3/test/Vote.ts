import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("Vote", function () {
  async function deployVoteFixture() {
    // Contracts are deployed using the first signer/account by default
    const [proposals, hasVoted] = await hre.ethers.getSigners();

    const Vote = await hre.ethers.getContractFactory("Vote");
    const vote = await Vote.deploy();

    return { vote, proposals, hasVoted };
  }

  //   describe("createProposal", function () {
  //     it("Should creat a proposal", async function () {
  //       const { vote, proposals, hasVoted } = await loadFixture(
  //         deployVoteFixture
  //       );

  //       await vote.createProposal("sanya");
  //       const fristProposal = await vote.getProposal(0);
  //       expect(fristProposal.voteCount).to.equal(0);
  //     });
  //   });

  describe("createProposal", function () {
    it("Should creat a proposal", async function () {
      const { vote, proposals, hasVoted } = await loadFixture(
        deployVoteFixture
      );

      await vote.createProposal("sanya");
      const fristProposal = await vote.getProposalCount();
      expect(fristProposal).to.equal(1);
    });
  });
});

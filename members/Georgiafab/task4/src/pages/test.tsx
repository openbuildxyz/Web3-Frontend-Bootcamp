import { ethers } from "ethers";
import Vote from "@contracts/Vote.sol/Vote.json";
import { useState } from "react";


export default function Home() {

    interface proposalNameType {
        name: string,
        total: number
    }
    const [proposalIndex, setProposalIndex] = useState<string>("");
    const [proposal, setProposal] = useState<string>("");
    const [proposalName, setProposalName] = useState<proposalNameType | {}>({});
    const connect = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
    };

    const getContract = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        let vote = new ethers.Contract(
            "0x0B306BF915C4d645ff596e518fAf3F9669b97016",
            Vote.abi,
            signer
        );
        return { vote, signer };
    };

    const sendCreateProposal = async () => {
        const { vote, signer } = await getContract();
        console.log(1111)
        await vote.connect(signer).createProposal(proposal);
    };

    const voting = async () => {
        try {
            const { vote, signer } = await getContract();
            await vote.connect(signer).vote(proposalIndex);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };

    const getProposal = async () => {
        const { vote, signer } = await getContract();
        try {
            let [name, total] = await vote.connect(signer).getProposal(proposalIndex);
            setProposalName({ name, total });
        } catch (error) {
            alert(error);
        }
    };
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <button onClick={connect}>连接钱包</button>
            {/* <button onClick={readMessage}>read message</button> */}
            <input
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                placeholder="请输入提案名称"
            />
            <button onClick={sendCreateProposal}>提交提案</button>
            <br />
            <input
                value={proposalIndex}
                onChange={(e) => setProposalIndex(e.target.value)}
                placeholder="请输入提案号"
            />
            <button onClick={voting}>投票</button>
            <br />
            <input
                value={proposalIndex}
                onChange={(e) => setProposalIndex(e.target.value)}
                placeholder="请输入提案号"
            />
            <button onClick={getProposal}>查看提案投票结果</button>
            {proposalName.name && `${proposalName.name}:${proposalName.total}`}
        </main>
    );
}

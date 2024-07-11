import { useAccount } from "wagmi";

export function Profile() {
  const { status, address } = useAccount();
  if (status === "connecting") return <div>Loading address</div>;
  if (status === "disconnected") return <div>Error fetching ENS name </div>;
  return <div>address: {address}</div>;
}

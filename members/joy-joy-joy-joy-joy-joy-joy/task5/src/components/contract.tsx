import { useReadContracts } from 'wagmi';
import { abi } from '../abi';
import { config } from '../wagmi';

export function ReadContract() {
  const { data, error, isPending } = useReadContracts({
    config,
    contracts: [
      {
        abi,
        address: '0xe43ff92d19a030C5181444897e7a825458d2b389',
        functionName: 'lastRewardTime',
        args: [],
      },
    ],
  });
  const [time] = data || [];
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error:{error.message}</div>;
  return (
    <>
      <div>rewardtime:{time.result?.toString() || ''}</div>
    </>
  );
}

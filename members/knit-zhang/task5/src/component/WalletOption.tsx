import { useConnect } from 'wagmi';

export default function walletOption() {
    const { connectors, connect } = useConnect();
    return (
        <div className='flex flex-row'>
            {connectors.map((connector) => (
                <button className='border-2 text-xs p-2 m-2 border-stone-700 rounded-sm hover:bg-gray-300' key={connector.uid} onClick={() => connect({ connector })}>    
                    {connector.name}
                </button>
            ))}
        </div>
    )
        
}
import { Copy } from 'lucide-react';
import shortAddress from '../utilities/shortAddress';
export default function Address({address}: {address: `0x${string}` | undefined}) {
    return(
        <div className='flex items-center'>
            <p>{shortAddress(address)}</p>
            <Copy size={16} onClick={() => window.navigator.clipboard.writeText(address ? address : '')} />
        </div>
    )
}
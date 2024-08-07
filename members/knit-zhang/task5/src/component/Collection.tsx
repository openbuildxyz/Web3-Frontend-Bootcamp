export default function Collection({ tokenId } : {tokenId: number}) {
    const BG_COLOR: Array<string> = ['slate', 'gray', 'zinc'];
    const COLOR: Array<string> = ['amber', 'yellow', 'rose'];
    const NEWIDX: number = (tokenId - 1) % 3;
    return (
        <div className={`flex justify-center items-center w-32 h-24 bg-${BG_COLOR[NEWIDX]}-500 `}>
            <span className={`text-${COLOR[NEWIDX]}-500`}>{tokenId}</span>
        </div>
    )    
}
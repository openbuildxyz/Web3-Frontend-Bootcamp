export default function walletOption({onClick} : {onClick: () => void}) {
    return (
        <div className='flex flex-row'>
            <button className='border-2 text-xs p-2 m-2 border-stone-700 rounded-sm hover:bg-gray-300' onClick={onClick}>    
                    injected
            </button>
        </div>
    )
        
}
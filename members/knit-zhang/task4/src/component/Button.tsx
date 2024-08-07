export default function Button({ disabled, onClick, children }: { onClick?: () => void, children: string, disabled?: boolean }) {
    return (
        <button className='border-2 text-xs p-2 m-2 border-stone-700 rounded-sm enabled:hover:bg-gray-300 disabled:opacity-60' onClick={onClick} disabled={disabled}>    
            {children}
        </button>
    )
}
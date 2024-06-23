export default ({checked, setChecked}: {checked: boolean, setChecked: (checked: boolean) => void}) => {
    return (
        <div className="flex items-center">
            <label htmlFor="view-switch" className="text-sm pr-2">
                view soldout
            </label>
            <input
                id="view-switch"
                className="relative outline-none"
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
        </div>
    )
}
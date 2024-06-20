import { Dispatch, SetStateAction, useEffect, useState } from "react"

export function useLocalStorage<T> (key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState(() => {
        return getLocalStorageValue(key, defaultValue);
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

function getLocalStorageValue<T>(key: string, defaultValue: T): T {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
}

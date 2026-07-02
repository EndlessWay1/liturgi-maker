import { useEffect, useState } from "react";

export function useLocalStorage<T>(key:string, initialValue: T){

    const [storedValue, setStoredValue] = useState<T>(()=> {
        try {
            const item = localStorage.getItem(key);
            if (item == null) return initialValue

            return JSON.parse(item)
        } catch {
            return initialValue;
        }
    })

    useEffect(()=> {
        localStorage.setItem(key, JSON.stringify(storedValue))
        // everytime local storage changes, it called useEffect
    }, [storedValue, key])

    return [storedValue, setStoredValue] as const;
}
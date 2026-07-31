import { useState } from 'react'

const STORAGE_KEY = 'vin-history'
const MAX_ITEMS = 3

function readFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) {
            return []
        }

        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? parsed.slice(0, MAX_ITEMS) : []
    } catch {
        return []
    }
}

export function useVinHistory() {
    const [history, setHistory] = useState(readFromStorage)

    function addVin(vin) {
        setHistory((previous) => {
            const withoutDuplicate = previous.filter((item) => item !== vin)
            const next = [vin, ...withoutDuplicate].slice(0, MAX_ITEMS)

            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
            } catch {
                // Local storage unavailable (due to private mode) or quota exceeded
            }

            return next
        })
    }

    return { history, addVin }
}
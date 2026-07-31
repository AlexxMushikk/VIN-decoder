import { useState, useEffect } from 'react'
import { getVariablesList } from '../api/vpic'

let cache = null

export function useVariables() {
    const [variables, setVariables] = useState(cache)
    const [isLoading, setIsLoading] = useState(cache === null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (cache) {
            return
        }

        let cancelled = false

        async function load() {
            try {
                const response = await getVariablesList()
                cache = response.Results

                if (!cancelled) {
                    setVariables(cache)
                }
            } catch (failure) {
                if (!cancelled) {
                    setError(failure.message)
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false)
                }
            }
        }

        load()

        return () => {
            cancelled = true
        }
    }, [])

    return { variables, isLoading, error }
}
import { useState } from 'react'
import { decodeVin } from './api/vpic'
import { VARIABLE_IDS, getVehicleDetails, getVariableValue } from './utils/vinResults'
import VinForm from './components/VinForm'
import VinResults from './components/VinResults'
import './App.css'

function App() {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [fetchError, setFetchError] = useState(null)

    async function handleSubmit(vin) {
        setIsLoading(true)
        setFetchError(null)

        try {
            const response = await decodeVin(vin)
            setData(response)
        } catch (error) {
            setFetchError(error.message)
            setData(null)
        } finally {
            setIsLoading(false)
        }
    }

    const results = data?.Results ?? []
    const vehicleDetails = getVehicleDetails(results)
    const errorCode = getVariableValue(results, VARIABLE_IDS.ERROR_CODE)
    const errorText = getVariableValue(results, VARIABLE_IDS.ERROR_TEXT)
    const hasVinIssues = errorCode !== null && errorCode !== '0'

    return (
        <main className="layout">
            <h1>VIN Decoder</h1>

            <VinForm onSubmit={handleSubmit} isLoading={isLoading} />

            {fetchError && <p className="error">{fetchError}</p>}

            {data && !isLoading && (
                <section>
                    <p className="message">{data.Message}</p>

                    {hasVinIssues && <p className="warning">{errorText}</p>}

                    {vehicleDetails.length > 0 ? (
                        <VinResults items={vehicleDetails} />
                    ) : (
                        <p>Немає даних для цього VIN</p>
                    )}
                </section>
            )}
        </main>
    )
}

export default App
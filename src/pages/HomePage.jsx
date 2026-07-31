import { useState } from 'react'
import { decodeVin } from '../api/vpic'
import { VARIABLE_IDS, getVehicleDetails, getVariableValue } from '../utils/vinResults'
import { useVinHistory } from '../hooks/useVinHistory'
import VinForm from '../components/VinForm'
import VinResults from '../components/VinResults'
import VinHistory from '../components/VinHistory'
import './HomePage.css'

function HomePage() {
    const [vin, setVin] = useState('')
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [fetchError, setFetchError] = useState(null)
    const { history, addVin } = useVinHistory()

    async function handleDecode(value) {
        setIsLoading(true)
        setFetchError(null)

        try {
            const response = await decodeVin(value)
            setData(response)
            addVin(value)
        } catch (error) {
            setFetchError(error.message)
            setData(null)
        } finally {
            setIsLoading(false)
        }
    }

    function handleHistorySelect(value) {
        setVin(value)
        handleDecode(value)
    }

    const results = data?.Results ?? []
    const vehicleDetails = getVehicleDetails(results)
    const errorCode = getVariableValue(results, VARIABLE_IDS.ERROR_CODE)
    const errorText = getVariableValue(results, VARIABLE_IDS.ERROR_TEXT)
    const hasVinIssues = errorCode !== null && errorCode !== '0'

    return (
        <>
            <section className="search">
                <VinForm
                    value={vin}
                    onChange={setVin}
                    onSubmit={handleDecode}
                    isLoading={isLoading}
                />
                <VinHistory
                    items={history}
                    onSelect={handleHistorySelect}
                    isLoading={isLoading}
                />
            </section>

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
        </>
    )
}

export default HomePage
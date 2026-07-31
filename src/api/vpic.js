const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles'

export async function decodeVin(vin) {
    const response = await fetch(`${BASE_URL}/decodevin/${vin}?format=json`)

    if (!response.ok) {
        throw new Error(`Помилка запиту: ${response.status}`)
    }

    return response.json()
}
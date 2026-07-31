const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles'

async function request(path) {
    let response

    try {
        response = await fetch(`${BASE_URL}${path}`)
    } catch {
        throw new Error('Сервер не відповідає. Перевірте підключення до інтернету.')
    }

    if (!response.ok) {
        throw new Error(`Сервіс NHTSA недоступний (код ${response.status})`)
    }

    try {
        return await response.json()
    } catch {
        throw new Error('Сервер повернув некоректну відповідь')
    }
}

export function decodeVin(vin) {
    return request(`/decodevin/${vin}?format=json`)
}
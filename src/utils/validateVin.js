export const VIN_LENGTH = 17

const FORBIDDEN_LETTERS = /[IOQ]/
const ALLOWED_CHARS = /^[A-HJ-NPR-Z0-9]+$/

export function validateVin(value) {
    const vin = value.trim().toUpperCase()

    if (!vin) {
        return 'Введіть VIN-код'
    }

    if (vin.length > VIN_LENGTH) {
        return `VIN не може бути довшим за ${VIN_LENGTH} символів`
    }

    if (vin.length < VIN_LENGTH) {
        return `VIN має містити ${VIN_LENGTH} символів`
    }

    if (FORBIDDEN_LETTERS.test(vin)) {
        return 'VIN не містить літер I, O та Q'
    }

    if (!ALLOWED_CHARS.test(vin)) {
        return 'Допустимі лише латинські літери та цифри'
    }

    return null
}
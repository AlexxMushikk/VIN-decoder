export const VARIABLE_IDS = {
    SUGGESTED_VIN: 142,
    ERROR_CODE: 143,
    POSSIBLE_VALUES: 144,
    ADDITIONAL_ERROR_TEXT: 156,
    ERROR_TEXT: 191,
    VEHICLE_DESCRIPTOR: 196,
}

const SERVICE_IDS = Object.values(VARIABLE_IDS)

export function getVehicleDetails(results) {
    return results.filter(
        (item) =>
            item.Value !== null &&
            item.Value !== '' &&
            !SERVICE_IDS.includes(item.VariableId)
    )
}

export function getVariableValue(results, variableId) {
    const item = results.find((item) => item.VariableId === variableId)
    return item ? item.Value : null
}
import { useState } from 'react'
import { validateVin } from '../utils/validateVin'
import './VinForm.css'

function VinForm({ onSubmit }) {
    const [value, setValue] = useState('')
    const [error, setError] = useState(null)

    function handleChange(event) {
        setValue(event.target.value.toUpperCase())
        if (error) {
            setError(null)
        }
    }

    function handleSubmit(event) {
        event.preventDefault()

        const vin = value.trim()
        const validationError = validateVin(vin)
        setError(validationError)

        if (!validationError) {
            onSubmit(vin)
        }
    }

    return (
        <form className="vin-form" onSubmit={handleSubmit} noValidate>
            <label className="vin-form__label" htmlFor="vin">
                VIN-код
            </label>

            <div className="vin-form__row">
                <input
                    className="vin-form__input"
                    id="vin"
                    name="vin"
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder="1FTFW1CT5DFC10312"
                    autoComplete="off"
                    aria-invalid={Boolean(error)}
                    aria-describedb y={error ? 'vin-error' : undefined}
                />
                <button className="vin-form__button" type="submit">
                    Розшифрувати
                </button>
            </div>

            {error && (
                <p className="vin-form__error" id="vin-error" role="alert">
                    {error}
                </p>
            )}
        </form>
    )
}

export default VinForm
import './VinHistory.css'

function VinHistory({ items, onSelect, isLoading }) {
    if (items.length === 0) {
        return null
    }

    return (
        <section className="history">
            <h2 className="history__title">Останні запити</h2>

            <ul className="history__list">
                {items.map((vin) => (
                    <li key={vin}>
                        <button
                            className="history__item"
                            type="button"
                            onClick={() => onSelect(vin)}
                            disabled={isLoading}
                        >
                            {vin}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default VinHistory
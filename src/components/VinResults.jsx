import './VinResults.css'

function VinResults({ items }) {
    return (
        <dl className="vin-results">
            {items.map((item) => (
                <div className="vin-results__row" key={item.VariableId}>
                    <dt className="vin-results__term">{item.Variable}</dt>
                    <dd className="vin-results__value">{item.Value}</dd>
                </div>
            ))}
        </dl>
    )
}

export default VinResults
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useVariables } from '../hooks/useVariables'
import { toPlainText } from '../utils/description'
import './VariablesPage.css'

function VariablesPage() {
    const { variables, isLoading, error } = useVariables()
    const [query, setQuery] = useState('')

    if (isLoading) {
        return <p>Завантаження змінних...</p>
    }

    if (error) {
        return <p className="error">{error}</p>
    }

    const normalizedQuery = query.trim().toLowerCase()

    const filtered = normalizedQuery
        ? variables.filter((item) =>
            item.Name.toLowerCase().includes(normalizedQuery)
        )
        : variables

    return (
        <>
            <h2 className="page-title">Змінні</h2>

            <div className="variables__search">
                <label className="variables__label" htmlFor="variables-search">
                    Пошук за назвою
                </label>
                <input
                    className="variables__input"
                    id="variables-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Make, Engine, Body..."
                    autoComplete="off"
                />
            </div>

            <p className="variables__count">
                Знайдено: {filtered.length} з {variables.length}
            </p>

            {filtered.length > 0 ? (
                <ul className="variables__list">
                    {filtered.map((item) => (
                        <li className="variables__item" key={item.ID}>
                            <Link className="variables__link" to={`/variables/${item.ID}`}>
                                {item.Name}
                            </Link>

                            {item.GroupName && (
                                <span className="variables__group">{item.GroupName}</span>
                            )}

                            <p className="variables__preview">
                                {toPlainText(item.Description)}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Нічого не знайдено</p>
            )}
        </>
    )
}

export default VariablesPage
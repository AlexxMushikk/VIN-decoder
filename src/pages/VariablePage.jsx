import { useParams, Link } from 'react-router-dom'
import { useVariables } from '../hooks/useVariables'
import { sanitizeDescription } from '../utils/description'
import './VariablePage.css'

function VariablePage() {
    const { variableId } = useParams()
    const { variables, isLoading, error } = useVariables()

    if (isLoading) {
        return <p>Завантаження...</p>
    }

    if (error) {
        return <p className="error">{error}</p>
    }

    const variable = variables.find((item) => String(item.ID) === variableId)

    if (!variable) {
        return (
            <>
                <h2 className="page-title">Змінну не знайдено</h2>
                <p>Змінної з ідентифікатором {variableId} не існує.</p>
                <Link to="/variables">Повернутися до списку</Link>
            </>
        )
    }

    const description = sanitizeDescription(variable.Description)

    return (
        <>
            <Link className="variable__back" to="/variables">
                ← До списку змінних
            </Link>

            <h2 className="page-title">{variable.Name}</h2>

            <dl className="variable__meta">
                <div className="variable__row">
                    <dt className="variable__term">ID</dt>
                    <dd className="variable__value">{variable.ID}</dd>
                </div>
                <div className="variable__row">
                    <dt className="variable__term">Тип даних</dt>
                    <dd className="variable__value">{variable.DataType}</dd>
                </div>
                <div className="variable__row">
                    <dt className="variable__term">Група</dt>
                    <dd className="variable__value">{variable.GroupName ?? '—'}</dd>
                </div>
            </dl>

            {description ? (
                <div
                    className="variable__description"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            ) : (
                <p>Опис відсутній</p>
            )}
        </>
    )
}

export default VariablePage
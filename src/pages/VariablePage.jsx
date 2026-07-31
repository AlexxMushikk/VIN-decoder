import { useParams } from 'react-router-dom'

function VariablePage() {
    const { variableId } = useParams()

    return <h2>Змінна {variableId}</h2>
}

export default VariablePage
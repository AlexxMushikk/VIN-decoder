import VinForm from './components/VinForm'
import './App.css'

function App() {
    function handleSubmit(vin) {
        console.log('VIN:', vin)
    }

    return (
        <main className="layout">
            <h1>VIN Decoder</h1>
            <VinForm onSubmit={handleSubmit} />
        </main>
    )
}

export default App
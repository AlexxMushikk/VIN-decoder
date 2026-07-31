import VinForm from './components/VinForm'

function App() {
    function handleSubmit(vin) {
        console.log('VIN:', vin)
    }

    return (
        <main>
            <h1>VIN Decoder</h1>
            <VinForm onSubmit={handleSubmit} />
        </main>
    )
}

export default App
import { Routes, Route, NavLink } from 'react-router-dom'
import HomePage from './pages/HomePage'
import VariablesPage from './pages/VariablesPage'
import VariablePage from './pages/VariablePage'
import './App.css'

function App() {
    return (
        <div className="layout">
            <header className="header">
                <h1 className="header__title">VIN Decoder</h1>
                <nav className="nav">
                    <NavLink className="nav__link" to="/" end>
                        Головна
                    </NavLink>
                    <NavLink className="nav__link" to="/variables">
                        Змінні
                    </NavLink>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/variables" element={<VariablesPage />} />
                    <Route path="/variables/:variableId" element={<VariablePage />} />
                    <Route path="*" element={<p>Сторінку не знайдено</p>} />
                </Routes>
            </main>
        </div>
    )
}

export default App
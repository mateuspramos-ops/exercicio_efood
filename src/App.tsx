import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyle from './styles/GlobalStyle'
import Home from './pages/Home'
import Perfil from './pages/Perfil'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurante/:id" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

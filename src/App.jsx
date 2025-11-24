import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Mustache from './pages/Mustache'
import Handlebars from './pages/Handlebars'
import EJS from './pages/EJS'
import Unlayer from './pages/Unlayer'
import GrapesJS from './pages/GrapesJS'
import './App.css'

function App() {
  return (
    <BrowserRouter basename="/template-engines">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mustache" element={<Mustache />} />
        <Route path="/handlebars" element={<Handlebars />} />
        <Route path="/ejs" element={<EJS />} />
        <Route path="/unlayer" element={<Unlayer />} />
        <Route path="/grapesjs" element={<GrapesJS />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

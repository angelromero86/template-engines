import { NavLink } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/mustache">Mustache</NavLink>
      <NavLink to="/handlebars">Handlebars</NavLink>
      <NavLink to="/ejs">EJS</NavLink>
      <NavLink to="/unlayer">Unlayer</NavLink>
      <NavLink to="/grapesjs">GrapesJS</NavLink>
    </nav>
  )
}

export default Navigation

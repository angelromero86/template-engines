import { useState } from 'react'
import ejs from 'ejs'
import { marked } from 'marked'
import { frames } from './frames'
import './Mustache.css'

function EJS() {
  const [name, setName] = useState('Juan Pérez')
  const [email, setEmail] = useState('juan@example.com')
  const [price, setPrice] = useState('1299.99')
  const [date, setDate] = useState('2024-11-24')
  const [pets, setPets] = useState([
    { name: 'Firulais', type: 'perro' },
    { name: 'Michi', type: 'gato' },
    { name: 'Rex', type: 'perro' }
  ])
  const [agentName, setAgentName] = useState('María García')
  const [corporateName, setCorporateName] = useState('Acme Inc')
  const [communityName, setCommunityName] = useState('Comunidad Jardines del Sol')
  const [selectedFrame, setSelectedFrame] = useState('corporate')
  const [template, setTemplate] = useState(`# Hola <%= name.toUpperCase() %>!

Bienvenido a nuestro sistema. Tu email registrado es: **<%= email %>**

## Información de tu cuenta

- Fecha de registro: <%= new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) %>
- Precio especial: <%= new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price) %>

## Tus mascotas (Total: <%= pets.length %>)

<% pets.forEach(function(pet) { %>
- **<%= pet.name %>** (<%= pet.type %>)
<% }); %>

<% if (pets.length > 2) { %>
¡Vaya! Tienes una gran familia de mascotas.
<% } %>

<% const perros = pets.filter(p => p.type === 'perro'); %>
<% if (perros.length > 0) { %>
Tienes <%= perros.length %> perro<%= perros.length > 1 ? 's' : '' %>.
<% } %>

---

*Gracias por usar nuestro servicio.*`)

  const handlePetChange = (index, field, value) => {
    const newPets = [...pets]
    newPets[index][field] = value
    setPets(newPets)
  }

  const addPet = () => {
    setPets([...pets, { name: '', type: 'perro' }])
  }

  const removePet = (index) => {
    setPets(pets.filter((_, i) => i !== index))
  }

  const addStylesToHtml = (html) => {
    return html
      .replace(/<h1>/g, '<h1 style="color: #1a1a1a; margin-top: 0;">')
      .replace(/<h2>/g, '<h2 style="color: #2a2a2a;">')
      .replace(/<h3>/g, '<h3 style="color: #3a3a3a;">')
      .replace(/<p>/g, '<p style="color: #1a1a1a; line-height: 1.6;">')
      .replace(/<li>/g, '<li style="color: #1a1a1a; margin: 0.3rem 0;">')
      .replace(/<ul>/g, '<ul style="color: #1a1a1a;">')
      .replace(/<ol>/g, '<ol style="color: #1a1a1a;">')
      .replace(/<strong>/g, '<strong style="color: #000000; font-weight: 600;">')
      .replace(/<em>/g, '<em style="color: #2a2a2a;">')
      .replace(/<a /g, '<a style="color: #3b82f6; text-decoration: underline;" ')
  }

  const renderPreview = () => {
    try {
      const data = {
        name,
        email,
        price: parseFloat(price),
        date,
        pets
      }

      const rendered = ejs.render(template, data)
      let html = marked(rendered)
      html = addStylesToHtml(html)

      const frame = frames[selectedFrame]
      const framedHtml = frame.wrapper(html, agentName, corporateName, communityName)

      return { __html: framedHtml }
    } catch (error) {
      return { __html: `<p style="color: red;">Error: ${error.message}</p>` }
    }
  }

  return (
    <div className="page mustache-demo">
      <h1>EJS + Markdown Demo</h1>

      <div className="demo-container">
        <div className="inputs-section">
          <h2>Variables</h2>

          <div className="input-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Precio:</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Fecha:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Mascotas:</label>
            {pets.map((pet, index) => (
              <div key={index} className="pet-row">
                <input
                  type="text"
                  value={pet.name}
                  onChange={(e) => handlePetChange(index, 'name', e.target.value)}
                  placeholder="Nombre"
                  className="pet-name"
                />
                <select
                  value={pet.type}
                  onChange={(e) => handlePetChange(index, 'type', e.target.value)}
                  className="pet-type"
                >
                  <option value="perro">Perro</option>
                  <option value="gato">Gato</option>
                </select>
                <button onClick={() => removePet(index)} className="remove-btn">×</button>
              </div>
            ))}
            <button onClick={addPet} className="add-btn">+ Añadir mascota</button>
          </div>

          <h2>Marco</h2>
          <div className="frame-selector">
            {Object.entries(frames).map(([key, frame]) => (
              <div
                key={key}
                className={`frame-option ${selectedFrame === key ? 'selected' : ''}`}
                onClick={() => setSelectedFrame(key)}
              >
                <div dangerouslySetInnerHTML={{ __html: frame.preview }} />
                <div className="frame-info">
                  <strong>{frame.name}</strong>
                  <small>{frame.description}</small>
                </div>
              </div>
            ))}
          </div>

          {frames[selectedFrame]?.requiresCorporateName && (
            <div className="input-group">
              <label>Nombre de la Empresa:</label>
              <input
                type="text"
                value={corporateName}
                onChange={(e) => setCorporateName(e.target.value)}
                placeholder="Nombre de la empresa"
              />
            </div>
          )}

          {frames[selectedFrame]?.requiresCommunityName && (
            <div className="input-group">
              <label>Nombre de la Comunidad:</label>
              <input
                type="text"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="Nombre de la comunidad"
              />
            </div>
          )}

          {frames[selectedFrame]?.requiresAgent && (
            <div className="input-group">
              <label>Nombre del Agente:</label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Nombre del gestor"
              />
            </div>
          )}

          <h2>Plantilla (Markdown + EJS)</h2>
          <div className="helper-info">
            <p><strong>JavaScript inline:</strong> Usa &lt;%= %&gt; para output y &lt;% %&gt; para lógica</p>
          </div>
          <textarea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            rows={25}
            className="template-editor"
          />
        </div>

        <div className="preview-section">
          <h2>Preview</h2>
          <div
            className="preview-content"
            dangerouslySetInnerHTML={renderPreview()}
          />
        </div>
      </div>
    </div>
  )
}

export default EJS

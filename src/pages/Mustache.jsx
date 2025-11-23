import { useState } from 'react'
import MustacheLib from 'mustache'
import { marked } from 'marked'
import { frames } from './frames'
import './Mustache.css'

function Mustache() {
  const [name, setName] = useState('Juan Pérez')
  const [email, setEmail] = useState('juan@example.com')
  const [pets, setPets] = useState([
    { name: 'Firulais', type: 'perro' },
    { name: 'Michi', type: 'gato' },
    { name: 'Rex', type: 'perro' }
  ])
  const [agentName, setAgentName] = useState('María García')
  const [corporateName, setCorporateName] = useState('Acme Inc')
  const [communityName, setCommunityName] = useState('Comunidad Jardines del Sol')
  const [selectedFrame, setSelectedFrame] = useState('corporate')
  const [template, setTemplate] = useState(`# Hola {{name}}!

Bienvenido a nuestro sistema. Tu email registrado es: **{{email}}**

## Tus mascotas

{{#pets}}
- **{{name}}** ({{type}})
{{/pets}}

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
    // Add inline styles to ensure text is visible
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
        pets
      }

      const rendered = MustacheLib.render(template, data)
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
      <h1>Mustache + Markdown Demo</h1>

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

          <h2>Plantilla (Markdown + Mustache)</h2>
          <textarea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            rows={15}
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

export default Mustache

import { useState } from 'react'
import MustacheLib from 'mustache'
import { marked } from 'marked'
import { frames } from './frames'
import './Mustache.css'

function Mustache() {
  const [name, setName] = useState('Juan Pérez')
  const [email, setEmail] = useState('juan@example.com')
  const [mascotas, setMascotas] = useState('Firulais, Michi, Rex')
  const [agentName, setAgentName] = useState('María García')
  const [selectedFrame, setSelectedFrame] = useState('corporate')
  const [template, setTemplate] = useState(`# Hola {{name}}!

Bienvenido a nuestro sistema. Tu email registrado es: **{{email}}**

## Tus mascotas

{{#pets}}
- {{.}}
{{/pets}}

---

*Gracias por usar nuestro servicio.*`)

  const getPetsArray = () => {
    return mascotas.split(',').map(pet => pet.trim()).filter(pet => pet)
  }

  const renderPreview = () => {
    try {
      const data = {
        name,
        email,
        pets: getPetsArray()
      }

      const rendered = MustacheLib.render(template, data)
      const html = marked(rendered)

      const frame = frames[selectedFrame]
      const framedHtml = frame.wrapper(html, agentName)

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
            <label>Mascotas (separadas por coma):</label>
            <input
              type="text"
              value={mascotas}
              onChange={(e) => setMascotas(e.target.value)}
            />
          </div>

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

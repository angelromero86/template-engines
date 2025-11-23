import { useState } from 'react'
import MustacheLib from 'mustache'
import { marked } from 'marked'
import './Mustache.css'

function Mustache() {
  const [name, setName] = useState('Juan Pérez')
  const [email, setEmail] = useState('juan@example.com')
  const [mascotas, setMascotas] = useState('Firulais, Michi, Rex')
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

      return { __html: html }
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

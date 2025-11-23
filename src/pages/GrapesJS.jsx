import { useRef, useState, useEffect } from 'react'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import gjsPresetNewsletter from 'grapesjs-preset-newsletter'
import { frames } from './frames'
import './GrapesJS.css'

function GrapesJS() {
  const editorRef = useRef(null)
  const [editor, setEditor] = useState(null)
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
  const [showPreview, setShowPreview] = useState(false)
  const [previewHtml, setPreviewHtml] = useState('')

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

  const getFrameHtml = () => {
    const frame = frames[selectedFrame]

    if (selectedFrame === 'corporate') {
      return `
        <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center;" data-gjs-locked="true">
          <div style="background-color: white; width: 60px; height: 60px; margin: 0 auto 15px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <svg width="35" height="35" viewBox="0 0 24 24" fill="#1e3a8a">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
          </div>
          <h1 style="margin: 0; color: white; font-size: 26px; font-weight: 600;">${corporateName || 'Acme Inc'}</h1>
          <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Gestión de Comunidades de Propietarios</p>
        </div>
      `
    } else if (selectedFrame === 'community') {
      return `
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); padding: 25px 30px;" data-gjs-locked="true">
          <div style="display: flex; align-items: center; gap: 15px;">
            <div style="background-color: white; width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="#f59e0b">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div>
              <h2 style="margin: 0; color: white; font-size: 22px; font-weight: 600;">${communityName || 'Tablón de la Comunidad'}</h2>
              <p style="margin: 5px 0 0 0; color: rgba(255,255,255,0.95); font-size: 13px;">Información para todos los vecinos</p>
            </div>
          </div>
        </div>
      `
    } else if (selectedFrame === 'agent') {
      return `
        <div style="padding: 25px 30px; background: linear-gradient(to right, #ecfdf5 0%, #ffffff 100%);" data-gjs-locked="true">
          <div style="display: flex; align-items: center; gap: 15px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 22px; font-weight: bold;">
              ${agentName ? agentName.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <p style="margin: 0; color: #10b981; font-size: 12px; font-weight: 600; text-transform: uppercase;">Tu gestor personal</p>
              <h3 style="margin: 5px 0 0 0; color: #065f46; font-size: 20px; font-weight: 600;">${agentName || 'Agente Gestor'}</h3>
            </div>
          </div>
        </div>
      `
    }
  }

  const getFooterHtml = () => {
    if (selectedFrame === 'corporate') {
      return `
        <div style="background-color: #f8f9fa; padding: 25px 30px; text-align: center;" data-gjs-locked="true">
          <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px;">Este es un mensaje oficial de ${corporateName || 'Acme Inc'}</p>
          <p style="margin: 0; color: #9ca3af; font-size: 11px;">© 2024 ${corporateName || 'Acme Inc'} - Gestión de Comunidades</p>
        </div>
      `
    } else if (selectedFrame === 'community') {
      return `
        <div style="background-color: #fffbeb; padding: 20px 30px;" data-gjs-locked="true">
          <p style="margin: 0; color: #92400e; font-size: 13px; text-align: center;">
            📢 Mensaje compartido con ${communityName || 'la comunidad de propietarios'}
          </p>
        </div>
      `
    } else if (selectedFrame === 'agent') {
      return `
        <div style="background-color: #f0fdf4; padding: 20px 30px;" data-gjs-locked="true">
          <p style="margin: 0; color: #065f46; font-size: 12px;">
            💬 Mensaje personal de <strong>${agentName || 'tu gestor'}</strong>
          </p>
          <p style="margin: 8px 0 0 0; color: #10b981; font-size: 11px;">
            Si tienes alguna duda, no dudes en contactarme
          </p>
        </div>
      `
    }
  }

  useEffect(() => {
    if (!editorRef.current) return

    const editorInstance = grapesjs.init({
      container: editorRef.current,
      height: '100%',
      width: 'auto',
      plugins: [gjsPresetNewsletter],
      pluginsOpts: {
        [gjsPresetNewsletter]: {}
      },
      storageManager: false,
      canvas: {
        styles: ['https://fonts.googleapis.com/css?family=Roboto:400,700']
      }
    })

    // Set initial content with locked frames
    const headerHtml = getFrameHtml()
    const footerHtml = getFooterHtml()

    editorInstance.setComponents(`
      <table style="width: 100%; max-width: 650px; margin: 0 auto; font-family: Arial, sans-serif;">
        <tr>
          <td id="locked-header">${headerHtml}</td>
        </tr>
        <tr>
          <td style="padding: 35px 30px;">
            <h1>Hola {{name}}!</h1>
            <p>Bienvenido a nuestro sistema. Tu email registrado es: <strong>{{email}}</strong></p>
            <h2>Tus mascotas</h2>
            <p>• <strong>{{pets.0.name}}</strong> ({{pets.0.type}})</p>
            <p>• <strong>{{pets.1.name}}</strong> ({{pets.1.type}})</p>
            <p>• <strong>{{pets.2.name}}</strong> ({{pets.2.type}})</p>
            <hr>
            <p><em>Gracias por usar nuestro servicio.</em></p>
          </td>
        </tr>
        <tr>
          <td id="locked-footer">${footerHtml}</td>
        </tr>
      </table>
    `)

    // Lock the header and footer components
    editorInstance.on('component:add', (component) => {
      const parent = component.parent()
      if (parent && (parent.getId() === 'locked-header' || parent.getId() === 'locked-footer')) {
        component.set({
          removable: false,
          draggable: false,
          droppable: false,
          editable: false,
          selectable: false,
          hoverable: false,
          locked: true
        })
      }
    })

    // Find and lock header/footer after load
    setTimeout(() => {
      const header = editorInstance.getWrapper().find('#locked-header')[0]
      const footer = editorInstance.getWrapper().find('#locked-footer')[0]

      if (header) {
        header.set({
          removable: false,
          draggable: false,
          droppable: false,
          copyable: false,
          locked: true
        })
        header.view?.el?.classList?.add('gjs-locked')
      }

      if (footer) {
        footer.set({
          removable: false,
          draggable: false,
          droppable: false,
          copyable: false,
          locked: true
        })
        footer.view?.el?.classList?.add('gjs-locked')
      }
    }, 100)

    setEditor(editorInstance)

    return () => {
      editorInstance.destroy()
    }
  }, [])

  // Update frames when parameters change
  useEffect(() => {
    if (!editor) return

    const headerHtml = getFrameHtml()
    const footerHtml = getFooterHtml()

    const header = editor.getWrapper().find('#locked-header')[0]
    const footer = editor.getWrapper().find('#locked-footer')[0]

    if (header) {
      header.components(headerHtml)
    }
    if (footer) {
      footer.components(footerHtml)
    }
  }, [selectedFrame, corporateName, communityName, agentName, editor])

  const exportHtml = () => {
    if (!editor) return

    let html = editor.getHtml()
    let css = editor.getCss()

    // Replace merge tags
    html = html.replace(/\{\{name\}\}/g, name)
    html = html.replace(/\{\{email\}\}/g, email)

    pets.forEach((pet, index) => {
      html = html.replace(new RegExp(`\\{\\{pets\\.${index}\\.name\\}\\}`, 'g'), pet.name)
      html = html.replace(new RegExp(`\\{\\{pets\\.${index}\\.type\\}\\}`, 'g'), pet.type)
    })

    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>${html}</body>
      </html>
    `

    setPreviewHtml(fullHtml)
    setShowPreview(true)
  }

  const saveDesign = () => {
    if (!editor) return

    const html = editor.getHtml()
    const css = editor.getCss()
    console.log('HTML:', html)
    console.log('CSS:', css)
    alert('Diseño guardado en la consola')
  }

  return (
    <div className="grapesjs-demo">
      <div className="grapesjs-header">
        <h1>GrapesJS Email Editor Demo</h1>
        <div className="grapesjs-actions">
          <button onClick={exportHtml} className="preview-btn">Ver Preview</button>
          <button onClick={saveDesign} className="save-btn">Guardar Diseño</button>
        </div>
      </div>

      <div className="grapesjs-container">
        <div className="grapesjs-sidebar">
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
        </div>

        <div className="grapesjs-editor" ref={editorRef}></div>
      </div>

      {showPreview && (
        <div className="preview-modal" onClick={() => setShowPreview(false)}>
          <div className="preview-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="preview-modal-header">
              <h2>Preview del Email</h2>
              <button onClick={() => setShowPreview(false)} className="close-btn">×</button>
            </div>
            <div
              className="preview-modal-body"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default GrapesJS

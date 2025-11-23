import { useRef, useState, useEffect } from 'react'
import EmailEditor from 'react-email-editor'
import { frames } from './frames'
import './Unlayer.css'

function Unlayer() {
  const emailEditorRef = useRef(null)
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

  // Reload design when frame or frame params change
  useEffect(() => {
    if (emailEditorRef.current?.editor) {
      // Save current design first
      emailEditorRef.current.editor.saveDesign((currentDesign) => {
        const frameDesign = getFrameDesign()

        // Update only header and footer, keep content
        const updatedDesign = {
          ...currentDesign,
          body: {
            ...currentDesign.body,
            rows: [
              // New header
              {
                ...frameDesign.header,
                _meta: {
                  selectable: false,
                  draggable: false,
                  duplicatable: false,
                  deletable: false,
                  hideable: false,
                  locked: true
                }
              },
              // Keep existing content rows (skip old header/footer)
              ...currentDesign.body.rows.slice(1, -1),
              // New footer
              {
                ...frameDesign.footer,
                _meta: {
                  selectable: false,
                  draggable: false,
                  duplicatable: false,
                  deletable: false,
                  hideable: false,
                  locked: true
                }
              }
            ]
          }
        }

        emailEditorRef.current.editor.loadDesign(updatedDesign)
      })
    }
  }, [selectedFrame, corporateName, communityName, agentName])

  const getFrameDesign = () => {
    const frame = frames[selectedFrame]
    const frameName = frame.name

    // Corporate frame design
    if (selectedFrame === 'corporate') {
      return {
        header: {
          cells: [1],
          columns: [{
            contents: [{
              type: 'html',
              values: {
                html: `<div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center;">
                  <div style="background-color: white; width: 60px; height: 60px; margin: 0 auto 15px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="#1e3a8a">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                  </div>
                  <h1 style="margin: 0; color: white; font-size: 26px; font-weight: 600;">${corporateName || 'Acme Inc'}</h1>
                  <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Gestión de Comunidades de Propietarios</p>
                </div>`,
                containerPadding: '0px'
              }
            }]
          }]
        },
        footer: {
          cells: [1],
          columns: [{
            contents: [{
              type: 'html',
              values: {
                html: `<div style="background-color: #f8f9fa; padding: 25px 30px; text-align: center;">
                  <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px;">Este es un mensaje oficial de ${corporateName || 'Acme Inc'}</p>
                  <p style="margin: 0; color: #9ca3af; font-size: 11px;">© 2024 ${corporateName || 'Acme Inc'} - Gestión de Comunidades</p>
                </div>`,
                containerPadding: '0px'
              }
            }]
          }]
        }
      }
    }

    // Community frame design
    if (selectedFrame === 'community') {
      return {
        header: {
          cells: [1],
          columns: [{
            contents: [{
              type: 'html',
              values: {
                html: `<div style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); padding: 25px 30px;">
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
                </div>`,
                containerPadding: '0px'
              }
            }]
          }]
        },
        footer: {
          cells: [1],
          columns: [{
            contents: [{
              type: 'html',
              values: {
                html: `<div style="background-color: #fffbeb; padding: 20px 30px;">
                  <p style="margin: 0; color: #92400e; font-size: 13px; text-align: center;">
                    📢 Mensaje compartido con ${communityName || 'la comunidad de propietarios'}
                  </p>
                </div>`,
                containerPadding: '0px'
              }
            }]
          }]
        }
      }
    }

    // Agent frame design
    if (selectedFrame === 'agent') {
      return {
        header: {
          cells: [1],
          columns: [{
            contents: [{
              type: 'html',
              values: {
                html: `<div style="padding: 25px 30px; background: linear-gradient(to right, #ecfdf5 0%, #ffffff 100%);">
                  <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 22px; font-weight: bold;">
                      ${agentName ? agentName.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div>
                      <p style="margin: 0; color: #10b981; font-size: 12px; font-weight: 600; text-transform: uppercase;">Tu gestor personal</p>
                      <h3 style="margin: 5px 0 0 0; color: #065f46; font-size: 20px; font-weight: 600;">${agentName || 'Agente Gestor'}</h3>
                    </div>
                  </div>
                </div>`,
                containerPadding: '0px'
              }
            }]
          }]
        },
        footer: {
          cells: [1],
          columns: [{
            contents: [{
              type: 'html',
              values: {
                html: `<div style="background-color: #f0fdf4; padding: 20px 30px;">
                  <p style="margin: 0; color: #065f46; font-size: 12px;">
                    💬 Mensaje personal de <strong>${agentName || 'tu gestor'}</strong>
                  </p>
                  <p style="margin: 8px 0 0 0; color: #10b981; font-size: 11px;">
                    Si tienes alguna duda, no dudes en contactarme
                  </p>
                </div>`,
                containerPadding: '0px'
              }
            }]
          }]
        }
      }
    }
  }

  const onReady = () => {
    const frameDesign = getFrameDesign()

    // Load default template with frame
    const defaultDesign = {
      body: {
        rows: [
          // HEADER (locked)
          {
            ...frameDesign.header,
            _meta: {
              selectable: false,
              draggable: false,
              duplicatable: false,
              deletable: false,
              hideable: false,
              locked: true
            }
          },
          // CONTENT (editable)
          {
            cells: [1],
            columns: [{
              contents: [{
                type: 'heading',
                values: {
                  text: 'Hola {{name}}!',
                  headingType: 'h1',
                  fontFamily: { label: 'Arial', value: 'arial,helvetica,sans-serif' },
                  fontSize: '28px',
                  textAlign: 'left',
                  lineHeight: '140%',
                  padding: '10px'
                }
              }]
            }]
          },
          {
            cells: [1],
            columns: [{
              contents: [{
                type: 'text',
                values: {
                  text: '<p>Bienvenido a nuestro sistema. Tu email registrado es: <strong>{{email}}</strong></p>',
                  fontFamily: { label: 'Arial', value: 'arial,helvetica,sans-serif' },
                  fontSize: '14px',
                  textAlign: 'left',
                  lineHeight: '140%',
                  padding: '10px'
                }
              }]
            }]
          },
          {
            cells: [1],
            columns: [{
              contents: [{
                type: 'heading',
                values: {
                  text: 'Tus mascotas',
                  headingType: 'h2',
                  fontFamily: { label: 'Arial', value: 'arial,helvetica,sans-serif' },
                  fontSize: '22px',
                  textAlign: 'left',
                  lineHeight: '140%',
                  padding: '10px'
                }
              }]
            }]
          },
          {
            cells: [1],
            columns: [{
              contents: [{
                type: 'text',
                values: {
                  text: '<p>• <strong>{{pets.0.name}}</strong> ({{pets.0.type}})</p><p>• <strong>{{pets.1.name}}</strong> ({{pets.1.type}})</p><p>• <strong>{{pets.2.name}}</strong> ({{pets.2.type}})</p>',
                  fontFamily: { label: 'Arial', value: 'arial,helvetica,sans-serif' },
                  fontSize: '14px',
                  textAlign: 'left',
                  lineHeight: '140%',
                  padding: '10px'
                }
              }]
            }]
          },
          {
            cells: [1],
            columns: [{
              contents: [{
                type: 'divider',
                values: { padding: '20px 10px' }
              }]
            }]
          },
          {
            cells: [1],
            columns: [{
              contents: [{
                type: 'text',
                values: {
                  text: '<p><em>Gracias por usar nuestro servicio.</em></p>',
                  fontFamily: { label: 'Arial', value: 'arial,helvetica,sans-serif' },
                  fontSize: '12px',
                  textAlign: 'center',
                  lineHeight: '140%',
                  padding: '10px'
                }
              }]
            }]
          },
          // FOOTER (locked)
          {
            ...frameDesign.footer,
            _meta: {
              selectable: false,
              draggable: false,
              duplicatable: false,
              deletable: false,
              hideable: false,
              locked: true
            }
          }
        ]
      }
    }

    emailEditorRef.current?.editor?.loadDesign(defaultDesign)

    // Set up merge tags
    const mergeTags = {
      name: {
        name: 'Nombre',
        value: '{{name}}',
        sample: name
      },
      email: {
        name: 'Email',
        value: '{{email}}',
        sample: email
      }
    }

    // Add pet merge tags
    pets.forEach((pet, index) => {
      mergeTags[`pet_${index}_name`] = {
        name: `Mascota ${index + 1} - Nombre`,
        value: `{{pets.${index}.name}}`,
        sample: pet.name
      }
      mergeTags[`pet_${index}_type`] = {
        name: `Mascota ${index + 1} - Tipo`,
        value: `{{pets.${index}.type}}`,
        sample: pet.type
      }
    })

    emailEditorRef.current?.editor?.setMergeTags(mergeTags)
  }

  const exportHtml = () => {
    emailEditorRef.current?.editor?.exportHtml((data) => {
      const { html } = data

      // Replace merge tags with actual values
      let processedHtml = html
      processedHtml = processedHtml.replace(/\{\{name\}\}/g, name)
      processedHtml = processedHtml.replace(/\{\{email\}\}/g, email)

      // Replace pet merge tags
      pets.forEach((pet, index) => {
        processedHtml = processedHtml.replace(new RegExp(`\\{\\{pets\\.${index}\\.name\\}\\}`, 'g'), pet.name)
        processedHtml = processedHtml.replace(new RegExp(`\\{\\{pets\\.${index}\\.type\\}\\}`, 'g'), pet.type)
      })

      // Frame is already in the design, no need to wrap
      setPreviewHtml(processedHtml)
      setShowPreview(true)
    })
  }

  const saveDesign = () => {
    emailEditorRef.current?.editor?.saveDesign((design) => {
      console.log('Design saved:', design)
      alert('Diseño guardado en la consola')
    })
  }

  return (
    <div className="unlayer-demo">
      <div className="unlayer-header">
        <h1>Unlayer Email Editor Demo</h1>
        <div className="unlayer-actions">
          <button onClick={exportHtml} className="preview-btn">Ver Preview</button>
          <button onClick={saveDesign} className="save-btn">Guardar Diseño</button>
        </div>
      </div>

      <div className="unlayer-container">
        <div className="unlayer-sidebar">
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

          <div className="merge-tags-info">
            <h3>Variables disponibles:</h3>
            <ul>
              <li><code>{'{{name}}'}</code> - Nombre</li>
              <li><code>{'{{email}}'}</code> - Email</li>
              {pets.map((pet, index) => (
                <li key={index}>
                  <code>{`{{pets.${index}.name}}`}</code> y <code>{`{{pets.${index}.type}}`}</code>
                </li>
              ))}
            </ul>
            <p className="hint">Arrastra "Merge Tags" desde el panel lateral del editor para usar estas variables.</p>
          </div>
        </div>

        <div className="unlayer-editor">
          <EmailEditor
            ref={emailEditorRef}
            onReady={onReady}
            minHeight="600px"
          />
        </div>
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

export default Unlayer

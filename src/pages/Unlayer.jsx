import { useRef, useState } from 'react'
import EmailEditor from 'react-email-editor'
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

  const onReady = () => {
    // Editor is ready
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

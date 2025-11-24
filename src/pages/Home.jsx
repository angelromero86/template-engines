function Home() {
  return (
    <div className="page">
      <h1>Template Engines Demo</h1>
      <p>Este es un experimento para explorar diferentes motores de plantillas y editores de email.</p>

      <div style={{ marginTop: '2rem' }}>
        <h2>Mustache</h2>
        <p>Motor de plantillas logic-less que permite renderizar HTML con sintaxis simple de llaves dobles. Ideal para separar lógica de presentación y soporta iteraciones, condicionales y partials.</p>

        <h3>Pros</h3>
        <ul>
          <li>Es open source per sé, no una empresa que usa el opensource como herramienta de captar leads</li>
          <li>Es muy simple</li>
          <li>Soporta arrays</li>
          <li>Gratuito</li>
          <li>Long term support, riesgo bajo de cambios disruptivos (15 años)</li>
          <li>Menos pesado en el navegador del cliente</li>
        </ul>

        <h3>Contras</h3>
        <ul>
          <li>El cliente no edita en la preview, sino en un editor externo (aunque podríamos integrarlo)</li>
          <li>Edición markdown (como cara positiva, es muy simple y quizá sea mejor para el usuario)</li>
          <li>Para JavaScript específicamente, hay alternativas más populares y activas (Handlebars, EJS, Pug)</li>
        </ul>

        <h2>Handlebars</h2>
        <p>Extensión de Mustache que añade helpers personalizados y características avanzadas. Mantiene la filosofía logic-less pero permite formatear datos directamente en las plantillas mediante funciones auxiliares.</p>

        <h3>Pros</h3>
        <ul>
          <li>Helpers personalizados (formatDate, currency, uppercase, etc.) sin pre-procesamiento</li>
          <li>Sintaxis más rica que Mustache (else if, unless, etc.)</li>
          <li>Mantiene la separación lógica/presentación</li>
          <li>Más popular y activo que Mustache en JavaScript</li>
          <li>Compatible con plantillas Mustache básicas</li>
          <li>Open source y gratuito</li>
        </ul>

        <h3>Contras</h3>
        <ul>
          <li>Ligeramente más pesado que Mustache</li>
          <li>Curva de aprendizaje mayor (helpers, partials avanzados)</li>
          <li>El cliente no edita en la preview, sino en un editor externo</li>
          <li>Puede llevar a mezclar lógica en plantillas si no se usa con disciplina</li>
        </ul>

        <h2>EJS (Embedded JavaScript)</h2>
        <p>Motor de plantillas que permite JavaScript directo en las plantillas. Máxima flexibilidad para ejecutar código, funciones nativas y lógica compleja durante el renderizado.</p>

        <h3>Pros</h3>
        <ul>
          <li>JavaScript nativo en plantillas (si sabes JS, sabes EJS)</li>
          <li>Máxima flexibilidad para lógica compleja</li>
          <li>Sin necesidad de helpers personalizados</li>
          <li>Sintaxis familiar para desarrolladores JavaScript</li>
          <li>Open source y gratuito</li>
        </ul>

        <h3>Contras</h3>
        <ul>
          <li>Pierde la simplicidad de Mustache</li>
          <li>Mezcla lógica y presentación (puede volverse difícil de mantener)</li>
          <li>Requiere conocimiento de JavaScript para editar plantillas</li>
          <li>El cliente no edita en la preview, sino en un editor externo</li>
          <li>Más propenso a errores de sintaxis en plantillas</li>
        </ul>

        <h2>Unlayer</h2>
        <p>Editor visual de emails drag-and-drop con soporte para merge tags. Perfecto para diseñar newsletters responsive sin escribir código, aunque limitado en loops y lógica compleja.</p>

        <h3>Pros</h3>
        <ul>
          <li>Edición HTML</li>
        </ul>

        <h3>Contras</h3>
        <ul>
          <li>La capa gratuita es muy fina y casi es obligado pagar</li>
          <li>Experiencia pesada del lado del agente</li>
          <li>Acoplamiento a un tercero</li>
        </ul>

        <h2>GrapesJS</h2>
        <p>Framework de construcción de páginas web altamente personalizable. Ofrece edición visual avanzada con bloques personalizados, estilos en tiempo real y exportación de HTML/CSS limpio.</p>

        <h3>Pros</h3>
        <ul>
          <li>Edición HTML</li>
          <li>Más features free que Unlayer</li>
          <li>Bloquea la edición del marco (protege elementos corporativos)</li>
        </ul>

        <h3>Contras</h3>
        <ul>
          <li>Acoplamiento a un tercero</li>
          <li>Experiencia pesada del lado del agente</li>
          <li>Finalmente es probable que haya que pasar por caja</li>
        </ul>
      </div>
    </div>
  )
}

export default Home

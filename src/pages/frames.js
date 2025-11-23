export const frames = {
  simple: {
    name: 'Simple',
    description: 'Marco básico sin decoración',
    wrapper: (content) => `
      <div style="padding: 20px; max-width: 800px;">
        ${content}
      </div>
    `,
    preview: `
      <div style="padding: 10px; border: 2px solid #666; border-radius: 4px; font-size: 0.7em;">
        <div style="margin-bottom: 5px; font-weight: bold;">Simple Frame</div>
        <div style="color: #888;">Clean and minimal</div>
      </div>
    `
  },

  email: {
    name: 'Email',
    description: 'Estilo de email profesional',
    wrapper: (content) => `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: -30px -30px 20px -30px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; color: white; font-size: 24px;">Mi Empresa</h2>
          </div>
          ${content}
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #888; font-size: 12px;">
            <p>© 2024 Mi Empresa. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    `,
    preview: `
      <div style="padding: 10px; border: 2px solid #667eea; border-radius: 4px; font-size: 0.7em; background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);">
        <div style="margin-bottom: 5px; font-weight: bold;">Email Frame</div>
        <div style="color: #888;">Professional email style</div>
      </div>
    `
  },

  newsletter: {
    name: 'Newsletter',
    description: 'Diseño de boletín informativo',
    wrapper: (content) => `
      <div style="max-width: 700px; margin: 0 auto; font-family: Georgia, serif; background-color: #fafafa;">
        <div style="background-color: #2c3e50; color: white; padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px; letter-spacing: 2px;">NEWSLETTER</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Tu dosis semanal de información</p>
        </div>
        <div style="background-color: white; padding: 40px 30px;">
          ${content}
        </div>
        <div style="background-color: #34495e; color: white; padding: 30px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            ¿No quieres recibir más emails?
            <a href="#" style="color: #3498db; text-decoration: none;">Darse de baja</a>
          </p>
        </div>
      </div>
    `,
    preview: `
      <div style="padding: 10px; border: 2px solid #2c3e50; border-radius: 4px; font-size: 0.7em; background-color: #34495e; color: white;">
        <div style="margin-bottom: 5px; font-weight: bold;">Newsletter Frame</div>
        <div style="color: #bbb;">Informative bulletin style</div>
      </div>
    `
  }
}

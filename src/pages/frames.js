export const frames = {
  corporate: {
    name: 'Corporativo',
    description: 'Comunicación oficial de la empresa',
    requiresAgent: false,
    wrapper: (content, agentName) => `
      <div style="max-width: 650px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center;">
            <div style="background-color: white; width: 60px; height: 60px; margin: 0 auto 15px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <svg width="35" height="35" viewBox="0 0 24 24" fill="#1e3a8a">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <h1 style="margin: 0; color: white; font-size: 26px; font-weight: 600;">Comunidad de Propietarios</h1>
            <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Comunicación oficial</p>
          </div>
          <div style="padding: 35px 30px;">
            ${content}
          </div>
          <div style="background-color: #f8f9fa; padding: 25px 30px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px;">Este es un mensaje oficial de su comunidad de propietarios</p>
            <p style="margin: 0; color: #9ca3af; font-size: 11px;">© 2024 Gestión de Comunidades</p>
          </div>
        </div>
      </div>
    `,
    preview: `
      <div style="padding: 10px; border: 2px solid #1e3a8a; border-radius: 4px; font-size: 0.7em; background: linear-gradient(135deg, #1e3a8a20 0%, #3b82f620 100%);">
        <div style="margin-bottom: 5px; font-weight: bold; color: #1e3a8a;">Corporativo</div>
        <div style="color: #666; font-size: 0.9em;">Oficial de la empresa</div>
      </div>
    `
  },

  community: {
    name: 'Comunidad',
    description: 'Comunicación entre vecinos',
    requiresAgent: false,
    wrapper: (content, agentName) => `
      <div style="max-width: 680px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #fefce8; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 2px solid #fbbf24;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); padding: 25px 30px;">
            <div style="display: flex; align-items: center; gap: 15px;">
              <div style="background-color: white; width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#f59e0b">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div>
                <h2 style="margin: 0; color: white; font-size: 22px; font-weight: 600;">Tablón de la Comunidad</h2>
                <p style="margin: 5px 0 0 0; color: rgba(255,255,255,0.95); font-size: 13px;">Información para todos los vecinos</p>
              </div>
            </div>
          </div>
          <div style="padding: 30px;">
            ${content}
          </div>
          <div style="background-color: #fffbeb; padding: 20px 30px; border-top: 2px solid #fef3c7;">
            <p style="margin: 0; color: #92400e; font-size: 13px; text-align: center;">
              📢 Mensaje compartido con toda la comunidad de propietarios
            </p>
          </div>
        </div>
      </div>
    `,
    preview: `
      <div style="padding: 10px; border: 2px solid #f59e0b; border-radius: 4px; font-size: 0.7em; background: linear-gradient(135deg, #f59e0b20 0%, #fbbf2420 100%);">
        <div style="margin-bottom: 5px; font-weight: bold; color: #f59e0b;">Comunidad</div>
        <div style="color: #666; font-size: 0.9em;">Entre vecinos</div>
      </div>
    `
  },

  agent: {
    name: 'Agente Personal',
    description: 'Mensaje de tu gestor asignado',
    requiresAgent: true,
    wrapper: (content, agentName) => `
      <div style="max-width: 600px; margin: 0 auto; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f0fdf4; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07); border-left: 4px solid #10b981;">
          <div style="padding: 25px 30px; background: linear-gradient(to right, #ecfdf5 0%, #ffffff 100%);">
            <div style="display: flex; align-items: center; gap: 15px;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 22px; font-weight: bold; box-shadow: 0 2px 4px rgba(16,185,129,0.3);">
                ${agentName ? agentName.charAt(0).toUpperCase() : 'A'}
              </div>
              <div>
                <p style="margin: 0; color: #10b981; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Tu gestor personal</p>
                <h3 style="margin: 5px 0 0 0; color: #065f46; font-size: 20px; font-weight: 600;">${agentName || 'Agente Gestor'}</h3>
              </div>
            </div>
          </div>
          <div style="padding: 30px;">
            ${content}
          </div>
          <div style="background-color: #f0fdf4; padding: 20px 30px; border-top: 1px solid #d1fae5;">
            <p style="margin: 0; color: #065f46; font-size: 12px;">
              💬 Mensaje personal de <strong>${agentName || 'tu gestor'}</strong>
            </p>
            <p style="margin: 8px 0 0 0; color: #10b981; font-size: 11px;">
              Si tienes alguna duda, no dudes en contactarme
            </p>
          </div>
        </div>
      </div>
    `,
    preview: `
      <div style="padding: 10px; border: 2px solid #10b981; border-radius: 4px; font-size: 0.7em; background: linear-gradient(135deg, #10b98120 0%, #34d39920 100%);">
        <div style="margin-bottom: 5px; font-weight: bold; color: #10b981;">Agente Personal</div>
        <div style="color: #666; font-size: 0.9em;">De tu gestor</div>
      </div>
    `
  }
}

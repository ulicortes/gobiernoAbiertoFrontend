'use server'

import { Resend } from 'resend';

// Correo destino — modificar aquí si cambia en el futuro
const TEST_EMAIL = 'belenfernandezgayral@gmail.com';
const RECIPIENT_EMAIL = TEST_EMAIL;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: FormData) {
  const name = (formData.get('name') as string)?.trim() ?? '';
  const message = (formData.get('message') as string)?.trim() ?? '';
  const phone = (formData.get('phone') as string)?.trim() ?? '';
  const subscribeRaw = formData.get('subscribe');
  const whatsapp =
    subscribeRaw === 'on' ||
    subscribeRaw === 'true' ||
    subscribeRaw === '1';

  if (!message) {
    throw new Error('Faltan campos obligatorios del formulario de contacto.');
  }

  const { error } = await resend.emails.send({
    from: 'Portal Abierto Lobería <onboarding@resend.dev>',
    to: [RECIPIENT_EMAIL],
    subject: `Nuevo mensaje de contacto — ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #4C9734; border-bottom: 1px solid #badabb; padding-bottom: 12px;">
          Nuevo mensaje desde el Portal Abierto
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #4C9734;">Nombre:</td>
            <td style="padding: 8px 0;">${name || 'No informado'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4C9734;">WhatsApp:</td>
            <td style="padding: 8px 0;">${whatsapp ? 'Sí' : 'No'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4C9734;">Telefono:</td>
            <td style="padding: 8px 0;">${phone || 'No informado'}</td>
          </tr>
        </table>
        <div style="background:rgb(246, 251, 246); border-left: 3px solid #4C9734; padding: 16px 20px; border-radius: 0 4px 4px 0;">
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    throw new Error('No se pudo enviar el correo. Por favor intentá de nuevo.');
  }

  return { success: true };
}
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function contactApiDevPlugin(): Plugin {
  return {
    name: 'contact-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method === 'POST') {
          let bodyStr = ''
          req.on('data', (chunk) => {
            bodyStr += chunk
          })
          req.on('end', async () => {
            res.setHeader('Content-Type', 'application/json')
            try {
              const body = JSON.parse(bodyStr || '{}')
              const { name, email, message } = body

              if (!name || !email) {
                res.statusCode = 400
                res.end(JSON.stringify({ error: 'Name and email are required' }))
                return
              }

              const apiKey = process.env.RESEND_API_KEY
              const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'Kmai.tech.support@gmail.com'
              const fromEmail = process.env.RESEND_FROM_EMAIL || 'KMAI Studio <onboarding@resend.dev>'

              if (apiKey) {
                const resendResponse = await fetch('https://api.resend.com/emails', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    from: fromEmail,
                    to: [recipientEmail],
                    reply_to: email,
                    subject: `[KMAI Project Inquiry] ${name}`,
                    text: `Name: ${name}\nEmail: ${email}\n\nProject Scope & Message:\n${message || '(No scope details provided)'}`,
                  }),
                })
                const data = await resendResponse.json().catch(() => ({}))
                res.statusCode = resendResponse.status
                res.end(JSON.stringify(data))
              } else {
                console.log(`[Dev Contact API] Mock inquiry received from ${name} (${email}): ${message}`)
                res.statusCode = 200
                res.end(JSON.stringify({ success: true, message: 'Inquiry received in dev mode' }))
              }
            } catch (err) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: 'Invalid request body' }))
            }
          })
        } else {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method Not Allowed' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), contactApiDevPlugin()],
})

import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const TO_EMAIL = 'csurjawan@gmail.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { guestId, guestName, whatsapp, attendance, numberOfGuests, wishes } = await req.json()

    if (!guestId) {
      return new Response(JSON.stringify({ error: 'guestId is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Generate QR code PNG via qrserver.com (no Deno npm needed)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(guestId)}&format=png&margin=10`
    const qrRes = await fetch(qrUrl)
    if (!qrRes.ok) throw new Error('Failed to generate QR code')

    const qrBuffer = await qrRes.arrayBuffer()
    // Convert ArrayBuffer to base64
    const bytes = new Uint8Array(qrBuffer)
    let binary = ''
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    const qrBase64 = btoa(binary)

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'RSVP Wedding <onboarding@resend.dev>',
        to: [TO_EMAIL],
        subject: 'RSVP Wedding',
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #3b2608;">
            <h2 style="color: #a06820;">New RSVP Received</h2>
            <table style="border-collapse: collapse; width: 100%;">
              <tr><td style="padding: 6px 0; font-weight: bold; width: 160px;">Name</td><td>${guestName}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">WhatsApp</td><td>${whatsapp || '-'}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Attendance</td><td>${attendance}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Number of Guests</td><td>${numberOfGuests}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Wishes</td><td>${wishes || '-'}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Guest ID</td><td style="font-size: 0.85em; color: #888;">${guestId}</td></tr>
            </table>
            <p style="margin-top: 20px; color: #666; font-size: 0.9em;">QR Code for this guest is attached.</p>
          </div>
        `,
        attachments: [
          {
            filename: `qrcode-${guestId}.png`,
            content: qrBase64,
          },
        ],
      }),
    })

    if (!emailRes.ok) {
      const errText = await emailRes.text()
      throw new Error(`Resend error: ${errText}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('send-rsvp-email error:', error)
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

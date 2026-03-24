import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, company, email, friction } = await req.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 422 }
      )
    }

    // Email to the business owner
    await resend.emails.send({
      from: 'African Creators <onboarding@resend.dev>',
      to: ['hello@africancreators.online'],
      subject: `New Audit Request — ${company || 'Unknown Company'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #050505; color: #FDFCF0; padding: 40px; border-radius: 12px;">
          <div style="border-left: 4px solid #C5A059; padding-left: 20px; margin-bottom: 32px;">
            <h1 style="font-size: 24px; margin: 0 0 8px; color: #C5A059;">New Audit Request</h1>
            <p style="margin: 0; color: #8C8C82; font-size: 14px;">Someone wants to reclaim their margin.</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #262626;">
              <td style="padding: 16px 0; color: #8C8C82; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 40%;">Principal Name</td>
              <td style="padding: 16px 0; font-size: 15px; font-weight: 600;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #262626;">
              <td style="padding: 16px 0; color: #8C8C82; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Enterprise</td>
              <td style="padding: 16px 0; font-size: 15px; font-weight: 600;">${company || '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #262626;">
              <td style="padding: 16px 0; color: #8C8C82; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Digital Address</td>
              <td style="padding: 16px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #C5A059;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 16px 0; color: #8C8C82; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Primary Friction</td>
              <td style="padding: 16px 0; font-size: 15px; font-weight: 600;">${friction || '—'}</td>
            </tr>
          </table>

          <div style="margin-top: 40px; padding: 20px; background: #0F0F0F; border-radius: 8px; border: 1px solid #262626;">
            <p style="margin: 0; font-size: 12px; color: #8C8C82; text-align: center; letter-spacing: 0.1em; text-transform: uppercase;">
              Reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
      replyTo: email,
    })

    // Confirmation email to the person who submitted
    await resend.emails.send({
      from: 'African Creators <onboarding@resend.dev>',
      to: [email],
      subject: 'We received your audit request — African Creators',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #050505; color: #FDFCF0; padding: 40px; border-radius: 12px;">
          <div style="margin-bottom: 32px;">
            <h1 style="font-size: 28px; margin: 0 0 8px; color: #C5A059; font-style: italic;">Your request is in.</h1>
            <p style="margin: 0; color: #8C8C82;">We'll be in touch within 24 hours.</p>
          </div>

          <p style="color: #FDFCF0; line-height: 1.7;">
            Hi ${name},
          </p>
          <p style="color: #8C8C82; line-height: 1.7;">
            Thank you for reaching out. We've received your audit request for <strong style="color: #FDFCF0;">${company || 'your business'}</strong> and we'll review your primary friction point — <em style="color: #C5A059;">${friction || 'your operational challenge'}</em> — before we speak.
          </p>
          <p style="color: #8C8C82; line-height: 1.7;">
            Expect a response from our team within 24 business hours. In the meantime, think about where your team spends the most repetitive time — that's usually where we start.
          </p>

          <div style="margin-top: 40px; padding: 24px; background: #0F0F0F; border-radius: 8px; border-left: 3px solid #C5A059;">
            <p style="margin: 0 0 4px; font-size: 12px; color: #8C8C82; text-transform: uppercase; letter-spacing: 0.1em;">African Creators</p>
            <p style="margin: 0; font-size: 12px; color: #8C8C82;">Johannesburg · Based in Africa. Serving Globally.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email us directly.' },
      { status: 500 }
    )
  }
}

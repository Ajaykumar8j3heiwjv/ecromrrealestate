import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, phone, email, interest, message } = req.body || {}
  if (!name || !phone || !interest || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = Number(process.env.SMTP_PORT || 587)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const toEmail = process.env.TO_EMAIL || 'ecromrrealestate@gmail.com'

  if (!smtpHost || !smtpUser || !smtpPass) {
    return res.status(500).json({ error: 'SMTP configuration not set' })
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const mailPayload = {
    from: smtpUser,
    to: toEmail,
    subject: `ECR OMR Contact Inquiry: ${interest}`,
    text: `New enquiry from ${name} (phone: ${phone}, email: ${email})\n\nInterest: ${interest}\nMessage: ${message}`,
    html: `<p>New enquiry from <strong>${name}</strong> (<a href="mailto:${email}">${email}</a>, phone: ${phone})</p><p><strong>Interest:</strong> ${interest}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
  }

  try {
    await transporter.sendMail(mailPayload)
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('SMTP send error', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}

import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const auth = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

auth.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: 'v1', auth });

function makeHtmlEmailWithPdf({
  from,
  to,
  subject,
  html,
  text,
  base64Pdf,
  filename = 'document.pdf',
}) {
  const boundary = `----=_Part_${Date.now()}`;

  // If base64 comes as data URL, strip the prefix
  const cleanBase64 =
    base64Pdf.includes(',') ? base64Pdf.split(',')[1] : base64Pdf;

  const message =
    `From: ${from}\r\n` +
    `To: ${to}\r\n` +
    `Subject: ${subject}\r\n` +
    `MIME-Version: 1.0\r\n` +
    `Content-Type: multipart/mixed; boundary="${boundary}"\r\n\r\n` +
    'X-Priority: 1\r\n' +
    'X-MSMail-Priority: High\r\n' +
    'Importance: High\r\n' +
    // HTML body
    `--${boundary}\r\n` +
    `Content-Type: text/html; charset="UTF-8"\r\n\r\n` +
    `${html}\r\n\r\n` +

    // PDF attachment
    `--${boundary}\r\n` +
    `Content-Type: application/pdf; name="${filename}"\r\n` +
    `Content-Disposition: attachment; filename="${filename}"\r\n` +
    `Content-Transfer-Encoding: base64\r\n\r\n` +
    `${cleanBase64}\r\n\r\n` +

    `--${boundary}--`;

  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function pdfMail(data) {
  const to = data.to
    ? `${process.env.FIRST_PERSON_EMAIL}, ${data.to}`
    : process.env.FIRST_PERSON_EMAIL;

  const raw = makeHtmlEmailWithPdf({
    from: '"VerdeAzul AI System" <asistente@appverdeazul.com>',
    to,
    subject: data.subject,
    html: data.body,   // your HTML content
    text: data.body || '', // optional fallback
    base64Pdf: data.fileString,
    filename: data.filename || 'invoice.pdf',
  });

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw },
  });

  console.log('HTML + PDF email sent via Gmail API:', res.data.id);
  return res.data;
}

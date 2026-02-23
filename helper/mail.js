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

// Encode subject line for UTF-8 (RFC 2047)
function encodeSubject(subject) {
  const buffer = Buffer.from(subject, 'utf-8');
  return `=?UTF-8?B?${buffer.toString('base64')}?=`;
}

function makeEmail({ to, from, subject, html, text }) {
  const boundary = `boundary_${Date.now()}`;
  const encodedSubject = encodeSubject(subject);
  
  const message =
    `From: ${from}\r\n` +
    `To: ${to}\r\n` +
    `Subject: ${encodedSubject}\r\n` +
    `MIME-Version: 1.0\r\n` +
    'X-Priority: 1\r\n' +
    'X-MSMail-Priority: High\r\n' +
    'Importance: High\r\n' +
    `Content-Type: multipart/alternative; boundary="${boundary}"\r\n\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: text/plain; charset=utf-8\r\n` +
    `Content-Transfer-Encoding: base64\r\n\r\n` +
    Buffer.from(text || '', 'utf-8').toString('base64') +
    `\r\n--${boundary}\r\n` +
    `Content-Type: text/html; charset=utf-8\r\n` +
    `Content-Transfer-Encoding: base64\r\n\r\n` +
    Buffer.from(html || '', 'utf-8').toString('base64') +
    `\r\n--${boundary}--`;

  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function mail(data) {
  const html = data.html;
  const raw = makeEmail({
    from: '"VerdeAzul AI System" <asistente@appverdeazul.com>',
    to: data.to,
    subject: data.subject,
    text: data?.text,
    html: html,
  });

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw },
  });

  console.log('Email sent via Gmail API:', res.data.id);
  return res.data;
}

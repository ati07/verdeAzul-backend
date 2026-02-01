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

function makeEmail({ to, from, subject, html, text }) {
  const message =
    `From: ${from}\r\n` +
    `To: ${to}\r\n` +
    `Subject: ${subject}\r\n` +
    `MIME-Version: 1.0\r\n` +
    'X-Priority: 1\r\n' +
    'X-MSMail-Priority: High\r\n' +
    'Importance: High\r\n' +
    `Content-Type: text/html; charset=utf-8\r\n\r\n` +
    (html || text);

  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function mail(data) {
  // const html = createModernCollectionEmail(data);
  // console.log("data.html",data.html)
  const html = data.html;
  const raw = makeEmail({
    from: '"VerdeAzul AI System" <asistente@appverdeazul.com>',
    to: data.to,
    subject: data.subject,
    text: data?.text,
    html:html,
  });

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw },
  });

  console.log('Email sent via Gmail API:', res.data.id);
  return res.data;
}

import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const auth = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

auth.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: "v1", auth });

function makeEmail({ from, to, subject, html, attachments = [] }) {

  const boundary = `----=_Part_${Date.now()}`;

  let message =
    `From: ${from}\r\n` +
    `To: ${to}\r\n` +
    `Subject: ${subject}\r\n` +
    `MIME-Version: 1.0\r\n` +
    `Content-Type: multipart/mixed; boundary="${boundary}"\r\n\r\n`;

  message +=
    `--${boundary}\r\n` +
    `Content-Type: text/html; charset="UTF-8"\r\n\r\n` +
    `${html}\r\n\r\n`;

  attachments.forEach((file) => {

    const cleanBase64 =
      file.base64.includes(",")
        ? file.base64.split(",")[1]
        : file.base64;

    message +=
      `--${boundary}\r\n` +
      `Content-Type: ${file.type}; name="${file.name}"\r\n` +
      `Content-Disposition: attachment; filename="${file.name}"\r\n` +
      `Content-Transfer-Encoding: base64\r\n\r\n` +
      `${cleanBase64}\r\n\r\n`;

  });

  message += `--${boundary}--`;

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function sendMailWithAttachments(data) {
  const to = data.to
    ? `${process.env.CLIENT_EMAIL_SENDER}, ${data.to}`
    : process.env.CLIENT_EMAIL_SENDER;
  const raw = makeEmail({
    from: '"VerdeAzul AI System" <asistente@appverdeazul.com>',
    to: data.to,
    subject: data.subject,
    html: data.body,
    text: data.body || '', // optional fallback
    attachments: data.attachments || []
  });

  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw }
  });

  return res.data;
}
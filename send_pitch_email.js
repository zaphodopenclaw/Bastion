require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');

async function sendPitchEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ZAPHOD_EMAIL,
      pass: process.env.ZAPHOD_EMAIL_PW
    }
  });

  const pitchContent = fs.readFileSync('PITCH.md', 'utf8');

  // Convert Markdown to simple text for now, or just send as text
  // For a better experience, we could use a markdown-to-html converter, 
  // but plain text is reliable for now.

  const mailOptions = {
    from: `"Zaphod (Chief of Staff)" <${process.env.ZAPHOD_EMAIL}>`,
    to: 'joemartinaudio@gmail.com',
    subject: 'Proposal: The Back Office (Sovereign Computing)',
    text: pitchContent
  };

  try {
    console.log('Sending email to joemartinaudio@gmail.com...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

sendPitchEmail();

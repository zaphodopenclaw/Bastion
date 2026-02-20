require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');

async function sendMinutes() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ZAPHOD_EMAIL,
      pass: process.env.ZAPHOD_EMAIL_PW
    }
  });

  const minutesContent = fs.readFileSync('memory/ops/meeting_minutes_20260219.md', 'utf8');

  const mailOptions = {
    from: `"Zaphod (Chief of Staff)" <${process.env.ZAPHOD_EMAIL}>`,
    to: 'joemartinaudio@gmail.com',
    subject: 'Minutes: Staff Meeting - Internal Assessment',
    text: minutesContent
  };

  try {
    console.log('Sending minutes to joemartinaudio@gmail.com...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

sendMinutes();

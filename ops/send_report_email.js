require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');

async function sendReport() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ZAPHOD_EMAIL,
      pass: process.env.ZAPHOD_EMAIL_PW
    }
  });

  const reportContent = fs.readFileSync('memory/ops/comprehensive_plan_20260219.md', 'utf8');

  const mailOptions = {
    from: `"Zaphod (Chief of Staff)" <${process.env.ZAPHOD_EMAIL}>`,
    to: 'joemartinaudio@gmail.com',
    subject: 'BASTION: Detailed Staff Assessment, Priorities & Roadmap',
    text: reportContent // Sending as text/markdown
  };

  try {
    console.log('Sending report to joemartinaudio@gmail.com...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

sendReport();

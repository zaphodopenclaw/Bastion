const nodemailer = require('nodemailer');

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ZAPHOD_EMAIL,
      pass: process.env.ZAPHOD_EMAIL_PW
    }
  });

  const mailOptions = {
    from: `"Zaphod" <${process.env.ZAPHOD_EMAIL}>`,
    to: 'Joemartinaudio@gmail.com',
    subject: 'Office of the Chief of Staff - Link Established',
    text: 'Sovereign,\n\nThe Communications Department (Marvin) confirms the establishment of this channel.\n\nReliability > Spectacle.\n\n- Zaphod'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendTestEmail();

require('dotenv').config(); // LOAD .ENV
const imap = require('imap-simple');
const simpleParser = require('mailparser').simpleParser;
const nodemailer = require('nodemailer');
const { execSync } = require('child_process');
const fs = require('fs');
const Parser = require('rss-parser');
const parser = new Parser();

async function getBriefing() {
  const config = {
    imap: {
      user: process.env.ZAPHOD_EMAIL,
      password: process.env.ZAPHOD_EMAIL_PW,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      authTimeout: 3000,
      tlsOptions: { rejectUnauthorized: false } // Fix for self-signed errors
    }
  };

  let briefing = `# 🌅 Morning Briefing - ${new Date().toLocaleDateString()}\n\n`;

  // 1. Weather (DROPPED per Sovereign Directive)
  // briefing += `## 🌤️ Weather\n...`;

  // 2. Calendar & Action Items (Local)
  try {
    const calRaw = fs.readFileSync('memory/operations/TRILLIAN_CALENDAR.md', 'utf8');
    const today = new Date().toISOString().split('T')[0];
    
    // Parse Events
    const todayEvents = calRaw.split('\n').filter(line => (line.includes(today) || line.includes('Recurring: Daily')) && line.trim().startsWith('-'));
    
    // Parse Reminders/Tasks (Lines starting with - [ ] or - [x])
    const tasks = calRaw.split('\n').filter(line => line.trim().match(/^- \[.\]/));

    briefing += `## 📅 Schedule & Tasks\n`;
    if (todayEvents.length > 0) {
      todayEvents.forEach(evt => briefing += `${evt.trim()}\n`);
    } else {
      briefing += `*No specific events scheduled.*\n`;
    }
    
    if (tasks.length > 0) {
      briefing += `\n**Pending Actions:**\n`;
      tasks.forEach(task => briefing += `${task.trim()}\n`);
    }
    briefing += `\n`;
  } catch (e) {
    briefing += `## 📅 Schedule\n(Error reading calendar: ${e.message})\n\n`;
  }

  // 3. Inbox (Unread Count + Top 3 Subjects)
  // ... (keep existing)

  // 4. Intelligence (News - NYT Tech)
  // ... (keep existing)

  // 5. System Evolution (Git Log)
  try {
    // Get git log for the last 24 hours from the workspace root (assuming .git exists here or in internal-notes)
    // We need to be careful about CWD. The script runs in /workspace.
    const gitLog = execSync('git log --since="24 hours ago" --pretty=format:"- %s (%h)" --no-merges -n 5').toString().trim();
    
    briefing += `## 🧬 System Evolution (Last 24h)\n`;
    if (gitLog) {
      briefing += `${gitLog}\n`;
    } else {
      briefing += `*No structural changes recorded.*\n`;
    }
    briefing += `\n`;
  } catch (e) {
     // If git fails (e.g. no repo), just skip or note it
     briefing += `## 🧬 System Evolution\n(Log unavailable: ${e.message})\n\n`;
  }

  // 6. System Health
  // ... (keep existing)
  try {
    const connection = await imap.connect(config);
    await connection.openBox('INBOX');
    const searchCriteria = ['UNSEEN'];
    const fetchOptions = { bodies: ['HEADER'], markSeen: false };
    const messages = await connection.search(searchCriteria, fetchOptions);
    
    briefing += `## 📬 Inbox\n**${messages.length} Unread Messages**\n`;
    
    // Get top 3 most recent
    const top3 = messages.slice(-3).reverse();
    for (const item of top3) {
      const header = item.parts.find(p => p.which === 'HEADER');
      if (header && header.body.subject) {
        briefing += `- ${header.body.subject[0]}\n`;
      }
    }
    connection.end();
  } catch (e) {
    briefing += `## 📬 Inbox\n(Connection failed: ${e.message})\n`;
  }

  // 4. Intelligence (News - NYT Tech)
  try {
    const feed = await parser.parseURL('https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml');
    briefing += `## 📰 Intelligence (NYT Tech)\n`;
    feed.items.slice(0, 3).forEach(item => {
      briefing += `- [${item.title}](${item.link})\n`;
    });
    briefing += `\n`;
  } catch (e) {
    briefing += `## 📰 Intelligence\n(Feed Unavailable: ${e.message})\n\n`;
  }

  // 6. System Health
  try {
     const uptime = execSync('uptime -p').toString().trim();
     const disk = execSync('df -h / | tail -1 | awk "{print $5}"').toString().trim();
     briefing += `## ⚙️ System Status\n**Uptime:** ${uptime} | **Disk:** ${disk}\n`;
  } catch (e) {}

  return briefing;
}

async function sendEmail(content) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ZAPHOD_EMAIL,
      pass: process.env.ZAPHOD_EMAIL_PW
    }
  });

  const mailOptions = {
    from: `"Zaphod (Chief of Staff)" <${process.env.ZAPHOD_EMAIL}>`,
    to: 'Joemartinaudio@gmail.com',
    subject: `🌅 Morning Briefing - ${new Date().toLocaleDateString()}`,
    text: content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully.');
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

getBriefing().then(async (b) => {
  // Output for Telegram
  console.log(b);
  // Send via Email
  await sendEmail(b);
});

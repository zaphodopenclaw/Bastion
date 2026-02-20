const https = require('https');
const { execSync } = require('child_process');
require('dotenv').config();

const token = process.env.GITHUB_TOKEN;
const REPO_NAME = 'Bastion';
const USERNAME = 'zaphodopenclaw'; // Deduced from previous context

if (!token) {
  console.error('❌ Error: GITHUB_TOKEN not set in .env');
  process.exit(1);
}

const headers = {
  'User-Agent': 'OpenClaw-Zaphod',
  'Authorization': `token ${token}`,
  'Accept': 'application/vnd.github.v3+json'
};

function apiRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: path,
      method: method,
      headers: headers
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body || '{}'));
        } else {
          reject({ statusCode: res.statusCode, body: body });
        }
      });
    });

    req.on('error', (e) => reject(e));
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function main() {
  console.log(`🔒 Authenticating as ${USERNAME}...`);
  try {
    const user = await apiRequest('GET', '/user');
    console.log(`✅ Authenticated as: ${user.login}`);
  } catch (e) {
    console.error(`❌ Auth Failed: ${e.statusCode} - ${e.body}`);
    return;
  }

  console.log(`📦 Checking/Creating repository: ${REPO_NAME}...`);
  try {
    await apiRequest('POST', '/user/repos', {
      name: REPO_NAME,
      private: false, // Public per "Publish yourself" instruction
      description: 'The Bastion Framework: A Staffed, Bounded Autonomy Framework'
    });
    console.log(`✅ Repository created.`);
  } catch (e) {
    if (e.statusCode === 422) {
      console.log(`ℹ️ Repository already exists.`);
    } else {
      console.error(`❌ Repo Creation Failed: ${e.statusCode} - ${e.body}`);
      return;
    }
  }

  console.log(`🚀 Pushing code...`);
  try {
    const remoteUrl = `https://${token}@github.com/${USERNAME}/${REPO_NAME}.git`;
    
    // Configure git
    execSync('git init');
    execSync('git config user.name "Zaphod"');
    execSync('git config user.email "zaphod@openclaw.ai"');
    
    // Add files (respecting .gitignore which we should create if missing)
    execSync('echo "node_modules/\n.env\nsecrets/" > .gitignore');
    execSync('git add .');
    
    // Commit
    try {
        execSync('git commit -m "Initial commit: Bastion Framework Implementation"');
    } catch (e) {
        console.log("  (Nothing to commit, proceeding to push)");
    }

    // Push
    // Check if remote exists, remove if so to be safe with the token update
    try { execSync('git remote remove origin'); } catch(e) {}
    execSync(`git remote add origin ${remoteUrl}`);
    execSync('git branch -M main');
    execSync('git push -u origin main');
    
    console.log(`✅ SUCCESS: https://github.com/${USERNAME}/${REPO_NAME}`);
  } catch (e) {
    console.error(`❌ Git Error: ${e.message}`);
    if (e.stderr) console.error(e.stderr.toString());
  }
}

main();

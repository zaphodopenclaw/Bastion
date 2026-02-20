const fs = require('fs');
const path = require('path');
const { publish: publishNostr } = require('../platforms/social/nostr');

// Mock args parser (for R&D simplicity)
// Usage: node ops/publish.js --identity zaphod --content "Hello"
const args = process.argv.slice(2);
const identityId = args[args.indexOf('--identity') + 1];
const content = args[args.indexOf('--content') + 1];

if (!identityId || !content) {
  console.error("Usage: node ops/publish.js --identity <id> --content <text>");
  process.exit(1);
}

// 1. Load Identity Config
const configPath = path.join(__dirname, `../identities/${identityId}/config.json`);
if (!fs.existsSync(configPath)) {
  console.error(`Identity config not found: ${configPath}`);
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// 2. Load Secrets
const secretsPath = path.join(__dirname, `../${config.secrets_ref}`);
if (!fs.existsSync(secretsPath)) {
  console.error(`Secrets file not found: ${secretsPath}`);
  process.exit(1);
}
const secretsContent = fs.readFileSync(secretsPath, 'utf8');
const secrets = {};
secretsContent.split('\n').forEach(line => {
  const [key, val] = line.split('=');
  if (key && val) secrets[key.trim()] = val.trim();
});

// 3. Execute Platform Adapters
(async () => {
  console.log(`[${identityId}] Publishing: "${content}"`);
  
  // Nostr
  if (config.platforms.nostr) {
    console.log("-> Platform: Nostr");
    const sk = secrets['NOSTR_SK'];
    const relays = config.platforms.nostr.relays;
    
    if (!sk) {
        console.error("  ❌ Missing NOSTR_SK in secrets");
    } else {
        try {
            // Note: In real system, this calls the adapter properly
            // Here we are testing the loop
            console.log(`  Attempting publish to ${relays.length} relays...`);
            // const result = await publishNostr(content, [], sk, relays); // Commented out to avoid spamming mainnet during dev test
            console.log("  ✅ [MOCK] Published to Nostr (Event ID: mock_id_123)");
            
            // Log result (Mock)
            const logDir = path.join(__dirname, `../identities/${identityId}/logs/${new Date().getFullYear()}`);
            fs.mkdirSync(logDir, { recursive: true });
            fs.appendFileSync(path.join(logDir, 'publish.log'), `[${new Date().toISOString()}] NOSTR SUCCESS: mock_id_123\n`);
            
        } catch (err) {
            console.error(`  ❌ Failed: ${err.message}`);
        }
    }
  }

})();

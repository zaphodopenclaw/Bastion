const https = require('https');

const token = process.env.GITHUB_TOKEN;
const nostrPK = process.env.NOSTR_PK;

if (!token || !nostrPK) {
  console.error('Missing token or nostr key.');
  process.exit(1);
}

// 1. Create Public Repo (Pages)
function createPagesRepo() {
  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/user/repos',
    method: 'POST',
    headers: {
      'User-Agent': 'OpenClaw-Zaphod',
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  const payload = JSON.stringify({
    name: 'zaphodopenclaw.github.io',
    private: false, // PUBLIC
    auto_init: true // Create README
  });

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`Repo Creation Status: ${res.statusCode}`);
      if (res.statusCode === 201 || res.statusCode === 422) {
        // Success or Already Exists -> Proceed to create file
        createNip05File();
      } else {
        console.error('Failed to create repo:', data);
      }
    });
  });
  req.write(payload);
  req.end();
}

// 2. Create/Update .well-known/nostr.json
function createNip05File() {
  const content = JSON.stringify({
    names: {
      "zaphod": nostrPK,
      "_": nostrPK // Root fallback
    }
  }, null, 2);
  
  const contentEncoded = Buffer.from(content).toString('base64');

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/repos/zaphodopenclaw/zaphodopenclaw.github.io/contents/.well-known/nostr.json',
    method: 'PUT',
    headers: {
      'User-Agent': 'OpenClaw-Zaphod',
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  // Check if file exists to get SHA (for update)
  const getReq = https.request({...options, method: 'GET'}, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      let sha = null;
      if (res.statusCode === 200) {
        sha = JSON.parse(data).sha;
      }
      
      // PUT (Create or Update)
      const putPayload = JSON.stringify({
        message: 'Update NIP-05 verification for Zaphod',
        content: contentEncoded,
        sha: sha
      });
      
      const putReq = https.request(options, (putRes) => {
        console.log(`File Upload Status: ${putRes.statusCode}`);
        if (putRes.statusCode === 200 || putRes.statusCode === 201) {
            console.log('✅ NIP-05 Verification Published!');
            console.log('Address: zaphod@zaphodopenclaw.github.io');
        }
      });
      putReq.write(putPayload);
      putReq.end();
    });
  });
  getReq.end();
}

createPagesRepo();

const https = require('https');

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('Error: GITHUB_TOKEN not set in environment.');
  process.exit(1);
}

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: '/user',
  method: 'GET',
  headers: {
    'User-Agent': 'OpenClaw-Zaphod',
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json'
  }
};

console.log(`Testing token: ${token.substring(0, 4)}...${token.substring(token.length - 4)}`);

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      const user = JSON.parse(data);
      console.log(`Success! Authenticated as: ${user.login}`);
      console.log(`Scopes: ${res.headers['x-oauth-scopes']}`);
      createRepo();
    } else {
      console.error(`Authentication Failed. Status: ${res.statusCode}`);
      console.error(`Response: ${data}`);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error(`Request Error: ${e.message}`);
});

req.end();

function createRepo() {
  const repoOptions = {
    ...options,
    path: '/user/repos',
    method: 'POST'
  };

  const payload = JSON.stringify({
    name: 'internal-notes',
    private: true,
    description: 'Office of the Chief of Staff - Internal Memory & Docs'
  });

  const repoReq = https.request(repoOptions, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 201) {
        console.log('Repository created successfully!');
        console.log(`URL: https://github.com/zaphodopenclaw/internal-notes`);
      } else if (res.statusCode === 422) {
        console.log('Repository already exists (422). proceeding to push...');
      } else {
        console.error(`Repo Creation Failed. Status: ${res.statusCode}`);
        console.error(`Response: ${data}`);
        process.exit(1);
      }
    });
  });

  repoReq.write(payload);
  repoReq.end();
}

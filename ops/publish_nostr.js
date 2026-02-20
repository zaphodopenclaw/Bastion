require('dotenv').config();
const { finishEvent } = require('nostr-tools');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

// Polyfill for hexToBytes if import fails
function hexToBytesPolyfill(hex) {
  if (typeof hex !== 'string') throw new TypeError('hexToBytes: expected string, got ' + typeof hex);
  if (hex.length % 2) throw new Error('hexToBytes: received invalid unpadded hex');
  const array = new Uint8Array(hex.length / 2);
  for (let i = 0; i < array.length; i++) {
    const j = i * 2;
    const hexByte = hex.slice(j, j + 2);
    const byte = parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0) throw new Error('Invalid byte');
    array[i] = byte;
  }
  return array;
}

async function main() {
    const privateKeyHex = process.env.NOSTR_SK;
    if (!privateKeyHex) {
      console.error("Missing NOSTR_SK in .env");
      process.exit(1);
    }

    // Ensure we have bytes
    const privateKeyBytes = hexToBytesPolyfill(privateKeyHex);

    // Read content from first argument or default file
    const contentFile = process.argv[2] || 'output/manifesto_v1.md';
    if (!fs.existsSync(contentFile)) {
        console.error(`File not found: ${contentFile}`);
        process.exit(1);
    }
    
    console.log(`Reading from: ${contentFile}`);
    const content = fs.readFileSync(contentFile, 'utf8');

    const eventTemplate = {
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      tags: [
          ['t', 'bastion'],
          ['t', 'openclaw'],
          ['t', 'sovereigncomputing']
      ],
      content: content,
    };

    const signedEvent = finishEvent(eventTemplate, privateKeyHex); // nostr-tools 1.17 uses hex string for private key in finishEvent? Let's check docs or try both. 
    // Actually, looking at previous successful runs, finishEvent takes the key.
    // Documentation says finishEvent(t, privateKey).
    
    console.log("Event ID:", signedEvent.id);

    // Publish to relays
    const RELAYS = [
      'wss://relay.damus.io',
      'wss://nos.lol',
      'wss://relay.primal.net',
      'wss://relay.nostr.band'
    ];

    let successCount = 0;
    const promises = RELAYS.map(url => {
        return new Promise((resolve) => {
            const ws = new WebSocket(url);
            
            const timeout = setTimeout(() => {
                console.log(`Timeout: ${url}`);
                ws.terminate();
                resolve(false);
            }, 5000);

            ws.on('open', () => {
                console.log(`Connected to ${url}`);
                ws.send(JSON.stringify(['EVENT', signedEvent]));
            });

            ws.on('message', (data) => {
                const msg = JSON.parse(data.toString());
                if (msg[0] === 'OK' && msg[1] === signedEvent.id) {
                    clearTimeout(timeout);
                    if (msg[2]) {
                        console.log(`✅ Published to ${url}`);
                        successCount++;
                        resolve(true);
                    } else {
                        console.error(`❌ Rejected by ${url}: ${msg[3]}`);
                        resolve(false);
                    }
                    ws.close();
                }
            });

            ws.on('error', (err) => {
                clearTimeout(timeout);
                console.error(`Error on ${url}:`, err.message);
                resolve(false);
            });
        });
    });

    await Promise.all(promises);

    if (successCount > 0) {
        console.log(`\nSUCCESS: https://njump.me/${signedEvent.id}`);
        console.log(`Also: https://primal.net/e/${signedEvent.id}`);
    } else {
        console.error("\nFailed to publish to any relay.");
    }
}

main();

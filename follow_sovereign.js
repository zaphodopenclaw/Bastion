require('dotenv').config();
const { signEvent, getEventHash, getPublicKey, nip19 } = require('nostr-tools');
const WebSocket = require('ws');

// Simple hex decoding for v1 compatibility
function hexToBytes(hex) {
    if (typeof hex !== 'string') throw new TypeError('hexToBytes: expected string, got ' + typeof hex);
    if (hex.length % 2) throw new Error('hexToBytes: received invalid unpadded hex');
    const array = new Uint8Array(hex.length / 2);
    for (let i = 0; i < array.length; i++) {
        const j = i * 2;
        array[i] = parseInt(hex.slice(j, j + 2), 16);
    }
    return array;
}

const privateKeyHex = process.env.NOSTR_SK;
if (!privateKeyHex) {
  console.error("Missing NOSTR_SK");
  process.exit(1);
}

const pubkey = getPublicKey(privateKeyHex);

// Target to follow
const sovereignNpub = "npub1gfv7gqgacj7knvctldxhah4k5fehquyjrpgl9xufrvmm9r3qaxnqzsp8mv";
const decoded = nip19.decode(sovereignNpub);
const sovereignHex = decoded.data;

console.log(`Following Sovereign: ${sovereignNpub}`);
console.log(`Hex: ${sovereignHex}`);

const RELAYS = [
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.primal.net'
];

// Kind 3: Contact List
const eventTemplate = {
  kind: 3,
  created_at: Math.floor(Date.now() / 1000),
  tags: [
    ['p', sovereignHex, '', 'Sovereign'] 
  ],
  content: JSON.stringify({
    "wss://relay.damus.io": { "read": true, "write": true },
    "wss://nos.lol": { "read": true, "write": true },
    "wss://relay.primal.net": { "read": true, "write": true }
  }),
  pubkey: pubkey
};

eventTemplate.id = getEventHash(eventTemplate);
eventTemplate.sig = signEvent(eventTemplate, privateKeyHex);

console.log("Event ID:", eventTemplate.id);

// Publish to relays
let activeRelays = RELAYS.length;

RELAYS.forEach(url => {
  const ws = new WebSocket(url);
  
  ws.on('open', () => {
    console.log(`Connected to ${url}`);
    ws.send(JSON.stringify(['EVENT', eventTemplate]));
  });

  ws.on('message', (data) => {
    const msg = JSON.parse(data.toString());
    if (msg[0] === 'OK' && msg[1] === eventTemplate.id) {
      if (msg[2]) {
         console.log(`✅ Published Contact List to ${url}`);
      } else {
         console.error(`❌ Rejected by ${url}: ${msg[3]}`);
      }
      ws.close();
    }
  });

  ws.on('error', (err) => {
    console.error(`Error on ${url}:`, err.message);
    activeRelays--;
  });
  
  ws.on('close', () => {
      activeRelays--;
      if(activeRelays === 0) process.exit(0);
  });
});

// Force exit safety net
setTimeout(() => process.exit(0), 5000);

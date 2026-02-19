const { generateSecretKey, getPublicKey } = require('nostr-tools');
const { nip19 } = require('nostr-tools');

const sk = generateSecretKey(); // Uint8Array
const pk = getPublicKey(sk);    // string (hex)

// Convert Uint8Array to hex string manually
const skHex = Buffer.from(sk).toString('hex');

const nsec = nip19.nsecEncode(sk);
const npub = nip19.npubEncode(pk);

console.log(`NSEC=${nsec}`);
console.log(`NPUB=${npub}`);
console.log(`SK_HEX=${skHex}`);
console.log(`PK_HEX=${pk}`);

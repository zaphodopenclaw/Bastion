const { generateSecretKey, getPublicKey } = require('nostr-tools');
const { bytesToHex } = require('@noble/hashes/utils');
const { nip19 } = require('nostr-tools');

const sk = generateSecretKey(); // Uint8Array
const pk = getPublicKey(sk);    // Hex string
const skHex = bytesToHex(sk);   // Hex string

const nsec = nip19.nsecEncode(sk);
const npub = nip19.npubEncode(pk);

console.log(`NSEC=${nsec}`);
console.log(`NPUB=${npub}`);
console.log(`SK_HEX=${skHex}`);
console.log(`PK_HEX=${pk}`);

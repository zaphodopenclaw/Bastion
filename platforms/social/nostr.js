const { finishEvent } = require('nostr-tools');
const WebSocket = require('ws');

/**
 * Publish a Nostr event (Kind 1) to specified relays.
 * @param {string} content - The text content of the note.
 * @param {Array} tags - Array of tags (e.g. [['t', 'test']]).
 * @param {string} privateKeyHex - The hex private key (nsec decoded).
 * @param {Array<string>} relays - List of relay URLs.
 * @returns {Promise<Object>} - Result with eventId and success status.
 */
async function publish(content, tags, privateKeyHex, relays) {
  return new Promise((resolve, reject) => {
    try {
      const eventTemplate = {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: tags || [],
        content: content,
      };

      const signedEvent = finishEvent(eventTemplate, privateKeyHex);
      const eventId = signedEvent.id;
      
      let successCount = 0;
      let completed = 0;
      const results = [];

      if (!relays || relays.length === 0) {
        return reject(new Error('No relays provided'));
      }

      relays.forEach(url => {
        const ws = new WebSocket(url);
        
        const timeout = setTimeout(() => {
            if (ws.readyState !== WebSocket.CLOSED) ws.terminate();
        }, 5000);

        ws.on('open', () => {
          ws.send(JSON.stringify(['EVENT', signedEvent]));
        });

        ws.on('message', (data) => {
          try {
            const msg = JSON.parse(data.toString());
            if (msg[0] === 'OK' && msg[1] === eventId) {
              clearTimeout(timeout);
              const success = msg[2];
              const reason = msg[3] || '';
              results.push({ url, success, reason });
              if (success) successCount++;
              ws.close();
            }
          } catch (e) {
            // ignore parse errors
          }
        });

        ws.on('error', (err) => {
            clearTimeout(timeout);
            results.push({ url, success: false, reason: err.message });
            ws.close();
        });

        ws.on('close', () => {
            completed++;
            if (completed === relays.length) {
                resolve({ 
                    eventId, 
                    success: successCount > 0, 
                    publishedTo: successCount, 
                    details: results 
                });
            }
        });
      });

    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { publish };

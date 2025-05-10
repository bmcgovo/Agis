// frontend/src/stores/evidence.js
import { defineStore } from 'pinia';

export const useEvidenceStore = defineStore('evidence', {
  state: () => ({
    currentCase: null,
    encryptionKey: null
  }),
  actions: {
    async initializeEncryption() {
      this.encryptionKey = await crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      );
    },
    async uploadEvidence(payload) {
      try {
        // Example: use fetch or axios to POST to your backend
        const response = await fetch('/api/evidence', {
          method: 'POST',
          body: payload.file, // or FormData if needed
          headers: { /* ... */ }
        });
        // Handle response, update state, etc.
      } catch (err) {
        // Handle error, update state, notify user
      }
    }
  }
});
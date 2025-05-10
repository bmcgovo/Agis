<!-- filepath: frontend/src/components/EvidenceUpload.vue -->
<template>
  <label for="evidence-upload">Upload Evidence</label>
  <input 
    id="evidence-upload"
    type="file"
    @change="handleEvidenceUpload"
    ref="fileInput"
    :disabled="!hasWritePermissions"
  />
</template>

<script setup>
import { useOAuth2 } from '@vueuse/oauth2'
import { useEvidenceStore } from '@/stores/evidence'
import { storeToRefs } from 'vue'

const { token } = useOAuth2()
const evidenceStore = useEvidenceStore()
const { encryptionKey, currentCase } = storeToRefs(evidenceStore)
// Or pass as props if managed by parent

const handleEvidenceUpload = async (event) => {
  try {
    const file = event.target.files[0]
    const iv = crypto.getRandomValues(new Uint8Array(12))
    const encryptedFile = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      encryptionKey,
      await file.arrayBuffer()
    )
    const blob = new Blob([encryptedFile])
    await evidenceStore.uploadEvidence({
      file: blob,
      iv: Array.from(iv),
      metadata: {
        caseId: currentCase.value.id,
        uploader: user.value.id,
        timestamp: new Date().toISOString()
      }
    })
    // Show success feedback
  } catch (err) {
    // Show error feedback
  }
}
</script>
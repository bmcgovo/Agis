<template>
  <div class="evidence-upload">
    <input 
      type="file"
      @change="handleUpload"
      ref="fileInput"
      aria-label="Upload evidence file"
      :disabled="!hasWritePermission"
    />
    <progress v-if="uploadProgress > 0" :value="uploadProgress" max="100"></progress>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useOAuth2 } from '@vueuse/oauth2';
import { useEvidenceStore } from '@/stores/evidence';

const { token } = useOAuth2();
const evidenceStore = useEvidenceStore();
const uploadProgress = ref(0);

const handleUpload = async (e) => {
  const file = e.target.files[0];
  const encryptedFile = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: crypto.getRandomValues(new Uint8Array(12)) },
    await evidenceStore.getEncryptionKey(),
    await file.arrayBuffer()
  );
  
  await evidenceStore.uploadEvidence({
    file: encryptedFile,
    metadata: {
      caseId: evidenceStore.currentCase,
      timestamp: new Date().toISOString()
    },
    onUploadProgress: (progress) => {
      uploadProgress.value = Math.round((progress.loaded / progress.total) * 100);
    }
  });
};
</script>

<style scoped>
.evidence-upload {
  margin: 2rem;
}
</style>

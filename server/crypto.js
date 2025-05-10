// server/crypto.js
import { webcrypto } from 'crypto'
import { hsmSign } from './hsm-integration'

// AES Key Wrapping
export const generateWrappingKey = async () => {
  return webcrypto.subtle.generateKey(
    { name: 'AES-KW', length: 256 },
    true,
    ['wrapKey', 'unwrapKey']
  )
}

export const encryptDEK = async (dek, wrappingKey) => {
  return webcrypto.subtle.wrapKey(
    'raw',
    dek,
    wrappingKey,
    'AES-KW'
  )
}

export const decryptDEK = async (encryptedKey, wrappingKey, algorithm = { name: 'AES-CBC', length: 256 }) => {
  return webcrypto.subtle.unwrapKey(
    'raw',
    encryptedKey,
    wrappingKey,
    'AES-KW',
    algorithm,
    ['decrypt']
  )
}

/**
 * Encrypts data using AES-CBC.
 * @param {ArrayBuffer} data - The plaintext data to encrypt.
 * @param {CryptoKey} dek - The AES key.
 * @returns {Promise<{ encryptedData: ArrayBuffer, iv: Uint8Array }>}
 */
export const encryptData = async (data, dek) => {
  try {
    const iv = webcrypto.getRandomValues(new Uint8Array(16))
    const encryptedData = await webcrypto.subtle.encrypt(
      { name: 'AES-CBC', iv },
      dek,
      data
    )
    return { encryptedData, iv }
  } catch (err) {
    throw new Error(`Encryption failed: ${err.message}`)
  }
}

export const decryptData = async (encryptedData, dek, iv) => {
  try {
    return await webcrypto.subtle.decrypt(
      { name: 'AES-CBC', iv },
      dek,
      encryptedData
    )
  } catch (err) {
    throw new Error(`Decryption failed: ${err.message}`)
  }
}

/**
 * Encrypts data using AES-GCM.
 * @param {ArrayBuffer} data - The plaintext data to encrypt.
 * @param {CryptoKey} dek - The AES key.
 * @returns {Promise<{ encryptedData: ArrayBuffer, iv: Uint8Array }>}
 */
export const encryptDataGCM = async (data, dek) => {
  const iv = webcrypto.getRandomValues(new Uint8Array(12))
  const encryptedData = await webcrypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    dek,
    data
  )
  return { encryptedData, iv }
}

// RSA Key Pair Generation
export const generateKeyPair = async () => {
  return webcrypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256'
    },
    true,
    ['encrypt', 'decrypt']
  )
}

// RSA Encryption/Decryption
export const encryptWithPublicKey = async (data, publicKey) => {
  return webcrypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    publicKey,
    data
  )
}

export const decryptWithPrivateKey = async (encryptedData, privateKey) => {
  return webcrypto.subtle.decrypt(
    { name: 'RSA-OAEP' },
    privateKey,
    encryptedData
  )
}

// Signing/Verification
export const signData = async (data, privateKey) => {
  return webcrypto.subtle.sign(
    { name: 'RSASSA-PKCS1-v1_5' },
    privateKey,
    data
  )
}

export const verifySignature = async (signature, data, publicKey) => {
  return webcrypto.subtle.verify(
    { name: 'RSASSA-PKCS1-v1_5' },
    publicKey,
    signature,
    data
  )
}

// HSM-backed sign
export const hsmBackedSign = async (data) => {
  const digest = await webcrypto.subtle.digest('SHA-512', data)
  return hsmSign(digest)
}

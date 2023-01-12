import { str2ab, DIGEST, DIGEST_SALT_LENGTH } from '../utils';

function loadPublicKey(pem: string): ArrayBuffer {
  const pemHeader = '-----BEGIN PUBLIC KEY-----';
  const pemFooter = '-----END PUBLIC KEY-----\n';
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length
  );
  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(pemContents);
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);
  return binaryDer;
}

function loadPrivateKey(pem: string): ArrayBuffer {
  // fetch the part of the PEM string between header and footer
  const pemHeader = '-----BEGIN PRIVATE KEY-----';
  const pemFooter = '-----END PRIVATE KEY-----\n';
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length
  );
  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(pemContents);
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);
  return binaryDer;
}

async function loadPublicKeyForEncryption(
  pem: string,
  alg: string
): Promise<CryptoKey> {
  const binaryDer = loadPublicKey(pem);

  return await crypto.subtle.importKey(
    'spki',
    binaryDer,
    {
      name: 'RSA-OAEP',
      hash: alg
    },
    true,
    ['encrypt']
  );
}

async function loadPublicKeyForVerifySignature(
  pem: string,
  alg: string
): Promise<CryptoKey> {
  const binaryDer = loadPublicKey(pem);

  return await crypto.subtle.importKey(
    'spki',
    binaryDer,
    {
      name: 'RSA-PSS',
      hash: alg
    },
    true,
    ['verify']
  );
}

//  format should be PKCS8
async function loadPrivateKeyForEncryption(
  pem: string,
  alg: string
): Promise<CryptoKey> {
  const binaryDer = loadPrivateKey(pem);

  return await window.crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    {
      name: 'RSA-OAEP',
      hash: alg
    },
    true,
    ['decrypt']
  );
}

//  format should be PKCS8
async function loadPrivateKeyForSigning(
  pem: string,
  alg: string
): Promise<CryptoKey> {
  const binaryDer = loadPrivateKey(pem);

  return await window.crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    {
      name: 'RSA-PSS',
      hash: alg
    },
    true,
    ['sign']
  );
}

async function encryptWithOAEP(
  publicKey: string,
  hash: string,
  plainData: Uint8Array
): Promise<ArrayBuffer> {
  const key = await loadPublicKeyForEncryption(publicKey, hash);
  return await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP'
    },
    key,
    plainData
  );
}

async function decryptWithOAEP(
  privateKey: string,
  hash: string,
  encryptedData: Uint8Array
): Promise<ArrayBuffer> {
  const key = await loadPrivateKeyForEncryption(privateKey, hash);
  return await window.crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP'
    },
    key,
    encryptedData
  );
}

// encryption
export function encryptWithOAEPSha1(
  publicKey: string,
  plainData: Uint8Array
): Promise<ArrayBuffer> {
  return encryptWithOAEP(publicKey, DIGEST['SHA-1'], plainData);
}

export function encryptWithOAEPSha256(
  publicKey: string,
  plainData: Uint8Array
): Promise<ArrayBuffer> {
  return encryptWithOAEP(publicKey, DIGEST['SHA-256'], plainData);
}

export function encryptWithOAEPSha384(
  publicKey: string,
  plainData: Uint8Array
): Promise<ArrayBuffer> {
  return encryptWithOAEP(publicKey, DIGEST['SHA-384'], plainData);
}

export function encryptWithOAEPSha512(
  publicKey: string,
  plainData: Uint8Array
): Promise<ArrayBuffer> {
  return encryptWithOAEP(publicKey, DIGEST['SHA-512'], plainData);
}

// decryption
export function decryptWithOAEPSha1(
  privateKey: string,
  encryptedData: Uint8Array
): Promise<ArrayBuffer> {
  return decryptWithOAEP(privateKey, DIGEST['SHA-1'], encryptedData);
}

export function decryptWithOAEPSha256(
  privateKey: string,
  encryptedData: Uint8Array
): Promise<ArrayBuffer> {
  return decryptWithOAEP(privateKey, DIGEST['SHA-256'], encryptedData);
}

export function decryptWithOAEPSha384(
  privateKey: string,
  encryptedData: Uint8Array
): Promise<ArrayBuffer> {
  return decryptWithOAEP(privateKey, DIGEST['SHA-384'], encryptedData);
}

export function decryptWithOAEPSha512(
  privateKey: string,
  encryptedData: Uint8Array
): Promise<ArrayBuffer> {
  return decryptWithOAEP(privateKey, DIGEST['SHA-512'], encryptedData);
}

// digital signature

// sign data with PSS and return a promise a promise that fulfills an array buffer containing the signature
async function signWithPss(
  privateKey: string,
  hash: string,
  data: Uint8Array
): Promise<ArrayBuffer> {
  const key = await loadPrivateKeyForSigning(privateKey, hash);
  return await window.crypto.subtle.sign(
    {
      name: 'RSA-PSS',
      saltLength: DIGEST_SALT_LENGTH[hash]
    },
    key,
    data
  );
}

// verify signature with PSS and return a Promise that fulfills with a boolean value: true if the signature is valid, false otherwise.
async function verifySignatureWithPss(
  publicKey: string,
  signature: Uint8Array,
  hash: string,
  data: Uint8Array
): Promise<boolean> {
  const key = await loadPublicKeyForVerifySignature(publicKey, hash);
  return await window.crypto.subtle.verify(
    {
      name: 'RSA-PSS',
      saltLength: DIGEST_SALT_LENGTH[hash]
    },
    key,
    signature,
    data
  );
}

export function signWithPssSha1(
  privateKey: string,
  data: Uint8Array
): Promise<ArrayBuffer> {
  return signWithPss(privateKey, DIGEST['SHA-1'], data);
}

export function signWithPssSha256(
  privateKey: string,
  data: Uint8Array
): Promise<ArrayBuffer> {
  return signWithPss(privateKey, DIGEST['SHA-256'], data);
}

export function signWithPssSha384(
  privateKey: string,
  data: Uint8Array
): Promise<ArrayBuffer> {
  return signWithPss(privateKey, DIGEST['SHA-384'], data);
}

export function signWithPssSha512(
  privateKey: string,
  data: Uint8Array
): Promise<ArrayBuffer> {
  return signWithPss(privateKey, DIGEST['SHA-512'], data);
}

export function verifySignatureWithPssSha1(
  publicKey: string,
  signature: Uint8Array,
  data: Uint8Array
): Promise<boolean> {
  return verifySignatureWithPss(publicKey, signature, DIGEST['SHA-1'], data);
}

export function verifySignatureWithPssSha256(
  publicKey: string,
  signature: Uint8Array,
  data: Uint8Array
): Promise<boolean> {
  return verifySignatureWithPss(publicKey, signature, DIGEST['SHA-256'], data);
}

export function verifySignatureWithPssSha384(
  publicKey: string,
  signature: Uint8Array,
  data: Uint8Array
): Promise<boolean> {
  return verifySignatureWithPss(publicKey, signature, DIGEST['SHA-384'], data);
}

export function verifySignatureWithPssSha512(
  publicKey: string,
  signature: Uint8Array,
  data: Uint8Array
): Promise<boolean> {
  return verifySignatureWithPss(publicKey, signature, DIGEST['SHA-512'], data);
}

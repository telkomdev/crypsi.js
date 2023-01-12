import { fromHex, toHex } from '../utils';

const KEY_BYTE_SIZE: Record<number, number> = {
  128: 16,
  192: 24,
  256: 32
};

const KEY_BIT_SIZE: Record<number, number> = {
  16: 128,
  24: 192,
  32: 256
};

const MODES: Record<string, string> = {
  GCM: 'AES-GCM',
  CBC: 'AES-CBC'
};

const IVS: Record<string, Uint8Array> = {
  GCM: crypto.getRandomValues(new Uint8Array(12)),
  CBC: crypto.getRandomValues(new Uint8Array(16))
};

interface Parsed {
  iv: Uint8Array;
  cipherData: Uint8Array;
}

function validateKeyAndMode(
  mode: string,
  rawKey: string,
  bitSize: number
): void {
  if (!Object.prototype.hasOwnProperty.call(KEY_BIT_SIZE, rawKey.length)) {
    throw new Error(
      `invalid key AES key length, key length should be 16, 24 or 32 bytes`
    );
  }

  if (rawKey.length !== KEY_BYTE_SIZE[bitSize]) {
    throw new Error(
      `invalid key length, AES ${bitSize} key length should be ${KEY_BYTE_SIZE[bitSize]} bytes length`
    );
  }

  if (!Object.prototype.hasOwnProperty.call(MODES, mode)) {
    throw new Error(`invalid mode, mode ${mode} does not exist`);
  }
}

async function importKey(rawKey: string, mode: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return await crypto.subtle.importKey(
    'raw',
    encoder.encode(rawKey),
    {
      name: MODES[mode],
      length: KEY_BIT_SIZE[rawKey.length]
    },
    true,
    ['encrypt', 'decrypt']
  );
}

function parseEncryptedData(encryptedData: string, mode: string): Parsed {
  const ivs: Record<string, Uint8Array> = {
    GCM: fromHex(encryptedData.slice(0, 24)),
    CBC: fromHex(encryptedData.slice(0, 32))
  };

  const cipherDatas: Record<string, Uint8Array> = {
    GCM: fromHex(encryptedData.slice(24, encryptedData.length)),
    CBC: fromHex(encryptedData.slice(32, encryptedData.length))
  };

  return { iv: ivs[mode], cipherData: cipherDatas[mode] };
}

async function encrypt(
  key: string,
  mode: string,
  data: string
): Promise<string> {
  const importedKey = await importKey(key, mode);

  const encoder = new TextEncoder();
  const encoded = encoder.encode(data);

  // The iv must never be reused with a given key.
  const iv = IVS[mode];
  const alg = {
    name: MODES[mode],
    iv: iv
  };

  const cipherData = await crypto.subtle.encrypt(alg, importedKey, encoded);

  const cipherDataBuf = new Uint8Array(cipherData);

  const allBuf = new Uint8Array(iv.length + cipherDataBuf.length);
  allBuf.set(iv);
  allBuf.set(cipherDataBuf, iv.length);
  return toHex(allBuf);
}

async function decrypt(
  key: string,
  mode: string,
  encryptedData: string
): Promise<ArrayBuffer> {
  const importedKey = await importKey(key, mode);

  const parsedEncryptedData = parseEncryptedData(encryptedData, mode);
  const alg = {
    name: MODES[mode],
    iv: parsedEncryptedData.iv
  };

  return await crypto.subtle.decrypt(
    alg,
    importedKey,
    parsedEncryptedData.cipherData
  );
}

// CBC Encrypt
export function encryptWithAes128Cbc(
  key: string,
  data: string
): Promise<string> {
  const mode = 'CBC';
  validateKeyAndMode(mode, key, 128);
  return encrypt(key, mode, data);
}

// not yet supported
export function encryptWithAes192Cbc(
  key: string,
  data: string
): Promise<string> {
  const mode = 'CBC';
  validateKeyAndMode(mode, key, 192);
  return encrypt(key, mode, data);
}

export function encryptWithAes256Cbc(
  key: string,
  data: string
): Promise<string> {
  const mode = 'CBC';
  validateKeyAndMode(mode, key, 256);
  return encrypt(key, mode, data);
}

// CBC Decrypt
export function decryptWithAes128Cbc(
  key: string,
  encryptedData: string
): Promise<ArrayBuffer> {
  const mode = 'CBC';
  validateKeyAndMode(mode, key, 128);
  return decrypt(key, mode, encryptedData);
}

// not yet supported
export function decryptWithAes192Cbc(
  key: string,
  encryptedData: string
): Promise<ArrayBuffer> {
  const mode = 'CBC';
  validateKeyAndMode(mode, key, 192);
  return decrypt(key, mode, encryptedData);
}

export function decryptWithAes256Cbc(
  key: string,
  encryptedData: string
): Promise<ArrayBuffer> {
  const mode = 'CBC';
  validateKeyAndMode(mode, key, 256);
  return decrypt(key, mode, encryptedData);
}

// GCM Encrypt
export function encryptWithAes128Gcm(
  key: string,
  data: string
): Promise<string> {
  const mode = 'GCM';
  validateKeyAndMode(mode, key, 128);
  return encrypt(key, mode, data);
}

// not yet supported
export function encryptWithAes192Gcm(
  key: string,
  data: string
): Promise<string> {
  const mode = 'GCM';
  validateKeyAndMode(mode, key, 192);
  return encrypt(key, mode, data);
}

export function encryptWithAes256Gcm(
  key: string,
  data: string
): Promise<string> {
  const mode = 'GCM';
  validateKeyAndMode(mode, key, 256);
  return encrypt(key, mode, data);
}

// GCM Decrypt
export function decryptWithAes128Gcm(
  key: string,
  encryptedData: string
): Promise<ArrayBuffer> {
  const mode = 'GCM';
  validateKeyAndMode(mode, key, 128);
  return decrypt(key, mode, encryptedData);
}

// not yet supported
export function decryptWithAes192Gcm(
  key: string,
  encryptedData: string
): Promise<ArrayBuffer> {
  const mode = 'GCM';
  validateKeyAndMode(mode, key, 192);
  return decrypt(key, mode, encryptedData);
}

export function decryptWithAes256Gcm(
  key: string,
  encryptedData: string
): Promise<ArrayBuffer> {
  const mode = 'GCM';
  validateKeyAndMode(mode, key, 256);
  return decrypt(key, mode, encryptedData);
}

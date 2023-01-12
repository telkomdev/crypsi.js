import { DIGEST, toHex } from '../utils';

const HMAC_MIN_KEY_SIZE = 32;

async function importKey(rawKey: string, hashAlg: string): Promise<CryptoKey> {
  if (rawKey.length < HMAC_MIN_KEY_SIZE) {
    throw new Error(`min key length must be ${HMAC_MIN_KEY_SIZE} bytes length`);
  }

  const encoder = new TextEncoder();
  return await crypto.subtle.importKey(
    'raw',
    encoder.encode(rawKey),
    {
      name: 'HMAC',
      hash: hashAlg
    },
    false,
    ['sign', 'verify']
  );
}

async function mac(
  key: string,
  hashAlg: string,
  data: Uint8Array
): Promise<Uint8Array> {
  const importedKey = await importKey(key, hashAlg);

  const signature = await crypto.subtle.sign('HMAC', importedKey, data);
  return new Uint8Array(signature);
}

export async function sha1(
  key: string,
  data: Uint8Array
): Promise<string> {
  if (typeof data == 'string') {
    const encoder = new TextEncoder();
    data = encoder.encode(data);
  }

  const buf = await mac(key, DIGEST['SHA-1'], data);
  return toHex(buf);
}

export async function sha256(
  key: string,
  data: Uint8Array
): Promise<string> {
  if (typeof data == 'string') {
    const encoder = new TextEncoder();
    data = encoder.encode(data);
  }

  const buf = await mac(key, DIGEST['SHA-256'], data);
  return toHex(buf);
}

export async function sha384(
  key: string,
  data: Uint8Array
): Promise<string> {
  if (typeof data == 'string') {
    const encoder = new TextEncoder();
    data = encoder.encode(data);
  }

  const buf = await mac(key, DIGEST['SHA-384'], data);
  return toHex(buf);
}

export async function sha512(
  key: string,
  data: Uint8Array
): Promise<string> {
  if (typeof data == 'string') {
    const encoder = new TextEncoder();
    data = encoder.encode(data);
  }

  const buf = await mac(key, DIGEST['SHA-512'], data);
  return toHex(buf);
}

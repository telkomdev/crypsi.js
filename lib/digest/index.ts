import { DIGEST, toHex } from '../utils';

async function digest(alg: string, data: Uint8Array): Promise<Uint8Array> {
  const hash = await crypto.subtle.digest(alg, data);
  return new Uint8Array(hash);
}

export async function sha1(
  data: string | Uint8Array
): Promise<string> {
  if (typeof data == 'string') {
    const encoder = new TextEncoder();
    data = encoder.encode(data);
  }

  const buf = await digest(DIGEST['SHA-1'], data);
  return toHex(buf);
}

export async function sha256(
  data: string | Uint8Array
): Promise<string> {
  if (typeof data == 'string') {
    const encoder = new TextEncoder();
    data = encoder.encode(data);
  }

  const buf = await digest(DIGEST['SHA-256'], data);
  return toHex(buf);
}

export async function sha384(
  data: string | Uint8Array
): Promise<string> {
  if (typeof data == 'string') {
    const encoder = new TextEncoder();
    data = encoder.encode(data);
  }

  const buf = await digest(DIGEST['SHA-384'], data);
  return toHex(buf);
}

export async function sha512(
  data: string | Uint8Array
): Promise<string> {
  if (typeof data == 'string') {
    const encoder = new TextEncoder();
    data = encoder.encode(data);
  }

  const buf = await digest(DIGEST['SHA-512'], data);
  return toHex(buf);
}

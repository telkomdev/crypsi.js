import { 
    aes,
    digest,
    hmac,
    rsa,
    fromHex,
    toHex
  } from 'crypsi.js';
  
  import { useState } from 'react';
  
  var key128 = 'abc$#128djdyAgbj';
  var key192 = 'abc$#128djdyAgbjau&YAnmc';
  var key256 = 'abc$#128djdyAgbjau&YAnmcbagryt5x';
  
  var privateKey = '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCnc3+gRvTVfR01\nVU54DkytnXuUEd5FFgwJRnpJHL62K9a1llee9t9OVJSmxqRVVDOdgXt0ZJ73QJvA\nsoPi6jSUiAi5McSNa+LvuKmzs1EAFTKn9Zv5/2B6Ua0JYj5Wv30wxaTby8DLflvc\nR4fuEx2PQkz+t0mAQmhRpbIcxwBta+Q8kzWgQLdo9dO97yJoX7iCdggk0pgywtXd\nUeX22GzjKxZQEen/vZl6y/5EQEVYJSyWeCy25w6B1QVhZzabxSPxTbZ+fpEuyysE\nfy4WtRqRMUaqWomsXadSz/XXi1NzyFbsU+O9XN6peHkIhvxGXlhMaH9LHV26BCOV\nwpflSi0xAgMBAAECggEACCx0G1+7Tbx4s4TBesy/422ffZ/NqLOlzMIa7/yuNng3\nV8/J4SGNzuYEB4wEs4GTr2mFnC3ZMJp/v8028NmbzXBCdL/AJ2MPxcHOzs2+83EV\ncutjPLXBgNcBykZ4YoWgV8QeAviUJZq6Yys+sFlQhRCob3qE5PTY4Ltk0VDJbY3V\nc9NGMIUswA3cMGPsEvxZjqYXSbNuHY9mBZGDzsEUe9JeYXEzErp68lf2lxAwP88e\nv3NutIe4aNNLkEqJJ5Ru6d5DlUAx61wDwiB18h/bCSeM65cKLCKwk5dxEr2QjRor\nAissOESdnzt7cMXqVX30Skotz0WBifgf4rnWb4vxnQKBgQDS9ZQizinpgKjam+fG\nSGPhDxnK+JTdqO09SLfhdWcJhLPFvuqMpRBsDMMx1dlEs43Kb/qZZ+PklKx2Slz5\nXe37UmY+RCpGXz+cGe5PIVP0l35wbI/wB60iwNdCzdQhXC3O7FjmdGY/B7Sxaovr\nuHnYT2hZpr1rBCb/CvqxNoqcXwKBgQDLM+Rsi47R+Gq5F8bSkb7RsF4VqDjxHcJs\naMj2UdZH2Sf+ZX5kAIYmuMjxpAltox8PrcxjN3Nxlct1b2Ew1BSUEfdHSpeUY609\nR4mVNWpWoTlaWfaiCCvwgF1RUBYpeeWV+jRBl1IuVCHV11SGKI7Pg3wth0zq1HXX\nkezcFqugbwKBgETtUmJw5AbUL9eFmxwRKPku+ulzgQhPmnwsl1AGEQ1uG2Lf9zjO\n8eer39cXnS6yUAC1x7Z52F8mKJdZwrkDdK9qA9gSY5Gsq1bwrgmSxSCkov5OqlTt\n3Sb+xRahs87WlG0Ikh9yJrovZV2Wh3MUSlNf1qN8NGWT7L3mM3TVckKXAoGAMQX0\n7ucAbtGy1bLRyc1VrvsQx8LM8gbO+B6TlTGLM8xFJM/RnUivFLpx6DI+ABBhlwPE\nEo+3L0kHS+6yEPipekuXT8DELw2ZJvaST8gSPpIo5w5bPR4hk6U0XkCnCBybcgJq\nBwT906WCgDex8afpRFEhbU5+FQ1q3LYc4cAqacsCgYBEO9Lmukp8fIhPzstAlKfp\npT5bgq4txy0J7tcZF25ci/vTrRCMyc5dNR2W+y6qRf9Rjqa0ujctGk003cnH2SoQ\nwjGzLum+qS0aU3KNHgtj3BcZSnuwfERgfMKwexUYX/2U4bSSo0OFSPnZVzq5APKe\nDWAGE8aMiyiHnjPTC1rarg==\n-----END PRIVATE KEY-----\n';
  var publicKey = '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp3N/oEb01X0dNVVOeA5M\nrZ17lBHeRRYMCUZ6SRy+tivWtZZXnvbfTlSUpsakVVQznYF7dGSe90CbwLKD4uo0\nlIgIuTHEjWvi77ips7NRABUyp/Wb+f9gelGtCWI+Vr99MMWk28vAy35b3EeH7hMd\nj0JM/rdJgEJoUaWyHMcAbWvkPJM1oEC3aPXTve8iaF+4gnYIJNKYMsLV3VHl9ths\n4ysWUBHp/72Zesv+REBFWCUslngstucOgdUFYWc2m8Uj8U22fn6RLssrBH8uFrUa\nkTFGqlqJrF2nUs/114tTc8hW7FPjvVzeqXh5CIb8Rl5YTGh/Sx1dugQjlcKX5Uot\nMQIDAQAB\n-----END PUBLIC KEY-----\n';
  
  function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const [usernameOut, setUsernameOut] = useState('');
    const [encryptedPassword, setEncryptedPassword] = useState('');
    const [decryptedPassword, setDecryptedPassword] = useState('');
  
    const [data, setData] = useState('');
    const [signature, setSignature] = useState('');
    const [signatureValid, setSignatureValid] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setUsernameOut(username);
  
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
  
      // AES Encryption
      // const encryptedPassword = await aes.encryptWithAes256Gcm(key256, password);
      // setEncryptedPassword(encryptedPassword);
  
      // RSA Encryption
      const encryptedPassword = await rsa.encryptWithOAEPSha256(publicKey, encoder.encode(password));
      setEncryptedPassword(toHex(new Uint8Array(encryptedPassword)));
  
      // AES Decryption
      // const decryptedPassword = await aes.decryptWithAes256Gcm(key256, encryptedPassword);
      // setDecryptedPassword(decoder.decode(decryptedPassword));
  
      // RSA Decryption
      const decryptedPassword = await rsa.decryptWithOAEPSha256(privateKey, fromHex(toHex(new Uint8Array(encryptedPassword))));
      setDecryptedPassword(decoder.decode(decryptedPassword));
  
      // Digest
      console.log(await digest.sha512('wuriyanto'));
      console.log(await digest.sha512(new Uint8Array([0x77, 0x75, 0x72, 0x69, 0x79, 0x61, 0x6E, 0x74, 0x6F])));
      
      // HMAC
      console.log(await hmac.sha512(key256, 'wuriyanto'));
      console.log(await hmac.sha512(key256, new Uint8Array([0x77, 0x75, 0x72, 0x69, 0x79, 0x61, 0x6E, 0x74, 0x6F])));
      
    }; 
  
    const handleSubmitSignData = async (e) => {
      e.preventDefault();
  
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      console.log(data)
      
      const signatureArrayBuff = await rsa.signWithPssSha512(privateKey, encoder.encode(data));
      setSignature(toHex(new Uint8Array(signatureArrayBuff)));
    };
  
    const handleSubmitVerifySignature = async (e) => {
      e.preventDefault();
  
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      console.log(data)
      
      const valid = await rsa.verifySignatureWithPssSha512(publicKey, fromHex(signature), encoder.encode(data));
      console.log(valid);
      setSignatureValid(valid);
    };
    return (
      <div>
        <header>
          <h3>Login</h3>
        </header>
        <form>
          <div>
            <label>Username</label>
            <input 
              type="text" 
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
              />
          </div>
  
          <div>
            <label>Password</label>
            <input 
              type="password" 
              id="username"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              />
          </div>
  
          <div>
            <button onClick={handleSubmit}>Login</button>
          </div>
  
          <div>
            <h5>Username: {usernameOut}</h5>
            <h5>Password: {encryptedPassword}</h5>
            <h5>Decrypted Pass: {decryptedPassword}</h5>
          </div>
        </form>
  
        <header>
          <h3>Sign Data</h3>
        </header>
        <form>
          <div>
            <label>Data</label>
            <input 
              type="text" 
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required={true}
              />
          </div>
  
          <div>
            <button onClick={handleSubmitSignData}>Sign Data</button>
          </div>
  
          <div>
            <h5>Signature: {signature}</h5>
          </div>
        </form>
  
        <header>
          <h3>Verify Signature</h3>
        </header>
        <form>
          <div>
            <label>Data</label>
            <input 
              type="text" 
              id="signature"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              required={true}
              />
          </div>
  
          <div>
            <button onClick={handleSubmitVerifySignature}>Verify</button>
          </div>
  
          <div>
            <h5>Signature valid ? : {signatureValid ? 'valid':'invalid'}</h5>
          </div>
        </form>
      </div>
    );
  }
  
  export default App;
  
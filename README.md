## CrypsiJs (Crypto utilities for React and Web Browsers)

### Install

```shell
$ npm i crypsi.js
```

### Usage Reactjs
```javascript
import { digest } from 'crypsi.js';

const handleSubmit = async (e) => {
    console.log(await digest.sha256('wuriyanto')); // 7da544fa170151239b9886c0c905736fe3e8b07e68aefaba0633272aee47af87
};
```

### Usage Browser globals
Please adjust the version `@0.0.0` based on https://github.com/telkomdev/crypsi.js/releases

```html
<head>
    <script src="https://cdn.jsdelivr.net/gh/telkomdev/crypsi.js@1.0.1/dist/crypsi.min.js"></script>
</head>
```

Now `crypsi` will be available in the global object
```javascript
<script>
    crypsi.digest.sha256('wuriyanto').then(function(res) {
        console.log(res); // 7da544fa170151239b9886c0c905736fe3e8b07e68aefaba0633272aee47af87
    });
</script>
```

### CrypsiJs is compatible with each other with the following `server side` libraries
- Golang https://github.com/telkomdev/go-crypsi
- Python https://github.com/telkomdev/pycrypsi
- NodeJs https://github.com/telkomdev/crypsi 
- C# (.NET) https://github.com/telkomdev/NetCrypsi

### Features
- Asymmetric encryption with RSA
- Generate RSA private and public key
- Digital Signature with RSA private and public key using PSS
- Symmetric encryption with AES
- Message authentication code with HMAC
- Generate Hash with Common DIGEST Algorithm

var enc = {
    aesEncrypt: function (plain, key) {
        return CryptoJS.AES.encrypt(plain, key);
    },

    aesDecrypt: function (encrypted, key) {
        return CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
    },

    rsaEncrypt: function (plain, publicKey) {
        var rsa = home._createRSA();
        rsa.publicKeyBytes(base64x_decode(publicKey));

        if (!home.publicCheckEncryption(rsa, plain)) {
            throw 'Bad key or plain text given.';
        }

        var encrypted;
        try {
            encrypted = base64x_encode(rsa.publicEncrypt(ge('-test-plain').value));
        } catch (e) {
            alert(e);
        }

        return encrypted;
    },

    rsaDecrypt: function (encrypted, privateKey, callback) {
        var rsa = home._createRSA();
        rsa.privateKeyBytes(base64x_decode(privateKey));

        try {
            rsa.privateDecryptAsync(encrypted, function (c) {
                // Progress
            }, function (result) {
                console.warn(result);
                callback(utf82str(result));
            }, function () {
                // Done
            });
        } catch ( e ) {
             alert(e);
        }
    },

    splitter: '###',

    encrypt: function (plain, publicKey) {
        var randomString = function () {return Math.random().toString(36).substring(2);};
        var sessionKey = randomString() + randomString();

        console.warn('Session key: ', sessionKey);

        var encryptedSessionKey = enc.rsaEncrypt(sessionKey, publicKey);
        var encryptedMessage = enc.aesEncrypt(plain, sessionKey);

        return encryptedSessionKey + enc.splitter + encryptedMessage;
    },

    decrypt: function (encrypted, privateKey, callback) {
        var splitterPosition = encrypted.search(enc.splitter);
        var encryptedSessionKey = encrypted.substring(0, splitterPosition);
        var encryptedMessage = encrypted.substring(splitterPosition + enc.splitter.length)

        console.warn(encryptedSessionKey, encryptedMessage);

        enc.rsaDecrypt(encryptedSessionKey, privateKey, function (sessionKey) {
            console.warn('Session key: ', sessionKey);
            callback(enc.aesDecrypt(encryptedMessage, sessionKey));
        });
    }
};

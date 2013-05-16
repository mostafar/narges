
function Encryption(publicKey, privateKey) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
}

Encryption.prototype = {
    splitter: '###',

    aesEncrypt: function (plain, key) {
        return CryptoJS.AES.encrypt(plain, key);
    },

    aesDecrypt: function (encrypted, key) {
        return CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
    },

    _createRSA: function () {
        var rsa = new RSA();
//        rsa.messageFormat = RSAMessageFormatSOAEP;
        rsa.messageFormat = RSAMessageFormatBitPadding;
        return rsa;
    },

    _publicCheckEncryption: function (rsa, message) {
		var maxsize= rsa.publicEncryptMaxSize();
		var size = str2utf8(message).length;

		if ( maxsize < size ) {
		    alert("text length (" + size + ") exceeds the maximum length(" + maxsize + ") for this RSA key");
		    return false;
		}
		return true;
    },

    rsaEncrypt: function (plain, publicKey) {
        var rsa = this._createRSA();
        rsa.publicKeyBytes(base64x_decode(publicKey));

        if (!this._publicCheckEncryption(rsa, plain)) {
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
        var rsa = this._createRSA();
        rsa.privateKeyBytes(base64x_decode(privateKey));

        try {
            rsa.privateDecryptAsync(encrypted, function (c) {
                // Progress
            }, function (result) {
                callback(utf82str(result));
            }, function () {
                // Done
            });
        } catch ( e ) {
             alert(e);
        }
    },

    encrypt: function (plain) {
        var randomString = function () {return Math.random().toString(36).substring(2);};
        var sessionKey = randomString() + randomString();

        var encryptedSessionKey = this.rsaEncrypt(sessionKey, this.publicKey);
        var encryptedMessage = this.aesEncrypt(plain, sessionKey);

        return encryptedSessionKey + this.splitter + encryptedMessage;
    },

    decrypt: function (encrypted, callback) {
        var splitterPosition = encrypted.search(this.splitter);
        var encryptedSessionKey = encrypted.substring(0, splitterPosition);
        var encryptedMessage = encrypted.substring(splitterPosition + this.splitter.length)

        this.rsaDecrypt(encryptedSessionKey, this.privateKey, function (sessionKey) {
            callback(this.aesDecrypt(encryptedMessage, sessionKey));
        }.bind(this));
    }
};

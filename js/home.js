
var home = {
    _createRSA: function () {
        var rsa = new RSA();
//        rsa.messageFormat = RSAMessageFormatSOAEP;
        rsa.messageFormat = RSAMessageFormatBitPadding;
        return rsa;
    },

    publicCheckEncryption: function (rsa, message) {
		var maxsize= rsa.publicEncryptMaxSize();
		var size = str2utf8(message).length;

		if ( maxsize < size ) {
		    alert( "text length ("+size+") exceeds the maximum length("+maxsize+") for this RSA key" );
		    return false;
		}
		return true;
    },

    encrypt: function () {
        getOrCreate('mykey', function (mykey) {
            var rsa = home._createRSA();
            rsa.publicKeyBytes(base64x_decode(mykey.public));
            if (!home.publicCheckEncryption(rsa, ge('-test-plain').value)) {
                return;
            }
            try {
                ge('-test-encrypted').value = base64x_encode(rsa.publicEncrypt(ge('-test-plain').value));
            } catch (e) {
                alert(e);
            }
        });
    },

    decrypt: function () {
        getOrCreate('mykey', function (mykey) {
            var rsa = home._createRSA();
            rsa.privateKeyBytes(base64x_decode(mykey.private));
            try {
                rsa.privateDecryptAsync(ge('-test-encrypted').value, function (c) {
                    // Progress
                }, function (result) {
                    ge('-test-plain').value = utf82str(result);
                }, function () {
                    // Done
                });
            } catch ( e ) {
                 alert(e);
            }
        });
    }
};

onLoadTasks.push(function () {
    bindEventByID('-btn-test-encrypt', 'click', home.encrypt);
    bindEventByID('-btn-test-decrypt', 'click', home.decrypt);
});

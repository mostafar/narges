/**
 * @namespace test Encrypt and Decrypt user data to test encryption methods.
 */
var test = {
    /**
     * Read data from plain text area, encrypt it and put it in encrypted text area.
     */
    encrypt: function () {
        enc = new Encryption(mykey.public, mykey.private);

        ge('-test-encrypted').value = enc.encrypt(ge('-test-plain').value);
    },

    /**
     * Read data from encrypted text area, decrypt it and put it in plain text area.
     */
    decrypt: function () {
        enc = new Encryption(mykey.public, mykey.private);

        enc.decrypt(ge('-test-encrypted').value, function (plain) {
            ge('-test-plain').value = plain;
        });
    },

    /**
     * Bind click event of test page to functions.
     */
    bindButtonEvents: function () {
        bindEventByID('-btn-test-encrypt', 'click', test.encrypt);
        bindEventByID('-btn-test-decrypt', 'click', test.decrypt);
    }
};

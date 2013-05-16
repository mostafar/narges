
var test = {
    encrypt: function () {
        enc = new Encryption(mykey.public, mykey.private);

        ge('-test-encrypted').value = enc.encrypt(ge('-test-plain').value);
    },

    decrypt: function () {
        enc = new Encryption(mykey.public, mykey.private);

        enc.decrypt(ge('-test-encrypted').value, function (plain) {
            ge('-test-plain').value = plain;
        });
    }
};

onLoadTasks.push(function () {
    bindEventByID('-btn-test-encrypt', 'click', test.encrypt);
    bindEventByID('-btn-test-decrypt', 'click', test.decrypt);
});

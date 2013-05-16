
var mykey = {
    public: null,
    private: null,

    save: function () {
        var pub = ge('-mykey-public').value,
            pvt = ge('-mykey-private').value;

        if (!pub || !pvt) {
            alert('Bad keys entered.');
        }

        storage.set({mykey: {
            public: pub,
            private: pvt
        }}, function () {

        })
    },

    generate: function () {
        rsaKey = new RSA();
		timerID = rsaKey.generateAsync(512, 65537, function (c) {
            // Progress
        }, function (rsa) {
            // Result
        }, function () {
            var pub = ge('-mykey-public'),
                pvt = ge('-mykey-private');

            pub.value = base64x_encode(rsaKey.publicKeyBytes());
            pvt.value = base64x_encode(rsaKey.privateKeyBytes());

            storage.set({mykey: {
                public: pub.value,
                private: pvt.value
            }});
        });
    },

    refreshKeys: function () {
        getOrCreate('mykey', function (mykey) {
            this.public = mykey.public;
            this.private = mykey.private;

            var pub = ge('-mykey-public'),
                pvt = ge('-mykey-private');

            pub.value = this.public ? this.public : '';
            pvt.value = this.private ? this.private : '';
        }.bind(this));
    }
};

onLoadTasks.push(function () {
    bindEventByID('-btn-mykey-save', 'click', mykey.save);
    bindEventByID('-btn-mykey-generate', 'click', mykey.generate);

    chrome.storage.onChanged.addListener(function(changes, areaName) {
        mykey.refreshKeys();
    });

    mykey.refreshKeys();
});

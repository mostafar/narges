
/**
 * @class MyKeys User's keys (public and private) class, Stores keys and handles UI of options page.
 * @property {string} public The user's public key.
 * @property {string} private The user's private key.
 *
 * @constructor
 * @param {boolean} [bindUI=true] Specifies that class should bind UI events when instantiated or not.
 */
function MyKeys (bindUI) {
    if (bindUI === undefined || bindUI) {
        this.bindButtonEvents();
    }
    this.bindDataEvents();
}

MyKeys.prototype = {
    public: null,
    private: null,

    /**
     * Save user's public and private keys in Chrome storage.
     * @param {function} [callback] Will be set as storage save callback
     */
    save: function (callback) {
        var pub = ge('-mykey-public').value,
            pvt = ge('-mykey-private').value;

        if (!pub || !pvt) {
            alert('Bad keys entered.');
        }

        storage.set({mykeys: {
            public: pub,
            private: pvt
        }}, callback)
    },

    /**
     * Generates a pair of public and private keys for user and put them in corresponding text areas.
     * @param {function} [callback] Will be called when generation finished.
     */
    generate: function (callback) {
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

            if (callback) callback();
        });
    },

    /**
     * Reloads public and private keys from Chrome storage and also update corresponding text areas.
     * @param {function} [callback] Will be called when update has finished.
     */
    refreshKeys: function (callback) {
        getOrCreate('mykeys', function (mykey) {
            this.public = mykey.public;
            this.private = mykey.private;

            var pub = ge('-mykey-public'),
                pvt = ge('-mykey-private');

            pub.value = this.public ? this.public : '';
            pvt.value = this.private ? this.private : '';

            if (callback) callback();
        }.bind(this));
    },

    /**
     * Binds Chrome's storage onchange event to refresh function.
     */
    bindDataEvents: function () {
        chrome.storage.onChanged.addListener(function(changes, areaName) {
            mykey.refreshKeys();
        });

        mykey.refreshKeys();
    },

    /**
     * Binds save and generate buttons click events to corresponding functions.
     */
    bindButtonEvents: function () {
        bindEventByID('-btn-mykeys-save', 'click', mykey.save);
        bindEventByID('-btn-mykeys-generate', 'click', mykey.generate);
    }
};

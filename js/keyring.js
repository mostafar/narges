
function KeyRing (bindUI) {
    if (bindUI === undefined || bindUI) {
        this.bindButtonsEvents();
    }
    this.bindDataEvents();
}

KeyRing.prototype = {
    friends: {},

    saveFriend: function () {
        var email = ge('-friend-email').value,
            key = ge('-friend-key').value;

        if (!email || !key) {
            alert('Bad email and/or key entered.');
            return;
        }

        console.warn(this.friends);

        this.friends[email] = {
            email: email,
            key: key
        };

        this.save();
    },

    removeFriend: function () {
        var email = ge('-friend-email').value;

        if (!email) {
            alert('Bad email entered.');
            return;
        }

        if (this.friends[email] === undefined) {
            alert('Friend not found.');
            return;
        }

        delete this.friends[email];

        this.save();
    },

    getSelectedFriend: function () {
        var list = ge('-friends-list');

        return _.find(list.childNodes, function (friend) {
            return friend.selected;
        });
    },

    selectFriend: function () {
        var selectedFriend = this.getSelectedFriend();

        if (selectedFriend) {
            var friend = this.friends[selectedFriend.innerHTML];

            ge('-friend-email').value = friend.email;
            ge('-friend-key').value = friend.key;
        }
    },

    refreshList: function () {
        this.load(function () {
            var list = ge('-friends-list');

            list.innerHTML = '';
            _.each(this.friends, function (friend) {
                option = document.createElement('option');
                option.innerHTML = friend.email;
                list.appendChild(option);
            })
        }.bind(this));
    },

    load: function (callback) {
        getOrCreate('friends', function (friends) {
            this.friends = friends ? friends : {};
            callback();
        }.bind(this));
    },

    save: function () {
        storage.set({friends: this.friends}, function () {
        })
    },

    bindButtonsEvents: function () {
        bindEventByID('-btn-friend-save', 'click', keyring.saveFriend.bind(this));
        bindEventByID('-btn-friend-remove', 'click', keyring.removeFriend.bind(this));
        bindEventByID('-friends-list', 'change', keyring.selectFriend.bind(this));
    },

    bindDataEvents: function () {
        chrome.storage.onChanged.addListener(function(changes, areaName) {
            keyring.refreshList();
        });

        keyring.refreshList();
    }
};


var keyring = {
    saveFriend: function () {
        email = ge('-friend-email').value;
        key = ge('-friend-key').value;

        if (!email || !key) {
            alert('Bad email and/or key entered.');
            return;
        }

        getOrCreate('friends', function (friends) {
            friends[email] = {
                email: email,
                key: key
            }

            storage.set({friends: friends}, function () {
            })
        });
    },

    removeFriend: function () {
        email = ge('-friend-email').value;

        if (!email) {
            alert('Bad email entered.');
            return;
        }

        getOrCreate('friends', function (friends) {
            if (friends[email] === undefined) {
                alert('Friend not found.');
                return;
            }

            delete friends[email];
            storage.set({friends: friends}, function () {
            })
        });
    },

    refreshList: function () {
        var list = ge('-friends-list');

        list.innerHTML = '';
        getOrCreate('friends', function (friends) {
            _.each(friends, function (friend) {
                option = document.createElement('option');
                option.innerHTML = friend.email;
                list.appendChild(option);
            })
        });
    },

    getSelectedFriend: function () {
        var list = ge('-friends-list');

        return _.find(list.childNodes, function (friend) {
            return friend.selected;
        });
    },

    selectFriend: function () {
        var selectedFriend = keyring.getSelectedFriend();

        if (selectedFriend) {
            getOrCreate('friends', function (friends) {
                var friend = friends[selectedFriend.innerHTML];

                ge('-friend-email').value = friend.email;
                ge('-friend-key').value = friend.key;
            });
        }
    }
}

onLoadTasks.push(function () {
    bindEventByID('-btn-friend-save', 'click', keyring.saveFriend);
    bindEventByID('-btn-friend-remove', 'click', keyring.removeFriend);
    bindEventByID('-friends-list', 'change', keyring.selectFriend);
    chrome.storage.onChanged.addListener(function(changes, areaName) {
        keyring.refreshList();
    });

    keyring.refreshList();
});

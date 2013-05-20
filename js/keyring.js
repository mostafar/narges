/*
    Narges - PGP-like encryption tool as a Chrome extension.
    Copyright (C) 2013  Mostafa Rokooie <mostafa.rokooie@gmail.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


/**
 * @class KeyRing User's keyring class, Stores friends' public keys and handles UI of options page.
 * @property {object} friends The keyring.
 *
 * @constructor
 * @param {boolean} [bindUI=true] Specifies that class should bind UI events when instantiated or not.
 */
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

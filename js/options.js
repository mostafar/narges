var onLoadTasks = [];  // List of functions, call all of them on DOM load

var PopupController = function () {
    this.save_button = document.getElementById('save');
    this.load_button = document.getElementById('load');
    this.textbox = document.getElementById('data');

    this.init();
};

PopupController.prototype = {
    save_button: null,
    load_button: null,
    textbox: null,

    init: function () {
        this.save_button.addEventListener('click', this.save.bind(this));
        this.load_button.addEventListener('click', this.load.bind(this));
    },

    save: function () {
        chrome.storage.local.set({'user_data': this.textbox.value}, function () {
            this.textbox.value = 'Saved :)';
        }.bind(this));
    },

    load: function () {
        chrome.storage.local.get('user_data', function (items) {
            this.textbox.value = items.user_data;
        }.bind(this));
    }
};

function changePage(page) {
    var pages = ['home', 'keyring', 'mykey'];

    for (var i = 0; i < pages.length; i++) {
        document.getElementById(pages[i] + 'Page').style.display = (pages[i] == page) ? 'block' : 'none';
    }
}

onLoadTasks.push(function () {
    document.getElementById('-sidebar-home').addEventListener('click', function () {changePage('home');});
    document.getElementById('-sidebar-keyring').addEventListener('click', function () {changePage('keyring');});
    document.getElementById('-sidebar-mykey').addEventListener('click', function () {changePage('mykey');});
});

document.addEventListener('DOMContentLoaded', function () {
    _.each(onLoadTasks, function (task) {
        task();
    });
});

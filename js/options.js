var onLoadTasks = [];  // List of functions, call all of them on DOM load
var keyring = null;

function changePage(page) {
    var pages = ['home', 'keyring', 'mykey'];

    for (var i = 0; i < pages.length; i++) {
        document.getElementById(pages[i] + 'Page').style.display = (pages[i] == page) ? 'block' : 'none';
    }
}

onLoadTasks.push(function () {
    keyring = new KeyRing();
    keyring.bindButtonsEvents();
    keyring.bindDataEvents();

    document.getElementById('-sidebar-home').addEventListener('click', function () {changePage('home');});
    document.getElementById('-sidebar-keyring').addEventListener('click', function () {changePage('keyring');});
    document.getElementById('-sidebar-mykey').addEventListener('click', function () {changePage('mykey');});
});

document.addEventListener('DOMContentLoaded', function () {
    _.each(onLoadTasks, function (task) {
        task();
    });
});

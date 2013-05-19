var onLoadTasks = [],  // List of functions, call all of them on DOM load
    keyring = null,
    mykeys = null;

function changePage(page) {
    var pages = ['home', 'keyring', 'mykeys'];

    for (var i = 0; i < pages.length; i++) {
        document.getElementById(pages[i] + 'Page').style.display = (pages[i] == page) ? 'block' : 'none';
    }
}

onLoadTasks.push(function () {
    keyring = new KeyRing();
    mykeys = new MyKeys();

    document.getElementById('-sidebar-home').addEventListener('click', function () {changePage('home');});
    document.getElementById('-sidebar-keyring').addEventListener('click', function () {changePage('keyring');});
    document.getElementById('-sidebar-mykeys').addEventListener('click', function () {changePage('mykeys');});
});

document.addEventListener('DOMContentLoaded', function () {
    _.each(onLoadTasks, function (task) {
        task();
    });
});

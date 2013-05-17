var onLoadTasks = [];  // List of functions, call all of them on DOM load
var keyring = null;

onLoadTasks.push(function () {
    keyring = new KeyRing();
    keyring.bindDataEvents();
});

document.addEventListener('DOMContentLoaded', function () {
    _.each(onLoadTasks, function (task) {
        task();
    });
});

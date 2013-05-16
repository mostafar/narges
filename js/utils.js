function ge(id) {
    return document.getElementById(id);
}

function bindEventByID (id, event, callback) {
    ge(id).addEventListener(event, callback);
}

var storage = chrome.storage.local;

var getOrCreate = function (field, callback) {
    var defaultValue = {};

    storage.get(field, function (data) {
        if (data[field] === undefined) {
            storage.set({field: defaultValue}, function () {
                callback(defaultValue);
            })
        }
        else {
            callback(data[field]);
        }
    });
};

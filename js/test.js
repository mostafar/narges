
var test = {
};

onLoadTasks.push(function () {
    bindEventByID('-btn-test-encrypt', 'click', test.encrypt);
    bindEventByID('-btn-test-decrypt', 'click', test.decrypt);
});

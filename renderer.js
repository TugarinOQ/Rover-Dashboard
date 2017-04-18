// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let loadedDashboard = require('./app/modules/dashboard.js');

let car = {
    model: 400
};

function replaceModel() {

    d3.select('#model')
        .html(car.model);
}

function init() {

    replaceModel();

    setTimeout(loadedDashboard, 2500);
}

init();
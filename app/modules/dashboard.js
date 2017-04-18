function insertFuel() {

    let fuel = d3.select('.dashboard')
        .append('div')
        .classed('circle', true)
        .classed('fuel', true);

    fuel
        .append('div')
        .classed('innerBorder', true);

    let ticksModule = require('./ticks.module.js');
    let arrowModule = require('./arrow.module.js');

    let props = {
        angle: {
            start: 55,
            end: 250
        },
        min: 0,
        max: 8,
        maxFake: 1,
        onlyFinal: true,
        hideFinal: true,

        inBetween: 0,
        redZone: [1, 10],

        progress: 0,

        parent: fuel
    };

    arrowModule.generateArrow(props);
    ticksModule.generateTicks(props);

    setTimeout(() => {
        props.progress = 42;

        arrowModule.generateArrow(props);
        ticksModule.generateTicks(props);
    }, 5000);
}

function insertSpeedometer() {

    let speedometer = d3.select('.dashboard')
        .append('div')
        .attr('id', 'speedometer')
        .classed('circle', true)
        .classed('big', true)
        .classed('speedometer', true);

    speedometer
        .append('div')
        .classed('innerBorder', true);

    let ticksModule = require('./ticks.module.js');
    let arrowModule = require('./arrow.module.js');

    let props = {
        angle: {
            start: 55,
            end: 250
        },
        min: 0,
        max: 200,

        inBetween: 4,
        style: 'beautiful',

        progress: 0,

        parent: speedometer
    };

    arrowModule.generateArrow(props);
    ticksModule.generateTicks(props);

    setTimeout(() => {
        setInterval(() => {

            props.progress += (props.progress >= 0 && props.progress < 130) ? 1 : -1;

            arrowModule.generateArrow(props);
            ticksModule.generateTicks(props);
        }, 50);
    }, 5000);
}

function insertTachometer() {

    let tachometer = d3.select('.dashboard')
        .append('div')
        .classed('circle', true)
        .classed('big', true)
        .classed('tachometer', true);

    tachometer
        .append('div')
        .classed('innerBorder', true);

    let ticksModule = require('./ticks.module.js');
    let arrowModule = require('./arrow.module.js');

    let props = {
        angle: {
            start: 55,
            end: 250
        },
        min: 0,
        max: 8,

        inBetween: 4,
        style: 'beautiful',

        progress: 0,

        parent: tachometer
    };

    arrowModule.generateArrow(props);
    ticksModule.generateTicks(props);

    setTimeout(() => {
        setInterval(() => {

            props.progress += (props.progress >= 0 && props.progress < 130) ? 1 : -1;

            arrowModule.generateArrow(props);
            ticksModule.generateTicks(props);
        }, 50);
    }, 5000);
}

function insertEngineTemp() {

    let engineTemp = d3.select('.dashboard')
        .append('div')
        .classed('circle', true)
        .classed('engineTemp', true);

    engineTemp
        .append('div')
        .classed('innerBorder', true);

    let ticksModule = require('./ticks.module.js');
    let arrowModule = require('./arrow.module.js');

    let props = {
        angle: {
            start: 55,
            end: 250
        },
        min: 0,
        max: 8,
        onlyFinal: true,
        hideFinal: true,

        inBetween: 0,
        redZone: [71,80],

        progress: 0,

        parent: engineTemp
    };

    arrowModule.generateArrow(props);
    ticksModule.generateTicks(props);

    setTimeout(() => {
        setInterval(() => {

            props.progress += (props.progress >= 0 && props.progress < 130) ? 1 : -1;

            arrowModule.generateArrow(props);
            ticksModule.generateTicks(props);
        }, 50);
    }, 5000);
}

function dashboard() {

    d3.select('#app')
        .html('')
        .append('div')
        .classed('dashboard', true)
        .classed('animated', true)
        .classed('fadeIn', true);
}

function setNightMode({ enabled }) {

    d3.select('#app')
        .append('div')
        .classed('nightMode', enabled);
}

module.exports = () => {

    let style = undefined;
    // let style = "bmw";

    dashboard();

    switch (style) {
        case "bmw":
            insertFuel();
            insertSpeedometer();
            insertTachometer();
            insertEngineTemp();
            break;
        default:
            insertEngineTemp();
            insertTachometer();
            insertSpeedometer();
            insertFuel();
            break;
    }

    setNightMode({ enabled: false });
};
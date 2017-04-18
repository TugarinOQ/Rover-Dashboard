function generateTicks(props) {

    let start = props.angle.start;
    let end = props.angle.end;
    let min = props.min;
    let max = props.max;
    let inBetween = props.inBetween;
    let parent = props.parent;
    let onlyFinal = props.onlyFinal || false;
    let hideFinal = props.hideFinal || false;
    let maxFake = props.maxFake;

    let redZone = props.redZone;

    let major = parent.select('ticks');

    if (major._groups[0][0] === undefined) {

        major = parent.append('ticks');
    }

    let count = (max > 10) ? parseInt(max / 20) : max;

    const length = ((count * 2) + (count * count));

    const _deg = end / length;

    let tickDeg = start;

    let ticks = [],
        ticksNum = [];

    for (let i = min - 1; i <= length; i++) {

        let _text = undefined;

        if (max > 10) {

            _text = ( i % 10 === 0 ) ? i * 2 : '';
        } else {

            _text = ( i % 10 === 0) ? i / 10 : '';
        }

        if (onlyFinal) {

            _text = ( i === 0) ? '0' : ( i === length) ? maxFake : '';
        }

        _text = (hideFinal) ? '' : _text;

        ticks.push( { deg: tickDeg, idx: i, text: _text } );

        if (!checkMin(i) && !checkMiddle(i)) {

            ticksNum.push( { deg: tickDeg, idx: i, text: _text } );
        }

        tickDeg += _deg;
    }

    let tick = major
        .selectAll('tick')
        .data( ticks )
        .classed('active', (d) => checkActive(d));

    tick
        .enter()
        .append('tick')
        .classed('tick', true)
        .classed('active', (d) => checkActive(d))
        .style('transform', (d) => `rotate(${d.deg}deg)`)
        .append('div')
        .classed('inner', true)
        .classed('transparent', (d) => checkEnd(d.idx + 1))
        .classed('redZone', (d) => checkRedZone(d.idx + 1))
        .classed('middle', (d) => checkMiddle(d.idx + 1))
        .classed('min', (d) => checkMin(d.idx + 1))
        .append('span')
        .style('transform', (d) => `rotate(-${d.deg}deg)`)
        .text((d) => d.text);

    tick
        .exit()
        .remove();

    function checkActive(data, progress) {

        let deg = data.deg;
        let idx = data.idx;

        let arrowDeg = parseFloat(major._groups[0][0].offsetParent.children[1].getAttribute('rotate'));
        let _deg = checkClosest(arrowDeg);

        // if (!checkMiddle(idx) && !checkMin(idx)) {
        //
        //     return deg === _deg;
        // }
        //
        // return false;

        return deg === _deg;
    }

    function checkClosest(num) {

        let closestLeft,
            closestRight,
            data = ticks,
            number = num,
            current;
        for (let i = 0; i < data.length; i++) {
            current = data[i].deg;
            if (current < number && (typeof closestLeft === 'undefined' || closestLeft < current)) {
                closestLeft = current;
            } else if (current > number && (typeof closestRight === 'undefined' || closestRight > current)) {
                closestRight = current;
            }
        }

        return closestLeft;
    }

    function checkEnd(idx) {

        return (idx === length + 1);
    }

    function checkRedZone(idx) {

        if (!redZone) return false;

        return ((idx > redZone[0]) && (idx < redZone[1]));
    }

    function checkMiddle(idx) {

        if (onlyFinal) {

            return false;
        }

        if (idx % 10 === 0) {

            return false;
        } else {

            return ((idx % 5)) === 0;
        }
    }

    function checkMin(idx) {

        if (onlyFinal) {

            return (idx % 10 !== 0 || idx % 5 !== 0);
        } else {

            return !(idx % 10 === 0 || idx % 5 === 0);
        }
    }
}

module.exports = {
    generateTicks
};
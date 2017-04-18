function beautifulArrow(props) {

    let parent = props.parent;
    // props.progress = props.progress * 1.4;

    let deg = props.angle.start + ((props.progress === 0) ? 0 : ( (props.progress * (props.angle.end - props.angle.start)) / 100 ));

    let p = parent
        .selectAll('arrow')
        .data( [ deg ] )
        .attr('rotate', (d) =>  d.toFixed(0))
        .style('transform', (d) => `rotate(${ d }deg)`);

    p
        .enter()
        .append('arrow')
        .classed('arrow', true)
        .classed('beautiful', true)
        .attr('rotate', (d) => d)
        .style('transform', (d) => `rotate(${ d }deg)`);

    p
        .exit()
        .remove();
}

function defaultArrow(props) {

    let parent = props.parent;
    // props.progress = props.progress * 1.4;

    let deg = props.angle.start + ((props.progress === 0) ? 0 : ( (props.progress * (props.angle.end - props.angle.start)) / 100 ));

    let p = parent
        .selectAll('arrow')
        .data( [ deg ] )
        .attr('rotate', (d) => d)
        .style('transform', (d) => `rotate(${ d }deg)`);

    p
        .enter()
        .append('arrow')
        .classed('arrow', true)
        .attr('rotate', (d) => d)
        .style('transform', (d) => `rotate(${ d }deg)`);

    p
        .exit()
        .remove();
}

function generateArrow(props) {

    let style = props.style;

    switch (style) {
        case 'beautiful':
            beautifulArrow(props);
            break;
        default:
            defaultArrow(props);
            break;
    }
}


module.exports = {
    generateArrow
};
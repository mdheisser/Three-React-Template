import React from 'react'
// import ReactDOM from 'react-dom'
// import * as vis from 'vis-timeline/dist/vis-timeline-graph2d.esm'

export default class Timeline extends React.Component {
    timeline;
    options = {
        start: 0,
        end: 24 * 3600 * 1000,
        timeAxis: { scale: 'hour', step: 1 },
        min: 0,
        max: 24 * 3600 * 1000,
        zoomMin: 24 * 3600 * 1000,
        showMajorLabels: false,
        format: {
            minorLabels: {
                hour: 'HH',
            }
        },
    };
    // items = new vis.DataSet([
    //     { id: 1, content: 'sunrise', start: 6 * 3600 * 1000 },
    //     { id: 2, content: 'sunmax', start: 12 * 3600 * 1000 },
    //     { id: 3, content: 'sunset', start: 18 * 3600 * 1000 },
    //     { id: 4, content: 'item 6', start: 20 * 3600 * 1000, type: 'point' }
    // ]);

    constructor(props) {
        super();
        this.props = props;
    }

    componentDidMount() {
        return this.initTimeline();
    }
    render() {
        return <div>
            <div id="mytimeline"></div>
        </div>
    }

    initTimeline() {
        // var container = document.getElementById('mytimeline');
        // this.timeline = new vis.Timeline(container, this.items, this.options);
        // this.timeline.addCustomTime(3600 * 12, 't');
        // this.timeline.on('timechanged', this.props.onTimeChange);

    }
};

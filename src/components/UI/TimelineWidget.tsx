///<reference path="../../../node_modules/vis-timeline/types/index.d.ts" />
///<reference path="../../dts/misc-types-extend.d.ts" />
import React, { useEffect, useRef } from 'react'
import { Timeline } from "vis-timeline/esnext";
import { DataSet } from 'vis-data'
import 'vis-timeline/styles/vis-timeline-graph2d.min.css'
export default ({ onTimeChange }: any) => {
    const container: any = useRef();//document.getElementById('mytimeline');

    let items = new DataSet([
        { id: 1, content: 'sunrise', start: 6 * 3600 * 1000 },
        { id: 2, content: 'sunmax', start: 12 * 3600 * 1000 },
        { id: 3, content: 'sunset', start: 18 * 3600 * 1000 },
        { id: 4, content: 'test', start: 20 * 3600 * 1000, type: 'point' }
    ]);
    items = new DataSet([]);

    const options = {
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

    useEffect(() => {
        let timeline = new Timeline(container.current, items, options);
        timeline.addCustomTime(3600 * 12, 't');
        timeline.on('timechanged', onTimeChange);
    });

    return (
        <div className="timeline"><div ref={container}></div></div>
    )
};

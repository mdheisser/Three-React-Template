import React, { Suspense } from "react";
import { SampleProps, SAMPLE_TYPE } from "../../common/constants";
import * as Samples from "../../samples";

const samples: any = Object.entries(Samples)
    .reduce((acc, [name, item]) => ({ ...acc, [name]: item }), {})



export default (props: SampleProps) => {
    var sample = props.sample;
    var item: any = samples[sample.name];
    // const Component: any = (item.tags[0]===SAMPLE_TYPE.FIBER)? <item.Component/>: <DemoWrapper sampleComp={item.Component}></DemoWrapper>;
    const Component = item.Component;
    sample.type = item.tags[0];
    return (
        <Suspense fallback={null}>
            <Component sample={sample}/>
        </Suspense>)
};

// export default DemoTemplate;
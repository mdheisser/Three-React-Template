import React from "react"

export default ({ sample, testCases }: { sample: any, testCases?: any }) => {
    console.log("Sample: %s %s", sample.name, sample.id ? sample.id : "");

    const switchCase = (evt: any) => {
        console.log(evt);
    }

    return (<>
        <div id="info">
            <span >
                {sample.name}
            </span>
            {/* <label for="cars">Choose a car:</label> */}

            {testCases ?
                <select id="testCases" value={sample.id} onChange={switchCase}>
                    {Object.keys(testCases).map((key) =>
                        <option key={key} value={key}>{testCases[key].name}</option>
                    )}
                </select> : ""}
        </div>
    </>)
}
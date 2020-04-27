import React from "react"
import { useSampleStates } from "../../common/states";
import './UI.css'

/**
 * An overlay to display basic information
 */
export const InfoOverlay = ({ sample }: { sample: any }) => {
    console.log("Sample: %s %s", sample.name, sample.caseNb ? "#" + sample.caseNb : "");

    return (<>
        <div className="overlay" id="info">
            <span >
                {sample.name}
            </span>
        </div>
    </>)
}

/**
 * A dropdown menu to select a sample case (e.g. test case)
 * @param param0 case options + current caseId
 * export sample.caseNb in states
 */
export const CaseSelector = ({ items, current, onSelect}: { items: any, current: number, onSelect: any }) => {
    // const setSample = useSampleStates(state => state.setSample);

    return (<>
        <div className="overlay inputBtn" id="caseSelector">
            <select id="testCases" value={current} onChange={evt => onSelect(evt.target.value)}>
                {Object.keys(items).map((key) =>
                    <option key={key} value={key}>{items[key]}</option>
                )}
            </select>
        </div>
    </>)
}
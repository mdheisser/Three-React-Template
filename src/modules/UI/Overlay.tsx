import React from "react";
import "./UI.css";

/**
 * An overlay to display basic information
 */
export const InfoOverlay = ({ sample }: { sample: any }) => {
  console.log(
    "Sample: %s %s",
    sample.name,
    sample.caseNb ? "#" + sample.caseNb : ""
  );

  return (
    <>
      <div className="overlay top centered">
        <div id="infoLabel">{sample.name}</div>
        <div id="description">{sample.desc}</div>
      </div>
    </>
  );
};

/**
 * A dropdown menu to select a sample case (e.g. test case)
 * @param param0 case options + current caseId
 * export sample.caseNb in states
 */
export const CaseSelector = ({
  items,
  current,
  onSelect
}: {
  items: any;
  current: number;
  onSelect: any;
}) => {
  // const setSample = useSampleStates(state => state.setSample);

  return (
    <>
      <div className="overlay top inputBtn" id="caseSelector">
        <select
          id="testCases"
          value={current}
          onChange={evt => onSelect(evt.target.value)}
        >
          {Object.keys(items).map(key => (
            <option key={key} value={key}>
              {items[key]}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};




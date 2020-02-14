import React from "react"

export default ({ sample = { name: "", type: "", id: "" } }) => {
    return (<>
        <span  id="info">
            {sample.name} #{sample.id}
        </span>
        {/* {this.props.UiSettings.showDbgCanvas ? (
            <canvas id="testcanvas" height="256" width="256" className="debugCanvas"></canvas>
        ) : ("")} */}
        <div id="timeline">
            {/* {this.props.UiSettings.showTimeline ? (
            <Timeline className="timeline" onTimeChange={this.timelineEvtHandler}></Timeline>
          ) : ("")} */}
        </div>
    </>)
}
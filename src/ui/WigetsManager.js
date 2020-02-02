import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
// import 'vis-timeline/dist/vis-timeline-graph2d.css'
// import SunWidget from '../ui/SunWidget';

class WidgetLoader extends Component {

  constructor(props) {
    super();
    this.props = props;
  }

  componentDidMount() {
    console.log("Info: " + this.props.sampleType + " " + this.props.sampleName)
    const { dispatch } = this.props;
    dispatch({
      type: "GLOBAL", payload: {
        sampleName: this.props.sampleName,
        sampleType: this.props.sampleType,
        sampleId: this.props.sampleId
      }
    });
    // dispatch({ type: "MOUSE_RIGHT", isBtnDown: true })
  }

  timelineEvtHandler = (data) => {
    console.log(data);
    this.props.dispatch({
      type: "TIMING", payload: {
        hour: data.time.getHours(),
        min: data.time.getMinutes()
      }
    });
  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <div id="info">
          {/* {this.props.sampleName} {this.props.sampleType} #{this.props.sampleId} */}
        </div>
        {this.props.UiSettings.showDbgCanvas ? (
          <canvas id="testcanvas" height="256" width="256" className="debugCanvas"></canvas>
        ) : ("")}
        <div id="timeline">
          {/* {this.props.UiSettings.showTimeline ? (
            <Timeline className="timeline" onTimeChange={this.timelineEvtHandler}></Timeline>
          ) : ("")} */}
        </div>
      </React.Fragment>)
  }
}

WidgetLoader.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { UiSettings } = state;

  return { UiSettings }
}

export default connect(mapStateToProps)(WidgetLoader);
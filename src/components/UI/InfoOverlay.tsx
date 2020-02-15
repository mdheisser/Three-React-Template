import React from "react"
import { connect } from "react-redux";
// { sample = { name: "", type: "", id: "" }}, {dispatch}: {sample: any, dispatch: any}
const WidgetInfo = (props: any) => {
    var { sample } = props;
    var { dispatch } = props;
    console.log("Info: %s %s", sample.name, sample.id)
    // const { dispatch } = props;
    dispatch({
        type: "GLOBAL", payload: { sample }
    });

    return (<>
        <span id="info">
            {sample.name} #{sample.id}
        </span>
    </>)
}

function mapStateToProps(state: any) {
    const { UiSettings } = state;

    return { UiSettings }
}

export default connect(mapStateToProps)(WidgetInfo);
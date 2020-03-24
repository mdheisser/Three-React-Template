import React from "react"

export default ({ sample }: any) => {
    console.log("Info: %s %s", sample.name, sample.id)
    // const { dispatch } = props;
    // dispatch({
    //     type: "GLOBAL", payload: { sample }
    // });

    return (<>
        <span id="info">
            {sample.name} {sample.id ? "#" + sample.id : ""}
        </span>
    </>)
}
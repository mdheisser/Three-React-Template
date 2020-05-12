import React, { Suspense, useEffect } from "react";
import {
  Link,
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import "./App.css";
import * as Samples from "./samples";
// import { useSampleStates } from './common/states';
const SAMPLES: any = Samples;
const samples: any = //Object.entries(Samples).map(([name, sample]: any) => sample);
  Object.entries(SAMPLES).reduce(
    (acc, [itemName, item]) => ({ ...acc, [itemName]: item }),
    {}
  );

// console.log(Object.entries(SAMPLES));
console.log(SAMPLES);
// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * route to sample path and support sampleId
 */
export const App = () => {
  return (
    <>
      <Router basename="/three-react-template">
        {/* <Route path="/" component={App} /> */}
        <Switch>
          <Route exact path="/">
            <WelcomePage />
          </Route>
          {/* <LoadSample sample={sample} /> */}
          <Route exact path="/:sample" component={LoadSample} />
          <Route path="/:sample/:caseId" component={LoadSample} />
        </Switch>
      </Router>
    </>
  );
};

const addUrlArgs = (args: any) => {
  let paramStr = Object.keys(args).reduce((params, argName): any => {
    const pref = params.length ? "&" : "?";
    return args[argName] !== '' ? params + pref + argName + "=" + args[argName] : params;
  }, "");
  return paramStr;
}

/**
 * List all availables samples in the sandbox
 * @param param0
 */
export const WelcomePage = () => {
  console.log(samples['BasicDemo']);
  return (
    <div className="App">
      <div className="title">
        <h2>ThreeSandbox! </h2>
        <h3>A playground for 3D projects</h3>
      </div>
      <hr />
      <span>Sandbox contains the following samples</span> <br />
      <ul>{Object.keys(samples)//.map(name => samples[name])
        .map((sampleName: any, i: number) => (
          <li key={i.toString()}>
            <Link to={"/" + sampleName + addUrlArgs(samples[sampleName].args)}>{sampleName}</Link>
          </li>
        ))}</ul>
    </div>
  );
};

/**
 * Load a specific sample
 * @param param0
 */
export const LoadSample = ({ match }: any) => {
  // const setSample = useSampleStates(state => state.setSample);
  let name = match.params.sample;
  let query = useQuery();
  // let { caseId } = useParams();
  // preload argument list from sample declaration
  const urlArgs: any = SAMPLES[name].args;
  // + fill from url provided params
  Object.keys(urlArgs).forEach((argName: string) => {
    const urlArgVal = query.get(argName);
    if (urlArgVal !== undefined && urlArgVal !== '') urlArgs[argName] = urlArgVal;
  })
  // add to sample args
  var sampleArgs = {
    sampleName: name,
    // type: Number(query.get("type")),
    sampleDesc: SAMPLES[name].desc,
    ...urlArgs
  };

  // setSample(sample); // externalize to Sample States
  // console.log(sample);
  const Sample = SAMPLES[name].comp;
  console.log(Sample);
  // sample.type = item.tags[0];
  return (
    <Suspense fallback={null}>
      <Sample args={{ ...sampleArgs }} />
    </Suspense>
  );
};

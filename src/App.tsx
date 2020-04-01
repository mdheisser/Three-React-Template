import React, { Suspense, useEffect } from 'react';
import {
  Link,
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import './App.css';
import * as Samples from "./samples";
import { useSampleStates } from './common/SampleStates';

const sampleItems: any = Object.entries(Samples)
  .reduce((acc, [name, item]) => ({ ...acc, [name]: item }), {})

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * route to sample path and support sampleId
 */
export const App = () => {

  return (<>
    <Router basename="/three-react-template">
      {/* <Route path="/" component={App} /> */}
      <Switch>
        <Route exact path="/">
          <WelcomePage />
        </Route>
        {/* <LoadSample sample={sample} /> */}
        <Route exact path="/:sampleName" component={LoadSample} />
        <Route path="/:sampleName/:id" component={LoadSample} />
      </Switch>
    </Router>
  </>);
}

/**
 * List all availables samples in the sandbox
 * @param param0 
 */
export const WelcomePage = () => {

  const getItemsList = (items: {}) => {
    return Object.keys(items).map((sampleName, i) => <li key={i.toString()}>
      <Link to={"/" + sampleName}>{sampleName}</Link>
    </li>);
  };
  return (
    <div>
      Welcome to ThreeSandbox! a playground for 3D projects <br /><br />
      <span>Sandbox contains the following samples:</span> <br />

      <ul>{getItemsList(sampleItems)}</ul>
    </div>
  )
};

/**
 * Load a specific sample
 * @param param0 
 * export sample in states
 */
export const LoadSample = ({ match }: any) => {
  const setSample = useSampleStates(state => state.setSample);

  // let query = useQuery();
  // let id = query.get("id");
  let { id } = useParams();
  var sample = {
    name: match.params.sampleName,
    // type: Number(query.get("type")),
    id: id,
  }
  // externalize sample in SampleStates
  setSample(sample);

  var item: any = sampleItems[sample.name];
  const Sample = item.Component;
  // sample.type = item.tags[0];
  return (
    <Suspense fallback={null}>
      <Sample sample={sample} />
    </Suspense>)
};
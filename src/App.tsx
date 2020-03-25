import React, { Suspense } from 'react';
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

const sampleItems: any = Object.entries(Samples)
  .reduce((acc, [name, item]) => ({ ...acc, [name]: item }), {})

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}


export const App = () => {

  return (<>
    <Router>
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

export const WelcomePage = ({ type }: any) => {

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


export const LoadSample = ({ match }: any) => {
  let query = useQuery();
  let { id } = useParams();
  // let id = query.get("id");
  var sample = {
    name: match.params.sampleName,
    type: Number(query.get("type")),
    id: id,
  }
  var item: any = sampleItems[sample.name];
  const Sample = item.Component;
  sample.type = item.tags[0];
  return (
    <Suspense fallback={null}>
      <Sample sample={sample} />
    </Suspense>)
};
import React from 'react';
import {
  Link,
  useParams,
  useLocation
} from "react-router-dom";
import './App.css';
import WidgetsLoader from './ui/WigetsManager'
import SampleLoader from './components/SampleLoader';
import * as Samples from "./samples";

const items: any = Object.entries(Samples)
    .reduce((acc, [name, item]) => ({ ...acc, [name]: item }), {})

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// type SamplesProps = { type: string }; /* could also use interface */
export const WelcomePage = ({ type }: any) => {
  let sampleItems = items

  const getItemsList = (items: {}) => {
    return Object.keys(items).map((sampleName, i) => <li key={i.toString()}>
      <Link to={"/" + sampleName}>{sampleName}</Link>
    </li>);
  };
  return (
    <div>
      Welcome to ThreeSandbox! a playground for 3D projects <br />
      Sandbox contains the following samples:<hr />

    <ul>{getItemsList(sampleItems)}</ul>
      Demos (fiber)
    </div>
  )
};

export const App = ({ props, match }: any) => {
  let query = useQuery();
  // let { id } = useParams();
  let id = query.get("id");
  id = id === undefined ? "default" : id;
  console.log("Running sample " + id);
  var sample = {
    name: match.params.sampleName,
    type: Number(query.get("type")),
    id: id,
  }

  return (<>
    <SampleLoader sample={sample} />
    <WidgetsLoader sample={sample} />
  </>);
}
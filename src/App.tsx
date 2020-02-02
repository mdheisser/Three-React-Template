import React, { Component } from 'react';
import {
  Link,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import './App.css';
import WidgetsLoader from './ui/WigetsManager'
import {Engine} from './common/Engine'
import { TestList, DemoList } from './SampleListing';

// Pure fonction => presentational component
export const Welcome = () =>
  <div>
    Welcome to ThreeSandbox! a playground for developing 3D projects
                        <ul>
      <li>
        <Link to="/demos">Demos</Link>
      </li>
      <li>
        <Link to="/tests">Tests</Link>
      </li>
    </ul>

    <hr />
  </div>;

// type SamplesProps = { type: string }; /* could also use interface */
export const SamplesSelect = ({ type }: any) => {
  const itemsDict = type === "demos" ? DemoList : TestList;
  const itemsList = Object.keys(itemsDict).map((sampleName, i) =>
    <li key={i.toString()}>
      <Link to={"/" + type + "/" + sampleName}>{sampleName}</Link>
    </li>
  );
  return (
    <div>
      Project contains following samples:
      <ul>{itemsList}</ul>,
    </div>
  )
};

// must be a class to use componentDidMount
export class App extends Component<any> {
  threeRootElement: any;
  canvasElt: any;
  path: any;
  state: any;

  constructor({ props, match }: any) {
    super(props);
    let { path } = match;
    // let { id } = useParams();
    this.path = path;
    this.state = {
      sampleType: match.params.sampleType,
      sampleName: match.params.sampleName
    }
  }

  componentDidMount() {
    // Passing hand to the 3d engine
    console.log("init 3d engine");
    Engine.start(this.canvasElt, this.state.sampleType, this.state.sampleName)
  }

  render() {
    return (
      <div>
        <Switch>
          {this.state.id}
          <Route exact path={this.path}>
            <UILauncher type={this.state.sampleType} name={this.state.sampleName}/>
          </Route>
          <Route path={`${this.path}/:id`}>
            <UILauncher type={this.state.sampleType} name={this.state.sampleName}/>
          </Route>
        </Switch>
        <canvas ref={element => this.canvasElt = element} />
      </div>
    );
  }
}

// must be a function to use hook: useParams
function UILauncher(props: any) {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { id } = useParams();
  id = id === undefined ? "default" : id;
  console.log("Running sample " + id);

  return (
    <WidgetsLoader sampleType={props.type} sampleName={props.name} sampleId={id}></WidgetsLoader>
  );
}
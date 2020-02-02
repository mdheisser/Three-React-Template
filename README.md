# ThreeReactSandbox
A sandbox for webGL projects.

This project aims at providing a template as well as a set of tools for developing WebGL apps using Three.js and React.js.

Based on create-react-app tool.

## Feature and embedded libraries:
- Three.js: webgl 3d graphics
- Create-react-app: Dev environment with typescript support + VsCode integration
- React.js: UI and browser integration
- Redux (react-redux, redux-toolkit, redux-watch): state management, data storage and exchange between UI components and engine
- React Router(react-router-dom): dynamic browsing of multiple projects
- Ammo.js: physics engine


## Goals
- ready to code approach: avoid boilerplate code at maximum
- makes code reusable accross projects by sharing resources (textures, materials, shaders, tools, ...)
- sandbox: easy work on different projects at the same time and switch between them without changing source (dynamic load)
- decorelate UI and 3D while allowing data exchange between in both ways. Clear separation allowing cleaner work.

# Usage

## Installation

You need nodejs + npm installed. 
Once project cloned with git, issue 'npm i' in project's directory

## Running

- first launch development server as any react app project by typing 'npm start'
- then access at 'localhost:3000' in your favorite browser or launch web app from VSCode Debug menu (needs configuration see below)

## Create new sample 

- add a new file in samples dir with new demoClassName and copy code adapted from DemoTemplate
- add new entry in Samples.tsx with sample name:
    `demoName`:'demoClassName'
- directly access new sample with url: `localhost:3000/demos/<demoName>

## Usage with VSCode
if you plan on using VSCode for dev, you can benefit from debugging feature directly in the editor.
For that install `Debugger for Chrome` extension and modify .vscode/launch.json to adapt configuration 
to your machine.

# Showcase
The samples given are voluntarily basic but shows most features :
- Sample browsing (thanks to React Router)
- Switch between controls mode (ControlManager component)
- Graphics and physics realtime update
- Usage of materials + shader + texture
- Display of 3d model
- Overlay on top of graphics to display UI infos + control engine 
- 2 way data exchanges between UI and Engine and automatic refresh thanks to redux lib

# Source code organization and folder structure:
- /src/assets/: every thing that isn't code (images, 3d models, ..)
- /src/common/: code to be reused accross projects
- /src/common/catalogs/: materials, textures, shaders, lights resources
- /src/redux/: state related code: common and specific 
- /src/samples/: Demos and tests sample. 
- /src/ui/: react web interface related. user interface on top of 3d.
- /src/index.tsx:
- /src/Root.tsx:
- /src/Engine.ts: 
- /src/Samples: listing of all samples
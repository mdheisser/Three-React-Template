# Three React Template

A template for webGL projects using Three.js and React.

Provides a code structure with some basic recipes + embed some tools to make WebGL apps development easier.

I use it as a fundation of my other projects. 

It is intentionnaly kept small for now and is mostly a WIP. It is more some guidelines and best pratices in webgl development than a finished library.

You can take whatever you need and leave anything you consider unrelevant for your project.


*[Live Demo](https://etienne1911.github.io/three-react-template/)&ensp;&middot;&ensp;[Sandbox](https://codesandbox.io/embed/github/etienne1911/three-react-template/tree/master/?fontsize=14&initialpath=three-react-template%2F&theme=dark&view=preview)*

## Goals/features

When I started 3d web dev with ThreeJS, I found lack of frame to develop serious project a main downside.
I was only coding small demos built from html files which ended up messy.

With the advent of advanced lib such as React, web dev became much cleaner, and a bit closer to traditional projects such as C++, 
while keeping flexibility of scripting languages and possibilities offered by markup language to build UI.

Hence the creation of this project.

This project attempt to fullfill following goals:
- provide a clean way to code and organize a 3d web-app
- ready to code: avoid boilerplate code at maximum 
- emphase code reusability accross projects sharing common components, ressources, tools, ...
- sandbox mode: listing of all projects currently worked on and easy switch between them
- UI and 3D separation while enabling data exchange and instantaneaous update between engine, components and UI through states (including global store) 

## Embedded libraries:
The current choices made for this project:

- Three.js: webgl 3d graphics
- React: UI and browser integration
- React-Three-Fiber: ThreeJS integration with React
- Typescript support from CRA (create-react-app)
- React Router(react-router-dom)
- State management library (Zustand)
- (Ammo.js: physics engine) soon

# Usage

## Source checkout

Different way to get this project:

- local clone in your machine
- create a new repo from repo template (template is a new github feature=> check github help): 
but no way to subscribe updates later yet?
- make a fork of this repo and set upstream to point to original repo => possibility to stay updated by fetching updates from original repo and merging them in your repo.
- use a code sandbox: quickest way to get started

## Installation

Nodejs + npm required. 
Once project retrieved from one of the method described in previous step, 
run 'npm i' in project's directory to install dependancies

## Running

- launch development server as any react app project by typing 'npm start' in project's dir
- access at 'localhost:3000' in browser

## Create new sample 

- add a new file in samples dir following code template from another sample
- add new entry in samples/index with your new sample ref
- directly access new sample with url: `localhost:3000/<SampleName>

# Showcase

The samples given are voluntarily basic but tries to show most features:

- Sandbox: browse samples (Welcome page)
- Basic scene setup with some controls + material use with texture and lights with shadows (Basic Demo)
- UI layer to show some infos + controls to customize a demo
- Support of URL args to preset a demo 
- Load and display of 3d model (Model Loader)

# Source code organization and folder structure:

This is mostly a suggestion of architecture for project not intended to be fixed as it probably evolve,
as this projects matures..

Source files can be categorized into:
- non component ( TS files): unrelated to react/R3F (so no access to ThreeJS instance). 
=> code with highest portability.
- components (TSX): by essence tightly coupled to react (for UI comp) and R3F (React-Three-Fiber for 3D comp)

Code split:
- common/: of general interest for the sandbox framework
- modules/: building blocks for samples. some hints of modules: 'common', 'helpers', 'UI', ... (+ see an example with new heighmap module below). 
- samples/: Demos, tests, tools samples mostly dealing with 3D and UI components defined in modules. 
Note that any new sample must be added to sample declaration file `index.ts` at the root of this folder
- resources/assets/: Local assets (self hosted): every thing that isn't code (images, 3d models, ..)
- resources/catalogs/: Resources declarations for materials, textures, shaders, models, ...
- /src/dts: to declare any missing typescript types def



Example with creation of a new module:

Given we want to develop an heighmap module, we should create a subdir in modules dir: "Heightmap".

.. and then add:
- Some routines specific to heightmap but unrelated to react/ R3F => TS file(s) inside subdir
- A new component: '\<Heightmap>' to be instanciated in our samples => TSX file(s) inside subdir
- Some general purpose code non heighmap specific and useful for other modules (for instance noise functions, some helper..) => TS/TSX files in external shared module dir

# Best pratices, guidelines for this project and contributions
- keep external dependancies as low as possible
- minimal resources (just to show some usecases)

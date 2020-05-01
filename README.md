# Three React Template

Provides a code structure with some basic recipes + embedded tools to make WebGL apps development easier.

I use it as a fundation for my other projects. 

It is intentionnaly kept small for now and is mostly a WIP. 
It is more some guidelines and best pratices in webgl development than a complete library.

You can take whatever you need and leave what you consider unrelevant for your project.


*[Live Demo](https://etienne1911.github.io/three-react-template/)&ensp;&middot;&ensp;[Sandbox](https://codesandbox.io/embed/github/etienne1911/three-react-template/tree/master/?fontsize=14&initialpath=three-react-template%2F&theme=dark&view=preview)*

## Motivations

When I started 3d web dev with ThreeJS, I found main downside to be the lack of frame to develop serious project.
I was only coding small demos built from html files which ended up messy.

With the advent of advanced lib such as React or typescript, web dev became much cleaner, and a bit closer to traditional projects such as C++, 
while keeping flexibility of scripting languages and advantages of markup language to build UI.

Hence the birth of this project.

## Goals/features
This project attempt to fullfill following goals:
- provide a clean way to code and organize a 3d web-app
- ready to code: avoid boilerplate code at maximum 
- emphase code reusability accross projects sharing common components, ressources, tools, ...
- sandbox mode: listing of all projects currently worked on and easy switch between them
- UI and 3D separation while enabling data exchange and instantaneaous update between engine, components and UI through states (including global store) 
- enable code portability

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

Different way to get started:

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
- add new entry in samples/index with your new sample declaration
- directly access new sample with url: `localhost:3000/\<SampleName>

# Showcas.

The samples given are voluntarily basic but tries to show most features:

- Sandbox: browse samples (Welcome page)
- Basic scene setup with some controls + material use with texture and lights with shadows (Basic Demo)
- UI layer to show some infos + controls to customize a demo
- Support of URL args to preset a demo 
- Load and display of 3d model (Model Loader)

With time demos may become more interesting but this isn't the main purpose of this project

# Source code organization and folder structure:

This is mostly a suggestion of architecture subject to future evolution.

Source files can be categorized into:
- non component ( TS files): unrelated to react/R3F (so no access to ThreeJS instance). 
=> code with highest portability.
- components (TSX): by essence tightly coupled to react (for UI comp) and R3F (React-Three-Fiber for 3D comp)

Code split:
- common/: of general interest for the sandbox framework
- modules/: building blocks for samples some hints of modules: 'common', 'helpers', 'UI', ... (+ see an example with new heighmap module below). 
- samples/: Demos, tests, tools samples mostly dealing with 3D and UI components defined in modules. 
Note that any new sample must be added to sample declaration file `index.ts` at the root of this folder
- resources/assets/: Local assets (self hosted): every thing that isn't code (images, 3d models, ..)
- resources/catalogs/: Resources declarations for materials, textures, shaders, models, ...
- /src/dts: to declare any missing typescript types def


Example: Given we want to develop a new module called "Heightmap", 

- we should create a subdir in modules dir: "Heightmap".
.. and then add:
- A new component: '\<Heightmap>' to be instanciated in samples => TSX file(s) inside subdir
- Some routines specific to heightmap but unrelated to react/ R3F => TS file(s) inside subdir
- Some general purpose code or useful for other modules (for instance noise functions, helpers..) => TS/TSX files in other shared module dir (such as tools, helpers, UI...)

# Best pratices, guidelines, contributions

This an attempt here to give a frame for future evolution..

All improvements to this template, mainly come from the other projects I'm working on, when I find a missing use case, which for the sake of reusability can be put in common.

I dont know yet how this project will evolve (maybe move to some sort of 3D swissknife..), but for now, samples, routines and resources are embedded mainly to serve 2 purposes:
- showcase most usecases giving an example of how to implement a feature and split code 
- provide some piece of code widely used accross other project: (UI design, helpers...)
(for instance: a text display info, a canvas overlay, some helper to control boxes...)

## when should a feature included?

A good candidate might be a feature originaly developed for a project, 
with a general interest and recurrently needed in others.

Then it may be worth spending some time to make it generic, and put it in template, 
so that all projects built on top can automatically benefit from it, hence avoiding code duplication,..

Nevertheless, choices should be made carefully and wisely, to decide what is really beneficial for the rest 
and worth the investment of time.  
This, in order to make sure this project doesn't grow everywhere, become messy or too heavy. 
Its goal not being (at least for now) to be a complete standalone lib.

Some rule of thumb to help decide what contributions to include,: 
- keep external dependancies as low as possible 
if a feature absolutely requires a new dependancy, it shouldn't be included unless indispensable or has a clear proven interest (such as state management lib, url routing lib, ...) 
Or , common code should be the most library agnostic (
Concretely this means to avoid using a favorite UI lib (such as MaterialUI) or a more pratical http request lib (such as Axios) no matter the quality of the lib. 
But to prefer standards instead (like HTML5, fetch http request...) and then include any personal favorite lib in project built upon template.
- included resources should be kept minimal (just to show some usecases)
- ....

## dev proces workflow

 When developing a template based project, I usually follow this workflow:
- work on a fork of template, to get updates and be able to contribute to mother project
- if generic code is identified, extract it from specific code 
- commit specific code in the fork and generic code in a specific branch of template repo such as DEV, EXP (or if developing in code sandbox, it is possible to upload as a new feature branch on github)
- create merge request to retrofit feature into master.
- update fork from template master branch

# Three React Template
A template for webGL projects using Three.js and React.

I use it as a fundation for other bigger project. 
It is kept voluntarily small, only to provide a code structure coupled with some basic recipes.
It also embed some tools to make WebGL apps development easier.

*[Live Demo](https://etienne1911.github.io/three-react-template/)&ensp;&middot;&ensp;[Sandbox](https://codesandbox.io/embed/github/etienne1911/three-react-template/tree/master/?fontsize=14&initialpath=three-react-template%2F&theme=dark&view=preview)*

## Goals/features
When I started 3d web dev, with ThreeJS I found the lack of frame to develop serious project to be one of the main downside.
I was only coding small demos built from html files which ended up messy.
With the advent of tools such as React, web dev became much cleaner, and a bit closer to traditional projects such as C++, 
while keeping flexibility of scripting languages and possibilities offered by markup language to build UI.

Hence the creation of this project:
- provide a clean way to code and organize a 3d web-app
- ready to code: avoid boilerplate code at maximum + emphasis on code reusability accross projects
- sandbox mode: listing of all projects currently worked on and easy switch between them
- UI and 3D separation while enabling data exchange and instantaneaous update between engine, components and UI through state store
- sharing common components (helpers, UI,..), ressources (material catalog)

## Embedded libraries:
- Three.js: webgl 3d graphics
- React: UI and browser integration
- React-Three-Fiber: ThreeJS integration with React
- Typescript support
- React Router(react-router-dom)
- State management library (Zustand)
- (Ammo.js: physics engine) soon

# Usage

## Source checkout
Different way to get this project
- local clone from repo
- create a repo from repo template (template is a new github feature=> check github help): 
but no way to subscribe to updates made to template repo yet?
- make a fork of repo and set upstream to point to original repo => possibility to 
stay uptodate by fetching updates from original repo and merging them in your repo.
- use code sandbox: quickest way to get started

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

## Usage with VSCode
if you plan on using VSCode for dev, you can benefit from debugging feature directly in the editor.
For that use `Debugger for Chrome` and modify .vscode/launch.json to adapt configuration to your machine.

# Showcase
The samples given are voluntarily basic but shows most features :
- Sandbox: browse samples (welcome page)
- Animation + materials/shader/texture load (Basic Demo)
- Case selector using dropbox inside a sample to customize a demo/ select a test
- Overlay on top of graphics to display UI infos (+ control )
- Load and display of 3d model
- custom arg in url (model loader)

# Source code organization and folder structure:

This is just a suggestion of architecture as the project is new and may continue to evolve in time...

Source files can be categorized into:
- non component ( TS files): unrelated to react/R3F (so no access to ThreeJS instance). 
=> code with highest portability.
- components (TSX): by essence tightly coupled to react (for UI comp) and R3F (React-Three-Fiber for 3D comp)

Code split:
- common/: of general interest for the sandbox framework
- modules/: building blocks for samples. some hints of modules: 'common', 'helpers', 'UI', ... (+ see an example with new heighmap module below). 
- samples/: Demos, tests, tools samples mostly dealing with 3D and UI components defined in modules. 
Note that any new sample must be added to sample declaration file 'index.ts' at the root of this folder
- resources/assets/: Local assets (self hosted): every thing that isn't code (images, 3d models, ..)
- resources/catalogs/: Resources declarations for materials, textures, shaders, models, ...
- /src/dts: to declare any missing typescript types def



Example:

Given we want to develop a new 'HeightMap' module .

For that we create a subdir in modules dir, named "Heightmap".

- Some routines specific to heightmap but unrelated to react/ R3F => ts files in subdir
- A new component: '\<Heightmap>' ready to be instanciated. => tsx files in subdir
- Some general purpose code unspecific to Heighmap and useful for other modules, for instance noise functions. => common or shared module dir

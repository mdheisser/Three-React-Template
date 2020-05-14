# Three React Template

Provides a code structure with some basic recipes + embedded tools to make WebGL apps development easier.

I use it as a fundation for my other projects. 

It is intentionnaly kept small for now and is mostly a WIP. 
See it more as some guidelines and best pratices in webgl development rather than a complete library.

I advise to take whatever you need and leave what you consider unrelevant for your project.


*[Live Demo](https://etienne1911.github.io/three-react-template/)&ensp;&middot;&ensp;[Sandbox](https://codesandbox.io/embed/github/etienne1911/three-react-template/tree/master/?fontsize=14&initialpath=three-react-template%2F&theme=dark&view=preview)*

## Motivations

When I started 3d web dev with ThreeJS, I found main downside was the lack of frame to develop serious project.
I was only coding small demos built from html files which ended up messy most of the time.

With the advent of advanced lib such as React and Typescript language, web dev became much cleaner, and a bit closer to traditional projects such as C++, 
while keeping flexibility of scripting languages and advantages of markup language to build UI.

Hence the birth of this project.

## Goals/features
This project attempt to fullfill following goals:
- provide a clean way to code and organize a 3d web-app
- ready to code: avoid boilerplate code at maximum 
- emphase code reusability accross projects sharing common components, ressources, tools, ...
- sandbox mode: listing of all projects currently worked on and easy switch between them
- UI and 3D separation while enabling data exchange and instantaneaous update between them using states (including global state store) 
- code portability focus

## Embedded libraries:
The current choices made for this project:

- Three.js: webgl 3d graphics
- React: UI and browser integration
- React-Three-Fiber: ThreeJS integration with React
- Typescript (in create-react-app)
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

Embedded samples are voluntarily basic but tries to demonstrates some features such as:

- Sandbox: browse samples (Welcome page)
- Basic scene setup (controls, resources, lights, shadows, animation) (Basic Demo)
- Load and display of 3d model (Model Loader)
- UI layer: displaying some infos and controls
- Sample customization and preset through support of generic URL args
- ... 

With time demos may become more interesting but for now this isn't the priority of this project

# Source code organization and folder structure:

[Code structure](Organization)

[Best pratices](Guidelines)

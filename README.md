<p align="center">
  <h1 align="center">Angular Applications</h1>
</p>

[![CodeCov Code Coverage](https://codecov.io/gh/alexander-lloyd/angular-apps/branch/master/graph/badge.svg?token=UAGOdykN63)](https://codecov.io/gh/alexander-lloyd/angular-apps)
[![Build Status](https://github.com/alexander-lloyd/digital-circuit-visualiser/workflows/Build/badge.svg)](https://github.com/alexander-lloyd/angular-apps)

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Applications](#applications)
  - [Spotify Player](#spotify-player)
  - [Todo App](#todo-app)
- [Build With](#build-with)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
  - [Development server](#development-server)
  - [Build](#build)
  - [Running unit tests](#running-unit-tests)
  - [Running end-to-end tests](#running-end-to-end-tests)
- [Understand the workspace](#understand-the-workspace)
- [Contact](#contact)

## Applications

### Spotify Player

[View the Web App »](https://alexander-lloyd.dev/spotify-player)

Control Spotify playback within the browser window. Shows the current song and progress. Connects to your Spotify through the [Player API](https://developer.spotify.com/documentation/web-api/reference/player/).

More information can be found in the applications [README](https://github.com/alexander-lloyd/angular-apps/tree/master/apps/spotify-player).

### Todo App

[View the Web App »](https://alexander-lloyd.dev/todo)

Manage Tasks using the Todo App. Stores data in the browsers Local Storage. This application uses the latest browser features including Progressive Web Applications and Service Workers and Notifications.

More information can be found in the applications [README](https://github.com/alexander-lloyd/angular-apps/tree/master/apps/todo).

## Build With

These projects were build using the following:

- [Angular](https://angular.io).
- [Nx](https://nx.dev).
- [Sass](https://sass-lang.com).
- [TypeScript](https://www.typescriptlang.org/).

## Getting Started

First, install the dependencies:

- Nodejs: Follow the instructions on the [NodeJS website](https://nodejs.org/)
- Yarn package manager (`npm install -g yarn`). [Yarn Website](https://yarnpkg.com/)

To get started, clone the repository and then install dependencies.

```sh
$ git clone git@github.com:alexander-lloyd/angular-apps.git
```

## Installation

Install dependencies.

```sh
$ yarn install
```

## Usage

### Development server

Run `yarn serve <app-name>` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Build

Run `yarn build <app-name>` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `yarn test <app-name>` to execute the unit tests via [Jest](https://jestjs.io).

Run `yarn affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `yarn e2e <app-name>` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `yarn affected:e2e` to execute the end-to-end tests affected by a change.

## Understand the workspace

Run `yarn dep-graph` to see a diagram of the dependencies of your projects.

## Contact

- Project Link: [https://github.com/alexander-lloyd/angular-apps](https://github.com/alexander-lloyd/angular-apps)
- LinkedIn: [![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/alexander-lloyd

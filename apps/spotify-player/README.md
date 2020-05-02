<p align="center">
  <h1 align="center">Spotify Player</h1>

  <p align="center">
    <a href="https://alexander-lloyd.dev/spotify-player/">
      <strong>View the WebApp »</strong>
    </a>
  </p>

  [![CodeCov Code Coverage](https://codecov.io/gh/alexander-lloyd/angular-apps/branch/master/graph/badge.svg?token=UAGOdykN63)](https://codecov.io/gh/alexander-lloyd/angular-apps)
  [![Build Status](https://github.com/alexander-lloyd/digital-circuit-visualiser/workflows/Build/badge.svg)](https://github.com/alexander-lloyd/angular-apps)
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
  - [Development server](#development-server)
  - [Build](#build)
  - [Running unit tests](#running-unit-tests)
  - [Running end-to-end tests](#running-end-to-end-tests)
- [Contact](#contact)

## Description

Control Spotify playback within the browser window. Shows the current song and progress. Connects to your Spotify through the [Player API](https://developer.spotify.com/documentation/web-api/reference/player/).

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

Run `yarn start spotify-player` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Build

Run `yarn build spotify-player` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `yarn test spotify-player` to execute the unit tests via [Jest](https://jestjs.io).

### Running end-to-end tests

Run `yarn e2e spotify-player-e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

## Contact

- Project Link: [https://github.com/alexander-lloyd/angular-apps/](https://github.com/alexander-lloyd/angular-apps/)
- LinkedIn: [![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/alexander-lloyd

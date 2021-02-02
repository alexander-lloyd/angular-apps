<p align="center">
  <h1 align="center">History</h1>

  <p align="center">
    <a href="https://alexander-lloyd.dev/todo/">
      <strong>View it in action in my todo app here »</strong>
    </a>
  </p>
</p>

[![Codecov Code Coverage](https://codecov.io/gh/alexander-lloyd/angular-apps/branch/master/graph/badge.svg?token=UAGOdykN63)](https://codecov.io/gh/alexander-lloyd/angular-apps)
[![Build Status](https://github.com/alexander-lloyd/digital-circuit-visualiser/workflows/Build/badge.svg)](https://github.com/alexander-lloyd/angular-apps)

<p align="center">
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
  - [Running unit tests](#running-unit-tests)
  - [Running linting](#running-linting)
- [Contact](#contact)

## Description

Add functionality to undo and redo commands easily with the [command design pattern](https://sourcemaking.com/design_patterns/command).
Based upon [this inspiration](https://www.jitblox.com/blog/designing-a-lightweight-undo-history-with-typescript).

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
$ yarn install @al/history
```

## Usage

An example of usage here:

```typescript
import {
  CommandHandler,
  UpdatePropertyCommand,
  UndoHistory,
} from '@al/history';

const undoHistory = new UndoHistory();
const commandHandler = new CommandHandler(undoHistory);

const task = {
  name: 'Exam',
  complete: false,
};

const command = new UpdatePropertyCommand(task, 'complete', true);
commandHandler.execute(command);
console.log(task); // { name: 'Exam', complete: true }

commandHandler.undo(); // Undo the last action on the stack.
console.log(task); // { name: 'Exam', complete: false }

commandHandler.redo(); // Redo the last action on the stack.
console.log(task); // { name: 'Exam', complete: true }
```

## Contributing

Contributions are always welcome!

### Running unit tests

Run `yarn test history` to execute the unit tests via [Jest](https://jestjs.io).

### Running linting

Run `yarn lint history` to lint with [eslint](https://eslint.org).

## Contact

- Project Link: [https://github.com/alexander-lloyd/angular-apps/](https://github.com/alexander-lloyd/angular-apps/)
- LinkedIn: [![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/alexander-lloyd

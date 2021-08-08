![Pattern Lib Banner](docs/pattern-lib.png)

<h2 align="center">A reusable design pattern library for js/ts</h2>
<p align="center">
    <a href="https://github.com/crupakheti/pattern-lib/actions/workflows/node.js.yml?query=workflow%3A%22Node.js+CI%22+branch%3Amain++">
        <img alt="Build Badge" src="https://github.com/crupakheti/pattern-lib/actions/workflows/node.js.yml/badge.svg"></img>
    </a>
    <a href="https://github.com/crupakheti/pattern-lib/actions/workflows/node.js.yml?query=workflow%3A%22Node.js+CI%22+branch%3Amain++">
        <img alt="Coverage Badge" src="https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/crupakheti/d551fd551fb6cb3687e1e775e627e039/raw/pattern-lib__heads_main.json"></img>
    </a>
    <a href="https://github.com/crupakheti/pattern-lib/blob/main/LICENSE">
        <img alt="GitHub License" src="https://img.shields.io/badge/License-MIT-blue.svg"></img>
    </a>
    <a href="https://github.com/prettier/prettier">
        <img alt="Code Style" src="https://img.shields.io/badge/Code_Style-prettier-ff69b4.svg?style=flat-square"></img>
    </a>
    <a href="https://www.npmjs.com/package/@designpattern/pattern-lib">
        <img alt="npm version" src="https://img.shields.io/npm/v/@designpattern/pattern-lib.svg?style=flat-square">
    </a>
</p>

The Pattern Library project provides reusable design pattern componenets to be used in Javascript/Typescript projects. These components help achieve a loosely coupled design for re-occuring coding problems. The components exposed in this library are by no means complete and we actively seek contributions from our open-source community to expand it further.

## Installlation

You can use this library in your project by running the following at your project root:

```
npm i @designpattern/pattern-lib
```

## Documentation and Examples

We have contributed the following design patterns so far to the library. We have also contributed fully working examples for each of the patterns. Click on the links below to navigate to the detailed documentation or example usage for each.

| Patterns        | Descriptions                               |           Docs           |            Examples             |
| --------------- | ------------------------------------------ | :----------------------: | :-----------------------------: |
| **Strategizer** | Provides configurable execution strategies | [docs](docs/strategizer) | [example](examples/strategizer) |
| **Transformer** | Provides configurable transformations      | [docs](docs/transformer) | [example](examples/transformer) |

You can run any of the patterns from the root of the project by running the `npx ts-node examples/<pattern-name>/main.ts` command. Here is an example command to run the `Strategizer` pattern:

```
npx ts-node examples/strategizer/main.ts
```

## Contributing

We are actively seeking contributions of reusable patterns from our open-source community. Please read the following to learn how to contribute to the project:

### Code of Conduct

We have adopted a Code of Conduct that we expect our contributors to honor. Please read the [full text](CODE_OF_CONDUCT.md) for more information.

### Contributing Guide

Please read our [Contributing Guide](CONTRIBUTING.md) to understand our process to contribute bugfixes and new patterns to the project.

## License

This project is licensed under the [MIT License](LICENSE).

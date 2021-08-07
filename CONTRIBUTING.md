# How to Contribute

The Pattern Library project is an open-source repository. As suhc, we follow to the most part the standard open-source Github contribution process. This document will walk you through the details.

## Code of Conduct

We have adopted the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)'s Code of Conduct and we expect you will adhere to it while making any contribution to the project. Please read the full text [here](CODE_OF_CONDUCT.md).

## Semantic Versioning

The project follows the standard [semantic versioning](https://semver.org/) practice. Every meaningful change must be documented in [Changelog](CHANGELOG.md).

## Git Branching Model and Releases

We adhere to a linear branching model with the changes directly targeted for the `main` branch through pull requests. So, submit your PR to merge onto the `main` branch.

We strive to release every merged commit on the `main` branch as an npm package. So, sqash your commits in your PR into a single commit with a meaningful message. In any case, to adhere to this `Commit to Release` philosophy, we use the `Sqaush and Merge` strategy while merging a PR.

After a PR has been merged, a project maintainer will create a release to publish the commit as an npm package release.

## Bugs

We use [GitHub Issues](https://github.com/crupakheti/pattern-lib/issues) for tracking bugs and enhancements. Before you file a bug, make sure that the bug does not already exist.

You can also use the issue to discuss a new design pattern that you are planning to contribute before putting effort on an implementation.

## Pull Request

The project maintainers will monitor the project for PRs. They will review your PR and merge it, request a change to it, or close it with an explanation. Here are a few things to consider before creating a PR:

1. Fork the repo and create your branch from `main`.
2. Run `npm i` in the repo root.
3. Add applicable tests for your changes.
4. Run `npm test`. Make sure you are not reducing the code coverage due to your new changes.
5. If you are contributing new patterns, expose them appropriately though `index.ts` files where applicable.
6. Add relevant examples in the [examples](examples) folder where applicable
7. Add/update documentation in the [docs](docs) folder and update links from [README](README.md) appropriately.
8. Update the package version in [package.json](package.json) using [semantic versioning](https://semver.org/).
9. Update [package-lock.json](package-lock.json) with the same package version that's in [package.json](package.json). One way to achieve consisteny between `package.json` and `package-lock.json` is by running `npm i` after updating `package.json`. Another way is to use the [npm version](https://docs.npmjs.com/cli/v6/commands/npm-version) command.

- Update the [CHANGELOG.md](CHANGELOG.md) with an entry for the new package version.

## Style Guide

Prettier - an automatic code formatter has been configured for the project. Run `npm run lint:fix` after making changes to the code to adhere to the style guide.

## License

By contributing to this project, you are accepting that your contributions will be licensed under its [MIT License](LICENSE).

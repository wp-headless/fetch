# Contributing to Yllet

Everyone is welcome to contribute with patches, bug-fixes and new features. This is and will always be a community driven project.

## Core Ideas

The purpose of Yllet is to create a easy WordPress REST API client that works with both React and non-React project. If a third party plugin works with the REST API it then it will work with Yllet.

This project will never add plugin specific support since it's goal is to support the WordPress REST API.

## Submitting a Pull Request

Good pull requests with patches, improvements or new features is always welcome. They should remain focused in scope and avoid containing unrelated commits.

Please follow the projects code style and try to add tests for your changes.

* Fork [ylletjs/ylelt](https://github.com/ylletjs/yllet) on Github and add the upstream remote.

```
git clone https://github.com/<your-username>/yllet.git
cd yllet
git remote add upstream https://github.com/ylletjs/yllet.git
```

This is useful if you cloned your repo a while ago and now wants to update it.

```
git checkout master
git pull upstream master
```

* Create a new branch:

```
git checkout -b <topic-branch-name>
```

* Make sure to update, or add to the tests when appropriate.
* Commit your changes to your fork.
* Locally merge (or rebase) the upstream development branch into your topic branch:

```
git pull [--rebase] upstream master
```

* Push to your branch:

```
git push origin <topic-branch-name>
```

* [Open a Pull Request](https://help.github.com/articles/using-pull-requests/) with a clear title and description against the `master` branch.

**Note:**
If you are making several changes at once please divide them into multiple pull requests.

## Folder Structure

Yllet it's a monorepo containg all packages. These packages can be found in the [`packages/`](https://github.com/ylletjs/yllet/tree/master/packages) directory.

## License

By contributing your code, you agree to license your contribution under the [MIT license](https://github.com/ylletjs/yllet/blob/master/LICENSE).

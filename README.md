

### Prerequisites

* [Node.js][nodejs] v8.2.1 or higher + [Yarn][yarn] v0.27.5 or higher &nbsp; (*HINT: On Mac install
  them via [Brew][brew]*)
* [VS Code][vc] editor (preferred) + [Project Snippets][vcsnippets], [EditorConfig][vceditconfig],
  [ESLint][vceslint], [Flow][vcflow], [Prettier][vcprettier], and [stylelint][vcstylelint] plug-ins


### Getting Started

Just clone the repo and start hacking:

```bash
$ yarn install                     # Install project dependencies listed in package.json
$ yarn start                       # Compiles the app and opens it in a browser with "live reload"
```

The app should become available at [http://localhost:3000/](http://localhost:3000/).


### How to Test

```bash
$ yarn lint                        # Check JavaScript and CSS code for potential issues
$ yarn lint-fix                    # Fix potential issues in JavaScript and CSS code
$ yarn test                        # Run unit tests. Or, `yarn test -- --watch`
```

### How to deploy

#### note: the following env variables need to be set prior to deploying
```
AWS_ACCESS_KEY
AWS_SECRET_ACCESS_KEY
```
#### Staging

```bash
env PUBLIC_URL=/configurator/phone/v4/ npm run deploy
```
#### Production

```bash
env PUBLIC_URL=/configurator/phone/v4/ npm run deploy -- --production
```


### Learn React.js and ES6

:mortar_board: &nbsp; [React for Beginners](https://reactforbeginners.com/friend/konstantin) and [ES6 Training Course](https://es6.io/friend/konstantin) by Wes Bos<br>
:green_book: &nbsp; [React: Up & Running: Building Web Applications](http://amzn.to/2bBgqhl) by Stoyan Stefanov (Aug, 2016)<br>
:green_book: &nbsp; [Getting Started with React](http://amzn.to/2bmwP5V) by Doel Sengupta and Manu Singhal (Apr, 2016)<br>
:green_book: &nbsp; [You Don't Know JS: ES6 & Beyond](http://amzn.to/2bBfVnp) by Kyle Simpson (Dec, 2015)<br>

### License

Copyright © 2017-present Samsung

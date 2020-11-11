# Initialiser

Don't get me wrong, `create-react-app` is totally great. However, it encapsulates a lot of small complexities due to the fact it has to make many edge cases into acccount and because it uses Webpack under the hood.
Webpack is, by itself, also pretty great and pretty much revolutionised the making of Front-end builds, but it is somehow complex to configure, harder to maintain (you have to keep installing loaders all the time) and may not the fastest among the JS builders. In the case we want to do something more advanced and we have to execute the `eject` command from CRA it can represent a potential headache to wander through the generated files and find our way around.

Parcel, on the other hand, is a much simpler alternative to Webpack, with good performance as well. There is a package that tries to adapt CRA to use Parcel as well but, after ejecting a sample project within it, I got the impression I wasn't in a much better spot than with standard CRA. On a brief analysis, it revealed a lot of "dead code", quick and partial adaptations of the code suited for Webpack that don't seem to be finished and don't seem to simplify the whole set of generated files, which would be the point of switching to Parcel. If you have to put Typescript on top of it then we'll have another level of problem, with another package with more abstractions on top of it, which doesn't seem good enough to me.

But then, starting a project from scratch without these useful creators is not something so otherworldly that cannot be done, and offers the advantage of a leaner codebase and, especially, much more control over what is going on, which results in better maintainability. Creating a project with React, Parcel and Typescript offers the huge advantage of joining Parcel's ease of use to Typescript's encapsulation (that can make us ditch Babel.js altogether).

Don't be hindered by the apparent complexity of the steps, it is actually pretty straight-forward and it generates a very clean codebase in the end.

## 1. Initial setup and installs

Run the following commands:
- `yarn init` (and answer the questions accordingly)
- `yarn add react react-dom`
- `yarn add parcel-bundler typescript @types/react @types/react-dom --dev`

## 2. Typescript setup

Use the config below on a new file `tsconfig.json` on the root folder (or run `tsc --init` to generate a config):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "es2020",
    "allowJs": true, /* Allow javascript files to be compiled (because we won't have babel). */
    "jsx": "react",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["./src/"],
  "exclude": []
}
```

## 3. Write the initial files

- Make `src` folder
- Make a dummy `App.tsx` file for now. It will be the root component and, obviously, it can be replaced later:
```tsx
import * as React from 'react'
const App = (): JSX.Element => <div>Hello World!</div>
export default App
```
- Make `index.tsx` rendering an app root element:
```tsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('app'))
```
- Make `index.html` file inside it with element `#app` and `<script>` tag:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="index.tsx"></script>
</body>
</html>
```

## 4. Setup commands to run (and run!)

- Write on `package.json`:
```json
"scripts": {
  "start": "parcel src/index.html",
  "build": "parcel build src/index.html --public-url ./"
}
```
Note that you can, in case you prefer, build the dev/prod files on separate paths:
```json
"scripts": {
  "start": "parcel src/index.html --out-dir build/debug",
  "build": "parcel build src/index.html --out-dir build/release --public-url ./"
}
```
Another note: without specifying `--public-url ./` paths are absolute by default.
- Run `yarn start` to check if everything runs ok and whether you can see the sample App file content

## 5. Linter (optional)

This is a recommended step to make your development as standardised as possible. We chose to work with the standard called **Standard** but the AirBnB one is also good.

- Install ESLint with Standard plus Typescript lint rules: `npm install --save-dev eslint@7 eslint-plugin-standard@4 eslint-plugin-promise@4 eslint-plugin-import@2 eslint-plugin-node@11 @typescript-eslint/eslint-plugin@4 eslint-config-standard-with-typescript`
(check if this command is updated on [the project's page](https://github.com/standard/eslint-config-standard-with-typescript))
- Make a new file `.eslintrc`:
```json
{
  "extends": "standard-with-typescript",
  "parserOptions": {
    "project": "./tsconfig.json",
    "createDefaultProgram": true,
    "ecmaVersion": 2020
  }
}
```
- Make a new file `.eslintignore`:
```
node_modules
dist
.cache
.parcel-cache
```
- Write on `package.json` on `scripts` section a new line with `"lint": "eslint ."`
- Run `yarn lint` to test the linter

## 6. Unit tests (optional)

- Run `yarn add --dev jest ts-jest @types/jest` to install Jest
- Make a new file `jest.config.js`:
```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // The section below is to hide a warning about `esModuleInterop` that is pretty much useless
  // Probably they'll remove it from ts-jest eventually: https://github.com/kulshekhar/ts-jest/issues/748
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [151001]
      }
    }
  }
}
```
- Write on `package.json` on `scripts` section a new line with `"test": "jest"`
- Write a sample test file (like `App.test.jsx` on `src`) to check if everything is running ok:
```js
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

const mockAppElement = document.createElement('div')
document.body.appendChild(mockAppElement)

describe('<App />', () => {
  it('should render', () => {
    ReactDOM.render(<App />, mockAppElement)
    expect(mockAppElement.innerHTML).toBe('<div>Hello World!</div>')
  })
})
```
- Run the test with `yarn test`

## Gitignore (optional)

You can write a `.gitignore` file to help with everithing. Here's a suggestion based on what we get after the steps above.
```
/node_modules
/dist
/.cache
/.parcel-cache
.idea
.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```
You can also add some exceptions for environment variables, in case you use them:
```
.env.local
.env.development.local
.env.test.local
.env.production.local
```

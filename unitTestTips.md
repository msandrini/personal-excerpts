# Unit test tips (for TS files)

There are several standard situations in which you may fall whenever trying to test new code. Some
of them are stated here to help:

### Mock components

Whenever you write a unit test for a component with sub-components that you want to mock (maybe because they have
some logic themselves and you don't want to re-test this logic) you can take the `mockComponentWithProps` utility
from `_helpersForTests.ts` file. The implementation is usually like this:

```js
jest.mock('./path/Component', () => mockComponentWithProps('Component'))
```
*Important: the `mockComponentWithProps` import has to be **before** the current component import.*
The first param on `jest.mock` refers to the path of the sub-component's import, and the parameter on the
`mockComponentWithProps` function is the name of the component. The advantage of using this utility is that it outputs
the parameters (props) for the components in a nice, HTML-ish way. Alternatively, you can bypass the utility function
and mock it directly:
```js
jest.mock('./path/Component', () => () => 'anything')
```
I usually put something like `((Mock:Component))` in the result so the snapshots look better and it is easy to
identify this mock. However, this is not a rule, but rather a convenience.

### Mock internal non-default methods

Whenever you want to mock an function internal to the project, situated in another file, you can do this:
```js
// Supposing the tested code uses something like helpFunction(...)
import * as helpers from '../helpers'
helpers.helpFunction = jest.fn(() => 'anything')
```
But you can also do this (preferred, as in the first case the TS compiler may complain):
```js
// Supposing the tested code uses something like helpFunction(...)
import * as helpers from '../helpers'
const spy = jest.spyOn(helpers, 'helpFunction').mockReturnValue('anything')
// ...or jest.spyOn(helpers, 'helpFunction').mockImplementation(() => 'anything')
// ...or jest.spyOn(helpers, 'helpFunction').mockResolvedValue(() => 'anything') in case it returns a promise
```
With the variable `spy` defined above, you can change the return doing `spy.mockReturnValue('other thing')` and also
track calls using jest functionalities, like `expect(spy).toHaveBeenCalled...` or comparing with `spy.mock.calls`.

### Mock external non-default methods

You can do it in the same way as the second mode explained above:
```js
// Suppose the tested code uses a module with:
//    import utility from 'public-module'
// and it also uses something like utility(...)
import * as publicModule from 'public-module'
const spy = jest.spyOn(publicModule, 'utility').mockReturnValue('anything')
// ...or with mockImplementation or mockResolvedValue
```

### Considerations about using spies

You don't need to get the return of `jest.spyOn` if you don't track the calls or change the values. Also, you don't
need to have `mockReturnValue` or `mockImplementation` or anything similar. One of the patterns followed in this
project is to have a spy and then mocking its value before each test, to make sure it is not overwritten in the way:
```js
const spy = jest.spyOn(publicModule, 'utility')
beforeEach(() => {
   spy.mockReturnValue(42)
})
/* 0. equality - tell the difference */

if (x == y) { /* ... */ }
if (x === y) { /* ... */ }

/// SCOPES

/* 1. (difference var/let/const) */
/* 2. scope difference */

var xVar = 0;
let xLet = 1;
const xConst = 2;

if (true) {
    xVar = 10;
    console.log(xVar);
}
console.log(xVar);

if (true) {
    xLet = 11;
    console.log(xLet);
}
console.log(xLet);

/// ARRAYS and OBJECTS

/* 3. */

const a = [1, 2, 3, 4];

// expected: [4, 6, 8]

/* 4. */

const b1 = [1, 2, 3]; const b2 = [4, 5, 6];

// expected: [1, 2, 3, 4, 5, 6]

/* 5. */

const c = [1, 2, 3, 4, 2, 3, 2, 5, 2, 1, 3, 5, 4];

// expected: [1, 2, 3, 4]

/* 6. */

const d = { name: 'Bob', age: 30, country: 'USA', city: 'Green Bay' };

// expected: ['name', 'age', 'country', 'city'] (order is not important)

/// ES6 SYNTAX

/* 7. */

const name = person.profile.name; // rewrite

/* 8. rewrite in ES6 short syntax */

function getName(profile) {
    return profile.name;
}

/* 9. rewrite with ES6 new string operator */

const s = 'Hello ' + userFirstName + '! Last login: ' + getLoginInfo();

/// ASYNC/PROMISES

/* 10. make the function be executed after 2 seconds */

doSomething();

/* 11. tell console.log output sequence */
/* 12. rewrite using async-await */

fetch('https://someapi.com').then((result) => {
    console.log(1);

    doSomethingElse();
});
console.log(2);

/// DOM operations vanilla JS

/* 13. select element */
<h1 id="my-element"></h1>

/* 14. select 2nd element */
/* 15. change 2nd element text */
/* 16. change 2nd element text color to red */
<div class="box"></div>
<div class="box"></div>

/// REACT

/* 17. About virtual DOM and lifecycle methods */

/* 18. */

// <TopBar userName="Bob" />
// component to output html: <nav><div>Welcome Bob!</div></nav>

const TopBar = (props) => {
    return <nav></nav>;
};

/* 19. insert click event handler */
/* 20. adapt to external prop <Counter startFrom={10} /> */
/* 21. (HIGHLY OPTIONAL) adapt example below to React Hooks */

import React from 'react';

class Counter extends React.Component {
    constructor() {
        super();
        this.state = { counter: 0 };
    }

    render() {
        return (
            <div className="counter">
                <span>{counter}</span>
                <button>+</button>
            </div>
        );
    }
}

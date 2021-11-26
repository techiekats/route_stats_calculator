Ride stats generator
=======================

Overall approach
----------------

(*Solution assumes data is accurate hence performs minimal data validations and exception handling)

* State of class can be updated only via methods

* Design constructors such that the possibility of invalid object states is reduced

* Technology choice
  * TypeScript - static typing for C# with flexibility of JavaScript
  * src/ is folder for all code, per TypeScript conventions
  * Jest - Popular unit testing framework

Instructions to run
-------------------

* Open root folder in VS Code and run following commands in Terminal

`npm install`

`npm run build`

* To execute tests

`npx jest`

* Sample runs

`node lib/index.js sample_input.csv`

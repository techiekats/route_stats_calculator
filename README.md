Ride stats generator
=======================

Overall approach
----------------

(*Solution assumes data is accurate hence performs minimal data validations and exception handling)

* Assume unbounded data set, hence do not store more in memory than is needed

* Code to interfaces, not concrete classes
  * Reduces coupling between classes
  * Allows unit testing by mocking dependencies and isolating functionality to be tested
  * Allows dependency injection

* State of class can be updated only via methods

* Design constructors such that the possibility of invalid object states is reduced

* Single responsibility principle
  * DrivingHistoryTracker - acts as high level co-ordinator, keeps record of drivers and performs reporting. Outsources construction of Driver objects to DriverFactory
  * Driver - keeps log of trips. Checks if trip should be registered or not, performs aggregations
  * DriverFactory - Constructs Driver instances
  * Time - simple structure that represents time
  * Mock objects - Implement the interfaces used by their counterpart classes
  * Logger - global logger object

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

`node lib/index.js "Driver Dan" "Driver Lauren" "Driver Kumi" "Trip Dan 07:15 07:45 17.3" "Trip Dan 06:12 06:32 21.8" "Trip Lauren 12:01 13:16 42.0"`

`node lib/index.js "Driver Jimmy" "Driver Steven" "Driver Trevor" "Trip Jimmy 07:15 07:45 17.3" "Trip Steven 06:12 06:32 21.8" "Trip Trevor 12:01 13:16 42.0" "Trip Trevor 12:01 13:16 42.0" "Trip Steven 06:12 08:12 100"`

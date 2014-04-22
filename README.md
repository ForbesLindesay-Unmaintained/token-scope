# token-scope

A very fast approximation of lexical-scope.  It takes the source code and returns a list of all identifiers that have the potential to be references to global variables.  This just parses the token stream, so it is much less thorough than `lexical-scope` or using `uglify-js` to do the same thing.  It has the advantage of being vastly faster though.  It is good enough to detect that jQuery does not contain `require` or any of the node.js globals.

[![Build Status](https://img.shields.io/travis/ForbesLindesay/token-scope/master.svg)](https://travis-ci.org/ForbesLindesay/token-scope)
[![Dependency Status](https://img.shields.io/gemnasium/ForbesLindesay/token-scope.svg)](https://gemnasium.com/ForbesLindesay/token-scope)
[![NPM version](https://img.shields.io/npm/v/token-scope.svg)](http://badge.fury.io/js/token-scope)

## Installation

    npm install token-scope

## Usage

```js
var detect = require('token-scope')
var inspectForRequire = detect(src)

if (inspectForRequire.indexOf('require') != -1) {
  // do more time consuming checks to search for require properly
}
```

Tests:

```js
var detect = require('token-scope')

describe('detect(src, identifiers)', function () {
  it('returns an array of identifiers that might represent global variable references', function () {
    assert(detect('var x = require("foo")').indexOf('require') != -1)
    assert(detect('var x = foo("require")').indexOf('require') == -1)
  })
})
```

## Benchmarking

To run the benchmarks, download this repository then do:

```console
$ npm install
$ node bench/run.js
```

This runs 3 different scoping mechanisms on a minified copy of jQuery and report the total time for 10 iterations.  They then also check that the result does not include any of the node.js globals. On my machine, this results in the output (note how `token-scope` results in a lot more potential globals, but still turns out to be good enough to rule out node.js globals):

 name          | time   | output
---------------|--------|---------------
 token-scope   | 747ms  | a,b,cy,f,cv,ck,…
 ugly-scope    | 1457ms | setTimeout,par…
 lexical-scope | 2252ms | setTimeout,par…

## License

  MIT
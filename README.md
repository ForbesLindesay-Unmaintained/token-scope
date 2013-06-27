# token-scope

A very fast approximation of lexical-scope.  It takes the source code and returns a list of all identifiers that have the potential to be references to global variables.  This just parses the token stream, so it is much less thorough than `lexical-scope` or using `uglify-js` to do the same thing.  It has the advantage of being vastly faster though.  It is good enough to detect that jQuery does not contain `require` or any of the node.js globals.

[![Build Status](https://travis-ci.org/ForbesLindesay/token-scope.png?branch=master)](https://travis-ci.org/ForbesLindesay/token-scope)
[![Dependency Status](https://gemnasium.com/ForbesLindesay/token-scope.png)](https://gemnasium.com/ForbesLindesay/token-scope)
[![NPM version](https://badge.fury.io/js/token-scope.png)](http://badge.fury.io/js/token-scope)

## Installation

    npm install token-scope

## Usage

```js
var detect = require('token-scope')
var inspectForRequire = detect(src, ['require'])

if (inspectForRequire) {
  // do more time consuming checks to search for require properly
}
```

Tests:

```js
var detect = require('token-scope')

describe('detect(src, identifiers)', function () {
  it('returns `true` if the identifiers occur in src', function () {
    assert(detect('var x = require("foo")', ['require']) === true)
  })
  it('returns `false` if the identifiers do not occur in src', function () {
    assert(detect('var x = foo("require")', ['require']) === false)
  })
})
```

## Benchmarking

To run the benchmarks, download this repository then do:

```console
$ npm install
$ node bench/run.js
```

This runs 3 different scoping mechanisms on a minified copy of jQuery.  They then also check that the result does not include any of the node.js globals. On my machine, this results in the output (note how `token-scope` results in a lot more potential globals, but still turns out to be good enough to rule out node.js globals):

 name          | time   | output
---------------|--------|---------------------------------------------------------------------------------------------------
 token-scope   | 747ms  | a,b,cy,f,cv,ck,c,d,e,cl,cm,cu,cq,ct,cr,cs,setTimeout,cj,ci,cc,g,h,i,j,k,l,m,n,o,p,cb,ca,bE,b_,b$,…
 ugly-scope    | 1457ms | setTimeout,parseFloat,Object,Array,String,arguments,isNaN,isFinite,Error,Function,DOMParser,Activ…
 lexical-scope | 2252ms | setTimeout,parseFloat,Object,Array,String,arguments,isNaN,isFinite,Error,Function,DOMParser,Activ…

## License

  MIT
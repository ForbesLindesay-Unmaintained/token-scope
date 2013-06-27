'use strict'

var assert = require('assert')
var detect = require('../')

describe('detect(src, identifiers)', function () {
  it('returns an array of identifiers that might represent global variable references', function () {
    assert(detect('var x = require("foo")').indexOf('require') != -1)
    assert(detect('var x = foo("require")').indexOf('require') == -1)
  })
})
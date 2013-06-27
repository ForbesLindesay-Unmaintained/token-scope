'use strict'

var assert = require('assert')
var detect = require('../')

describe('detect(src, identifiers)', function () {
  it('returns `true` if the identifiers occur in src', function () {
    assert(detect('var x = require("foo")', ['require']) === true)
  })
  it('returns `false` if the identifiers do not occur in src', function () {
    assert(detect('var x = foo("require")', ['require']) === false)
  })
})
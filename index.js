'use strict'

var esprima = require('esprima')

module.exports = detect
function detect(src) {
  var tokens = (typeof src === 'object' && src.tokens ? src.tokens : esprima.tokenize(src))
  var res = []
  var seen = {}
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i].type === 'Identifier' && !prescoper(tokens[i - 1]) && !postscoper(tokens[i + 1])) {
      if (!(tokens[i].value in seen)) {
        seen[tokens[i].value] = true
        res.push(tokens[i].value)
      }
    }
  }
  return res
}

function prescoper(token) {
  if (token) {
    return (token.type === 'Punctuator' && token.value === '.')
  }
}
function postscoper(token) {
  if (token) {
    return token.type === 'Punctuator' && token.value === ':'
  }
}
exports['token-scope'] = require('../')
var uglify = require('uglify-js')
exports['ugly-scope'] = function detect(src) {
  var ast = uglify.parse(src.toString())
  ast.figure_out_scope()
  var globals = ast.globals
    .map(function (node, name) {
      return name
    })
  return globals
}
exports['lexical-scope'] = require('lexical-scope')
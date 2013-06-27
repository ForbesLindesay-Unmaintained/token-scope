var fs = require('fs')
var assert = require('assert')
var ms = require('ms')
var Table = require('cli-table')
var api = require('./api')
var jquery = fs.readFileSync(__dirname + '/jquery.js', 'utf8')

var table = new Table({head: ['name', 'time', 'output'], colWidths: [15, 8, 60]})
Object.keys(api)
  .forEach(function (name) {
    var start = new Date()
    var result
    for (var i = 0; i < 10; i++) {
      result = api[name](jquery)
      assert(!contains((result.globals ? result.globals.implicit : result), ['process', 'global', 'Buffer', '__filename', '__dirname', 'require']), name + ' must be able to detect that jQuery does not contain node.js globals')
    }
    var end = new Date()
    table.push([name, (end - start) + 'ms', (result.globals ? result.globals.implicit : result)])
  })

console.log(table.toString())

function contains(a, b) {
  for (var i = 0; i < b.length; i++) {
    if (a.indexOf(b[i]) != -1) return true
  }
  return false
}
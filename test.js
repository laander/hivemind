/**
 * Bootstap jasmine and run tests
 */

process.env.NODE_ENV = 'TEST'

var Jasmine = require('jasmine')
var SpecReporter = require('jasmine-spec-reporter')
var noop = function () {}

require('babel-register')
require('babel-polyfill')

var jas = new Jasmine()
jas.configureDefaultReporter({print: noop})    // remove default reporter logs
jasmine.getEnv().addReporter(new SpecReporter())   // add jas-spec-reporter
jas.loadConfigFile('jasmine.json')
jas.execute()

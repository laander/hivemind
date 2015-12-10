/**
 * Bootstap jasmine and run tests
 */

var Jasmine = require('jasmine')
require('babel-register')

var jasmine = new Jasmine()
jasmine.loadConfigFile('jasmine.json')
jasmine.execute()

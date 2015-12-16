/**
 * Main bootstrap
 */

process.env.NODE_ENV = 'DEV'

require('babel-register')
require('babel-polyfill')
require('./world/commander')

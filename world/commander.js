/**
 * CLI
 */

import Vantage from 'vantage'
import * as orchestrator from './orchestrator'
var vantage = Vantage()

vantage
  .command('start')
  .description('Runs the initialization')
  .action(function (args, callback) {
    orchestrator.start().then(callback)
  })

vantage
  .command('shutdown')
  .description('Shuts the cluster down')
  .action(function (args, callback) {
    orchestrator.shutdown().then(callback)
  })

vantage
  .command('freeze')
  .description('Cryo freezes all pods')
  .action(function (args, callback) {
    orchestrator.freeze().then(callback)
  })

vantage
  .command('revive')
  .description('Revives all pods from cryo')
  .action(function (args, callback) {
    orchestrator.revive().then(callback)
  })

vantage
  .command('l')
  .description('Listens to human status')
  .action(function (args, callback) {
    orchestrator.listen()
    callback()
  })

vantage
  .command('s')
  .description('Stops listening to human status')
  .action(function (args, callback) {
    orchestrator.unlisten()
    callback()
  })

vantage
  .delimiter('hivemind$')
  .banner('############# Hivemind ##############')
  .listen(8889)
  .show()

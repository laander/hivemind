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
    orchestrator.start().then(callback).catch(e => { console.log('Err!', e); callback() })
  })

vantage
  .command('do')
  .description('Generate more pods')
  .option('-a, --action <name>', 'Name of action')
  .action(function (args, callback) {
    if (!args.options.action) { callback(); return }
    orchestrator.clusterDo(args.options.action).then(callback).catch(e => { console.log('Err!', e); callback() })
  })

vantage
  .command('generate')
  .description('Generate more pods')
  .option('-a, --amount <pods>', 'Number of pods.')
  .action(function (args, callback) {
    orchestrator.generatePods(args.options.amount).then(callback).catch(e => { console.log('Err!', e); callback() })
  })

vantage
  .command('outage')
  .description('Shuts down the cluster unexpectedly')
  .action(function (args, callback) {
    orchestrator.powerOutage().then(callback).catch(e => { console.log('Err!', e); callback() })
  })

vantage
  .command('recover')
  .description('Power on and recovers the cluster and pods')
  .action(function (args, callback) {
    orchestrator.powerRecover().then(callback).catch(e => { console.log('Err!', e); callback() })
  })

vantage
  .command('freeze')
  .description('Cryo freezes all pods')
  .action(function (args, callback) {
    orchestrator.freeze().then(callback).catch(e => { console.log('Err!', e); callback() })
  })

vantage
  .command('revive')
  .description('Revives all pods from cryo')
  .action(function (args, callback) {
    orchestrator.revive().then(callback).catch(e => { console.log('Err!', e); callback() })
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

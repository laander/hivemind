/**
 * World env
 */

import Sentient from '../sentient'
// import Cluster from '../cluster'
// import Pod from '../pod'
// import Human from '../human'
import * as relay from '../relay'
import * as orchestrator from './orchestrator'
import * as commander from './commander'
import * as logger from './logger'
import Chance from 'chance'

var rand = new Chance()

class World {

  constructor () {
    this.properties = {
      guid: rand.hash({length: 10})
    }
    logger.log(this, 'loading')
    this.orchestrator = orchestrator.init()
    this.commander = commander.init()
    this.relay = relay.init()
    this.cluster
    this.startSentient()
  }

  startSentient () {
    this.ai = new Sentient()
    this.ai.train()
  }

}

export default new World()

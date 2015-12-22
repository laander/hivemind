/**
 * World env
 */

import Sentient from '../sentient'
import Cluster from '../cluster'

class World {

  constructor () {
    this.ai = new Sentient()
    this.ai.train()
    this.cluster = new Cluster()
  }

}

var world = null

export default function () {
  if (!world) world = new World()
  return world
}

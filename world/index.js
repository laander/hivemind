/**
 * World env
 */

import Sentient from '../sentient'
import Cluster from '../cluster'
import Pod from '../pod'
import Human from '../human'

class World {

  constructor () {
    this.ai = new Sentient()
    this.ai.train()
    this.cluster = new Cluster()
    this.entities = [
      Cluster,
      Pod,
      Human
    ]
  }

}

var world = null

export default function () {
  if (!world) world = new World()
  return world
}

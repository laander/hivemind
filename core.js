/**
 * Core orchestrator
 */

import Human from './human'

let human = new Human()

setInterval(() => {
  console.log('Name: ' + human.properties.name)
  console.log('Age: ' + human.properties.age)
  console.log('Weight: ' + human.properties.weight)
  console.log('Hunger: ' + human.properties.hunger)
  console.log('Tired: ' + human.properties.tired)
  console.log('Energy: ' + human.properties.energy)
  console.log('State:', human.state)
}, 100)

setTimeout(() => {
  human.machine.die()
}, 10000)

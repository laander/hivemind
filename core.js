/**
 * Core orchestrator
 */

// import Human from './human'
import Cluster from './cluster'
import Chance from 'chance'

let cluster = new Cluster()
let rand = new Chance()

let humans = 5

async function run () {
  await cluster.machine.powerOn()
  console.log('cluster generating', cluster.pods.length)
  await cluster.generate(humans)
  console.log('cluster generated', cluster.pods.length)
}

run()
.then(res => {
  console.log('success! ', res)
})
.catch(err => {
  console.log('error!', err.message)
})

setInterval(loop, 1000)

function loop () {
  cluster.pods.forEach(pod => {
    if (pod.isMounted) out(pod, pod.human)
    if (pod.inCryo) out(pod, pod.cryoBank[0])
  })
  console.log('------------------')
}

function out (pod, human) {
  console.log(Math.round(human.properties.age) + ' - ' + human.properties.ssn + ' - ' + human.state + ' - ' + Math.round(human.properties.hunger) + (pod.inCryo ? ' (frozen)' : ''))
}

// setInterval(randomKill, 5000)

// function randomKill () {
//   let pick = rand.integer({min: 0, max: humans - 1})
//   cluster.pods[pick].terminate()
//   cluster.pods[pick].seed()
// }

setInterval(randomFreeze, 9000)

function randomFreeze () {
  try {
    let pick = rand.integer({min: 0, max: humans - 1})
    cluster.pods[pick].cryoFreeze()
  } catch (e) {
    console.log(e)
  }
}

setInterval(randomRevive, 3000)

function randomRevive () {
  try {
    let pick = rand.integer({min: 0, max: humans - 1})
    cluster.pods[pick].cryoRevive()
  } catch (e) {
    console.log(e)
  }
}

//
// function generateHuman (slot) {
//   let human = new Human()
//   human.slot = slot
//   humans[slot] = human
//   human.machine.on('transition', data => {
//     if (data.toState === 'dead') {
//       generateHuman(human.slot)
//     }
//   })
// }
//
// for (var i = 0; i < 100; i++) {
//   generateHuman(i)
// }

// setInterval(() => {
//   humans.forEach(human => {
//     //console.log(Math.round(human.properties.age) + ' - ' + human.properties.name)
//   })
//   // console.log('Age: ' + humans[0].properties.age)
//   // console.log('Weight: ' + humans[0].properties.weight)
//   // console.log('Hunger: ' + humans[0].properties.hunger)
//   // console.log('Tired: ' + humans[0].properties.tired)
//   // console.log('Energy: ' + humans[0].properties.energy)
//   // console.log('Bowel: ' + humans[0].properties.bowel)
//   // console.log('State:', humans[0].state)
// }, 100)

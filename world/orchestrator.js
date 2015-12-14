/**
 * Orchestrator
 */

import Cluster from '../cluster'
import moment from 'moment'

let cluster
let loopInterval

export async function start () {
  let humans = 5
  try {
    cluster = new Cluster()
    await cluster.do('assemble')
    await cluster.do('powerOn')
    await cluster.do('generatePods', humans)
    _loop()
  } catch (e) {
    console.log('ERROR', e.message, e.stack)
  }
}

export async function shutdown () {
  await cluster.do('powerOff')
  _loop()
}

export async function freeze () {
  await cluster.do('cryoFreezePods')
  _loop()
}

export async function revive () {
  await cluster.do('cryoRevivePods')
  _loop()
}

export function listen () {
  loopInterval = setInterval(_loop, 1000)
}

export function unlisten () {
  clearInterval(loopInterval)
}

function _loop () {
  console.log('----------------')
  console.log(
    moment().format('hh:mm:ss'),
    'Cluster:',
    cluster.state,
    '[' + cluster.pods.length + ']'
  )
  if (cluster.pods.length < 1) return
  cluster.pods.forEach(pod => {
    if (pod.isMounted) _out(pod, pod.human)
    if (pod.inCryo) _out(pod, pod.cryoBank[0])
  })
}

function _out (pod, human) {
  console.log(
    moment().format('hh:mm:ss'),
    '|',
    pod.state,
    '[' + pod.cryoBank.length + ']',
    '|',
    Math.round(human.properties.age) + ' - ' +
    human.properties.name + ' - ' +
    human.state + ' - ( ' +
    Math.round(human.properties.energy),
    Math.round(human.properties.hunger),
    Math.round(human.properties.tired),
    Math.round(human.properties.bowel) + ' )'
  )
}

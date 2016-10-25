/**
 * World
 */

var constants = {}

switch (process.env.NODE_ENV) {
  case 'DEV':

    constants.consoleLog = true
    constants.time = {
      cycle: 10 // 100
    }
    constants.cluster = {
      assembling: 1000, // 1000
      powering: 500 // 1000
    }
    constants.pod = {
      assembling: 1000, // 1000
      powering: 500 // 1000
    }
    constants.human = {
      cryo: 1000,
      agingModifier: 60, // 60 - how many real-life seconds does it take for 1 virtual year
      actionModifier: 100 // 1
    }
    break

  case 'TEST':

    constants.consoleLog = false
    constants.time = {
      cycle: 1 // 100
    }
    constants.cluster = {
      assembling: 1, // 1000
      powering: 1 // 1000
    }
    constants.pod = {
      assembling: 1, // 1000
      powering: 1 // 1000
    }
    constants.human = {
      cryo: 1,
      agingModifier: 60, // 60 - how many real-life seconds does it take for 1 virtual year
      actionModifier: 10000 // 1
    }
    break

}

export default constants

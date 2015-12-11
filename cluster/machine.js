/**
 * Human states
 */

import * as lo from 'lodash'

// define transitions

export var transitions = {
  powerOn: function () { this.transition('on') },
  powerOff: function () { this.transition('off') }
}

// define states

export var states = {
  off: function () {
    console.log('cluster powered off')
  },
  on: function () {
    console.log('cluster powered on')
  }
}

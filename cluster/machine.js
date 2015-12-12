/**
 * Cluster states
 */

export var transitions = {
  powerOn: function () { this.transition('on') },
  powerOff: function () { this.transition('off') }
}

export var states = {
  off: function () {
    console.log('cluster powered off')
  },
  on: function () {
    console.log('cluster powered on')
  }
}

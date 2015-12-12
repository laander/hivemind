/**
 * Pod states
 */

export var transitions = {
  powerOn: function () { this.transition('on') },
  powerOff: function () { this.transition('off') }
}

export var states = {
  off: function () {
    console.log('pod powered off')
    if (this.mother.isMounted) this.mother.cryoFreeze()
  },
  on: function () {
    console.log('pod powered on')
    if (this.mother.inCryo) this.mother.cryoRevive()
  }
}

/**
 * Pod utils
 */

export function PodError (message) {
  this.message = message
  this.stack = Error().stack
}

PodError.prototype = Object.create(Error.prototype)
PodError.prototype.name = 'PodError'
PodError.prototype.constructor = PodError

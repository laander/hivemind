/**
 * Cluster
 */

export function initialized () {
  this._log('state', 'initialized')
}

export function off () {
  this._log('state', 'off')
}

export function on () {
  this._log('state', 'on')
}

export function operating () {
  this._log('state', 'operating')
}

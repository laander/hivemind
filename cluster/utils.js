/**
 * Cluster
 */

export function ClusterError (message) {
  this.message = message
  this.stack = Error().stack
}

ClusterError.prototype = Object.create(Error.prototype)
ClusterError.prototype.name = 'ClusterError'
ClusterError.prototype.constructor = ClusterError

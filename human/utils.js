/**
 * Human utilities
 */

 export function HumanError (message) {
   this.message = message
   this.stack = Error().stack
 }

 HumanError.prototype = Object.create(Error.prototype)
 HumanError.prototype.name = 'HumanError'
 HumanError.prototype.constructor = HumanError

/**
 * Pod listeners
 */

export default {
  dead: async function () {
    await this.terminate()
    await this.seed()
  }
}

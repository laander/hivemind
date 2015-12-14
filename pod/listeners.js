/**
 * Pod listeners
 */

export default {
  dead: async function () {
    this._log('listener', 'dead')
    await this._flush()
    await this.do('reSeed')
  }
}

/**
 * Pod listeners
 */

export default {
  dead: async function () {
    this._log('listener', 'dead')
    // if (this.state !== 'operating') return
    // this._flush()
    // await this.do('reSeed')
  }
}

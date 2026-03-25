import { configure } from '../actions/configure'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const taskConfigure = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await sdk.action.createOwnTask(effects, configure, 'important', {
      reason: i18n('Set your Maple API key'),
    })
  }
})

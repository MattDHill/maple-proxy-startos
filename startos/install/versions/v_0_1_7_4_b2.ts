import { VersionInfo } from '@start9labs/start-sdk'

export const v_0_1_7_4_b2 = VersionInfo.of({
  version: '0.1.7:4-beta.2',
  releaseNotes: {
    en_US:
      'Update to upstream v0.1.7 (security patches, streaming fix) and StartOS SDK beta.58',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})

import { VersionInfo } from '@start9labs/start-sdk'

export const v_0_1_8_1 = VersionInfo.of({
  version: '0.1.8:1',
  releaseNotes: {
    en_US: 'Bumps start-sdk → 1.5.2.',
    es_ES: 'Actualiza start-sdk → 1.5.2.',
    de_DE: 'Aktualisiert start-sdk → 1.5.2.',
    pl_PL: 'Aktualizuje start-sdk → 1.5.2.',
    fr_FR: 'Met à jour start-sdk → 1.5.2.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})

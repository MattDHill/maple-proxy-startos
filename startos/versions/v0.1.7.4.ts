import { VersionInfo } from '@start9labs/start-sdk'

export const v_0_1_7_4 = VersionInfo.of({
  version: '0.1.7:4',
  releaseNotes: {
    en_US: 'Update to upstream v0.1.7 (security patches, streaming fix)',
    es_ES: 'Actualización a upstream v0.1.7 (parches de seguridad, corrección de streaming)',
    de_DE: 'Update auf Upstream v0.1.7 (Sicherheitspatches, Streaming-Fix)',
    pl_PL: 'Aktualizacja do upstream v0.1.7 (łatki bezpieczeństwa, naprawa streamingu)',
    fr_FR: 'Mise à jour vers upstream v0.1.7 (correctifs de sécurité, correction du streaming)',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})

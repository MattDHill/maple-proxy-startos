import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.11:0',
  releaseNotes: {
    en_US: `Updated Maple Proxy to 0.1.11.

- Maintenance release. Upstream publishes no changelog for this version.

Full release notes: https://github.com/OpenSecretCloud/maple-proxy/releases/tag/v0.1.11`,
    es_ES: `Actualiza Maple Proxy a 0.1.11.

- Versión de mantenimiento. El proyecto original no publica un registro de cambios para esta versión.

Notas de la versión completas: https://github.com/OpenSecretCloud/maple-proxy/releases/tag/v0.1.11`,
    de_DE: `Aktualisiert Maple Proxy auf 0.1.11.

- Wartungsversion. Das Upstream-Projekt veröffentlicht für diese Version keine Änderungsliste.

Vollständige Versionshinweise: https://github.com/OpenSecretCloud/maple-proxy/releases/tag/v0.1.11`,
    pl_PL: `Aktualizuje Maple Proxy do 0.1.11.

- Wydanie konserwacyjne. Projekt źródłowy nie publikuje listy zmian dla tej wersji.

Pełne informacje o wydaniu: https://github.com/OpenSecretCloud/maple-proxy/releases/tag/v0.1.11`,
    fr_FR: `Met à jour Maple Proxy vers 0.1.11.

- Version de maintenance. Le projet en amont ne publie pas de journal des modifications pour cette version.

Notes de version complètes : https://github.com/OpenSecretCloud/maple-proxy/releases/tag/v0.1.11`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})

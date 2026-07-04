import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.10:0',
  releaseNotes: {
    en_US:
      'Updated Maple Proxy to 0.1.10. Adds configurable backend timeouts, per-API-key OpenSecret client caching, and a higher request body limit for larger payloads. See https://github.com/OpenSecretCloud/maple-proxy/releases. Also includes internal updates for start-sdk 2.0.',
    es_ES:
      'Se actualizó Maple Proxy a la versión 0.1.10. Añade tiempos de espera configurables para el backend, almacenamiento en caché de clientes de OpenSecret por clave de API y un límite de cuerpo de solicitud mayor para cargas más grandes. Consulta https://github.com/OpenSecretCloud/maple-proxy/releases. También incluye actualizaciones internas para start-sdk 2.0.',
    de_DE:
      'Maple Proxy auf 0.1.10 aktualisiert. Ergänzt konfigurierbare Backend-Timeouts, OpenSecret-Client-Caching pro API-Schlüssel und ein höheres Limit für den Anfrage-Body für größere Nutzlasten. Siehe https://github.com/OpenSecretCloud/maple-proxy/releases. Enthält außerdem interne Aktualisierungen für start-sdk 2.0.',
    pl_PL:
      'Zaktualizowano Maple Proxy do wersji 0.1.10. Dodaje konfigurowalne limity czasu backendu, buforowanie klientów OpenSecret dla poszczególnych kluczy API oraz wyższy limit treści żądania dla większych ładunków. Zobacz https://github.com/OpenSecretCloud/maple-proxy/releases. Zawiera również wewnętrzne aktualizacje dla start-sdk 2.0.',
    fr_FR:
      'Maple Proxy mis à jour vers la version 0.1.10. Ajoute des délais d’attente configurables pour le backend, la mise en cache des clients OpenSecret par clé d’API et une limite plus élevée pour le corps des requêtes afin de gérer des charges plus importantes. Voir https://github.com/OpenSecretCloud/maple-proxy/releases. Inclut également des mises à jour internes pour start-sdk 2.0.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})

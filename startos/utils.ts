// Ports used by upstream maple-proxy:0.1.6 — verify these on every upstream version bump
export const apiPort = 8080
export const uiPort = 80

// MultiHost ids — exported so dependents can resolve these bindings over the bridge
export const apiHostId = 'api-multi'
export const uiHostId = 'ui-multi'

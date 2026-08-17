// Both are also hardcoded in assets/ui/nginx.conf (proxy_pass and listen) — change them together
export const apiPort = 8080
export const uiPort = 80

// MultiHost ids — exported so dependents can resolve these bindings over the bridge
export const apiHostId = 'api-multi'
export const uiHostId = 'ui-multi'

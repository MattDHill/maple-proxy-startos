<p align="center">
  <img src="icon.png" alt="Maple Proxy Logo" width="21%">
</p>

# Maple Proxy on StartOS

> Everything not listed in this document should behave the same as upstream
> Maple Proxy. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Maple Proxy](https://github.com/OpenSecretCloud/maple-proxy) puts an OpenAI-compatible API in front of [Maple/OpenSecret's](https://trymaple.ai/) enclave-hosted inference, so any OpenAI client can talk to it. This package runs that proxy and adds a small chat page of its own, so the service is usable without configuring a separate client.

- **Upstream repo:** <https://github.com/OpenSecretCloud/maple-proxy>
- **Wrapper repo:** <https://github.com/Start9-Community/maple-proxy-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

Two images: the upstream proxy, and a web page built here.

| Property      | Value                                                      |
| ------------- | ---------------------------------------------------------- |
| Images        | `ghcr.io/opensecretcloud/maple-proxy`, plus an nginx build |
| Architectures | x86_64, aarch64                                            |
| Command       | The proxy's entrypoint; nginx in the foreground            |

| Subcontainer      | Purpose                                           |
| ----------------- | ------------------------------------------------- |
| `maple-proxy-sub` | The API server — attach here for the proxy's logs |
| `maple-ui-sub`    | nginx: the chat page, and a proxy pass to the API |

**The web page is this package's, not upstream's.** It is a single static file served by nginx, added because the upstream project ships an API and no interface. Upstream's own product has a web client; this is not it.

nginx serves the page and forwards `/v1/` and `/health` to the API server over loopback — subcontainers of a service share one network namespace, which is what makes that reachable without exporting anything.

## Volume and Data Layout

One volume, holding one file.

| Volume | Mount Point | Purpose           |
| ------ | ----------- | ----------------- |
| `main` | `/data`     | The configuration |

The web page's subcontainer mounts nothing — it is stateless, and its content is baked into its image.

**Nothing else is persisted.** Conversations live in the browser tab and are gone when it closes; no history, no accounts, and no cache are stored on the server.

## File Models

One model, holding the whole configuration surface.

| File         | Format | Modelled                | Written by           |
| ------------ | ------ | ----------------------- | -------------------- |
| `store.json` | JSON   | Yes — `FileHelper.json` | Init, and the action |

Two fields: the backend URL, defaulted to Maple's hosted enclave, and an optional API key.

**The key is omitted from the environment when empty rather than passed as a blank**, and that distinction is the package's central behavior: with a key set, the proxy authenticates every request itself and callers need none; with no key, each caller must send their own in the `Authorization` header.

The store is read reactively, so running the action restarts the service to pick up the change.

## Dependencies

None.

**But the service is not self-contained.** Every request is forwarded to the backend URL — by default a machine Maple operates — so the package needs working internet, and prompts leave the server. Running this proxy locally is not running inference locally.

## Network Access and Interfaces

Two interfaces, both plain HTTP on the LAN and neither authenticated by StartOS.

| Interface | Id    | Type | Port | Description                    |
| --------- | ----- | ---- | ---- | ------------------------------ |
| API       | `api` | api  | 8080 | The OpenAI-compatible endpoint |
| Web UI    | `ui`  | ui   | 80   | The chat page                  |

Each is bound on its own MultiHost and not masked.

**The two are not separate surfaces.** nginx forwards `/v1/` to the API server, so the Web UI address answers API calls as well — exporting only the UI does not keep the API private.

**Cross-origin requests are enabled unconditionally**, so a page loaded from any origin can call the API from a browser that can reach the address.

Consequences worth being explicit about: with a server-side key configured, **reaching the address is enough to spend against that key** — there is no second credential. Treat both addresses as secrets, or leave the key unset and let each client bring its own.

## Installation and First-Run Flow

Install seeds the configuration with the default backend and no key, then raises a task suggesting the key be set.

The service starts and both checks go green whether or not a key is configured — an unkeyed proxy is a supported configuration, not a half-finished one. What differs is who supplies the credential.

The proxy starts first and the web page waits for it, so the page never comes up in front of an API that is not answering.

## Actions

One action.

### Configure

Sets the backend URL and the API key.

- **What it changes:** both fields in the configuration.
- **Cost:** the service restarts, since the values are read at start.
- **Repeat safety:** idempotent, and pre-filled with the current values. Clearing the key field removes it, which switches the proxy to requiring callers to supply their own.
- **Runnable at any status**, including stopped.

Leave the backend URL alone unless you run your own; pointing it elsewhere is the supported way to use a different enclave operator.

## Tasks

One, raised at install.

| Task      | Severity    | Raised when | Cleared when    |
| --------- | ----------- | ----------- | --------------- |
| Configure | `important` | Install     | The action runs |

`important` is advisory: it does not block the service from starting, because a proxy with no server-side key is a legitimate way to run this — the caller authenticates instead.

## Health Checks

Two checks, one per daemon.

| Check         | Displayed as   | Method                 |
| ------------- | -------------- | ---------------------- |
| `maple-proxy` | "Proxy Server" | Port 8080 is listening |
| `ui`          | "Web UI"       | Port 80 is listening   |

Both report that a socket is accepting connections. **Neither says anything about the backend**: an unreachable enclave, an expired key, and a rejected model all show two green checks and an error in the chat page or in the client's response.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. In practice that is the one configuration file, holding the backend URL and the API key.

**The backup therefore contains the API key in recoverable form.** There is nothing else to lose: no conversations, no accounts, no local model data.

A restored instance comes back configured and working immediately, since nothing in the configuration is tied to the server it ran on.

## Limitations and Differences

1. **Inference is not local.** Prompts are forwarded to the configured backend, which by default is operated by Maple.
2. **Neither interface is authenticated by StartOS**, and with a server-side key, address knowledge is spending power.
3. **The Web UI address also serves the API**, so the two cannot be exported independently.
4. **CORS is on unconditionally** and is not configurable from the package.
5. **The chat page is this package's own** — minimal, and not upstream's client. It keeps no history and stores nothing.
6. **The only configuration is the backend URL and the key.** Every other upstream setting is left at its default and is not exposed.

---

## Quick Reference for AI Consumers

```yaml
package_id: maple-proxy
image: ghcr.io/opensecretcloud/maple-proxy # plus a locally built nginx image for the UI
architectures:
  - x86_64
  - aarch64
subcontainers:
  - maple-proxy-sub # the API server
  - maple-ui-sub # nginx: static page + proxy_pass to the API over loopback
volumes:
  main: /data # mounted into maple-proxy-sub only; the UI is stateless
file_models:
  - store.json # backend URL and optional API key
startos_managed_env_vars:
  - MAPLE_HOST
  - MAPLE_PORT
  - MAPLE_BACKEND_URL
  - MAPLE_ENABLE_CORS
  - RUST_LOG
  - MAPLE_API_KEY # set only when non-empty
dependencies: [] # but requires internet: requests are forwarded to the backend URL
interfaces:
  api: { type: api, port: 8080 }
  ui: { type: ui, port: 80 } # also answers /v1/ via nginx proxy_pass
actions:
  - configure
tasks:
  - { action: configure, severity: important } # install only
health_checks:
  - maple-proxy # displayed "Proxy Server"
  - ui # displayed "Web UI"; requires maple-proxy
```

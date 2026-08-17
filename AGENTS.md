# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **`assets/ui/` is ours, not upstream's.** The upstream project ships an API and no interface; the chat page here is a single hand-written `index.html` served by nginx. It is not upstream's Maple client and doesn't track it.
- **nginx reaches the proxy at `127.0.0.1:8080` because subcontainers share the service's network namespace.** That is also why exporting the `ui` interface exports the API surface with it — `proxy_pass` on `/v1/` makes the UI address answer API calls.
- **`MAPLE_API_KEY` is omitted from the env when empty, not passed blank.** The two states are functionally different: with a key the proxy authenticates upstream itself, without one every caller must send its own. Don't "fix" this by defaulting it.
- **The ports in `utils.ts` are duplicated in `assets/ui/nginx.conf`.** We choose the API port (`MAPLE_PORT` is passed to the image), but nginx's `proxy_pass` and `listen` hardcode both — so changing one constant without the conf breaks the UI's API path silently while both health checks stay green.
- **The `configure` task is `important`, not `critical`, deliberately.** An unkeyed proxy is a supported configuration.

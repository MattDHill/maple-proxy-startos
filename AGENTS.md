# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes.

**Bugs and feature requests are GitHub issues on this repo** — file them as you find them.
Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **`assets/ui/` is ours, not upstream's.** The upstream project ships an API and no interface; the chat page here is a single hand-written `index.html` served by nginx. It is not upstream's Maple client and doesn't track it.
- **nginx reaches the proxy at `127.0.0.1:8080` because subcontainers share the service's network namespace.** That is also why exporting the `ui` interface exports the API surface with it — `proxy_pass` on `/v1/` makes the UI address answer API calls.
- **`MAPLE_API_KEY` is omitted from the env when empty, not passed blank.** The two states are functionally different: with a key the proxy authenticates upstream itself, without one every caller must send its own. Don't "fix" this by defaulting it.
- **The ports in `utils.ts` are duplicated in `assets/ui/nginx.conf`.** We choose the API port (`MAPLE_PORT` is passed to the image), but nginx's `proxy_pass` and `listen` hardcode both — so changing one constant without the conf breaks the UI's API path silently while both health checks stay green.
- **The `configure` task is `important`, not `critical`, deliberately.** An unkeyed proxy is a supported configuration.

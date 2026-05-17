# CLAUDE.md

See [CONTRIBUTING.md](CONTRIBUTING.md) for the doc map and contribution workflow.

## Operating rules

- **Fork of `islandbitcoin/maple-proxy-startos`.** Confirm with `gh api repos/Start9-Community/maple-proxy-startos --jq '.parent.full_name'` — `manifest.upstreamRepo` points at `OpenSecretCloud/maple-proxy`, the upstream *software*, not the parent of this packaging repo.
- **Two images.** `maple-proxy` is pulled by `dockerTag`; `maple-ui` is built locally from `assets/ui/`. Upstream version bumps only change the proxy tag.

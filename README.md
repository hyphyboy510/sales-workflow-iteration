# Sales Workflow Iteration

Synthesized from Helix workers + Cloudflare Workflows examples.

## Duality Mirror
- Solan path: hyphy lead-to-sale velocity
- Lumari path: durable execution, retries, audit logs

## Endpoints
- `GET /` - status message
- `POST /checkout` - trigger sale (binds to SALES_WORKFLOW)
- `GET /status` - live telemetry
- `GET /audit` - structure report

## Deployed
Worker: sales-workflow-iteration on ForeverForward account.
Subdomain base: *.ytgjjry568.workers.dev

## Next Iteration
Bind Workflow for multi-step: cart -> payment -> invoice email.
Refine unused patterns from prior idea-synthesis repos.


## Automatic deploy

Pushes to `main` deploy through GitHub Actions (`.github/workflows/deploy.yml`) using `cloudflare/wrangler-action`. The workflow needs two repository secrets: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. No secrets are stored in this repo.

`POST /checkout` now starts the `SALES_WORKFLOW` durable path (receive + structure). Payment execution is still intentionally unbound until a provider is configured.

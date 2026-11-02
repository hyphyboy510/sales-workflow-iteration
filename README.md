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

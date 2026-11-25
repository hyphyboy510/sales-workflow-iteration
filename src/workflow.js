import { WorkflowEntrypoint } from "cloudflare:workers";

/**
 * Durable sale path already expected by src/worker.js (env.SALES_WORKFLOW).
 * Solan receives the checkout; Lumari structures the next step.
 * No payment provider is called here — that stays a later bind.
 */
export class SalesWorkflow extends WorkflowEntrypoint {
  async run(event, step) {
    const received = await step.do("receive-checkout", async () => ({
      lane: "solan",
      received: true,
      payload: event.payload || {},
      note: "Checkout received. Hyphy sale path opened.",
    }));

    const structured = await step.do(
      "structure-sale",
      { retries: { limit: 3, delay: "5 seconds", backoff: "exponential" } },
      async () => ({
        lane: "lumari",
        status: "structured",
        next: "bind-payment-provider",
        duality: "mirror-fulfillment-pending",
        audit: {
          timestamp: new Date().toISOString(),
          instanceId: event.instanceId,
        },
      })
    );

    return { received, structured };
  }
}

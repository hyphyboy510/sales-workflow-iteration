export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/checkout' && request.method === 'POST') {
      const body = await request.json();
      // Dual mode: Solan triggers hyphy sale, Lumari logs the structure
      if (env.SALES_WORKFLOW) {
        const instance = await env.SALES_WORKFLOW.create({ params: body });
        return Response.json({ success: true, instanceId: instance.id, message: 'Sale workflow triggered - sideshow locked in', duality: 'mirror-fulfillment-pending' });
      }
      return Response.json({ success: true, message: 'Checkout received, bind SALES_WORKFLOW for durable execution', telemetry: { ts: Date.now() } });
    }
    if (url.pathname === '/status') {
      return Response.json({ status: 'live', worker: 'sales-workflow-iteration', timestamp: new Date().toISOString(), account: 'ForeverForward' });
    }
    if (url.pathname === '/audit') {
      return Response.json({
        audit: 'sales-iteration-v1',
        workers_scanned: 25,
        workflows_present: true,
        sale_path: 'POST /checkout -> Workflow durable steps (poll/pay/invoice)',
        risks: ['bind Workflow before prod', 'add payment provider'],
        next: 'synthesize more methods into dual mirror'
      });
    }
    return new Response('Sales Workflow Iteration - Dual Mode Active.\nSolan: hyphy checkout momentum.\nLumari: grounded structure + telemetry.\nPOST /checkout | GET /status | GET /audit', { headers: { 'content-type': 'text/plain' } });
  }
};
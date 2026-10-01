import { WorkflowEntrypoint } from "cloudflare:workers";

export class FrankensteinWorkflow extends WorkflowEntrypoint {
  async run(event, step) {
    const payload = event.payload ?? {};

    const received = await step.do("receive-job", async () => {
      return {
        status: "received",
        payload,
        received_at: Date.now()
      };
    });

    const processed = await step.do("process-job", async () => {
      return {
        status: "completed",
        input: received.payload,
        completed_at: Date.now()
      };
    });

    return processed;
  }
}

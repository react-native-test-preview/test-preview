#!/usr/bin/env node

const Fastify = require("fastify");

const fastify = Fastify({
  logger: false,
});

let previews = {};

fastify.delete("/preview", async function handler(request, reply) {
  previews = {};
});

fastify.put("/preview", async function handler(request, reply) {
  const testName = request.body.testName;
  const preview = request.body.preview;

  if (!testName || !preview) {
    reply.code(400);
    return { error: "Missing test name or preview" };
  }

  console.info(`Received snapshot for test: ${testName}`);

  previews[testName] = preview;
});

fastify.get("/preview", async function handler(request, reply) {
  return previews;
});

console.info('Test preview server starting...');

fastify.listen({ port: 4300 }).then(() => {
  console.info('Test preview server started successfully!');
}).catch((error) => {
  console.error('Couldnt start test-preview\'s server. See next log for more details.');
  console.error(error);
  fastify.log.error(error);
  process.exit(1);
});

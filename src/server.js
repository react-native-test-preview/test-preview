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

  previews[testName] = preview;
});

fastify.get("/preview", async function handler(request, reply) {
  return previews;
});

fastify.listen({ port: 4300 }).catch((error) => {
  fastify.log.error(error);
  process.exit(1);
});

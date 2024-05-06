const esbuild = require("esbuild");
const child_process = require("child_process");

let lastSpawnedProcess = null;

const startFastifyServerPlugin = {
  name: "start-fastify-server",
  setup(build) {
    build.onStart(() => {
      if (lastSpawnedProcess) {
        lastSpawnedProcess.kill();
      }
    });
    build.onEnd(() => {
      console.info("Starting the server...");
      lastSpawnedProcess = child_process.spawn("./dist/server.js", [""]);
      lastSpawnedProcess.stdout.on("data", (data) => {
        console.log(data.toString());
      });
      lastSpawnedProcess.stderr.on("data", (data) => {
        console.error(data.toString());
      });
      console.info("Server started");
    });
  },
};

const config = {
  bundle: true,
  format: "cjs",
  outdir: "./dist",
  platform: "node",
  target: "node14",
  entryPoints: ["./src/server.js"],
  plugins: process.env.WATCH ? [startFastifyServerPlugin] : [],
};

if (process.env.WATCH) {
  const run = async () => {
    const ctx = await esbuild.context(config);
    await ctx.watch();
  };
  run().catch(() => process.exit(1));
} else {
  esbuild.build(config).catch(() => process.exit(1));
}

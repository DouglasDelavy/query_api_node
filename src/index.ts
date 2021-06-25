import { SetupServer } from "./server";

process.on("unhandledRejection", (reason, promise) => {
  console.log(
    `App exiting due at unhandled promise: ${promise} and reason ${reason}`
  );

  throw reason;
});

process.on("uncaughtException", (error) => {
  console.log(`App exiting due at an uncaught exception ${error}`);
  process.exit(1);
});

(async (): Promise<void> => {
  try {
    const server = new SetupServer();
    server.init();
    server.start();

    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
    for (const exitSignal of exitSignals) {
      process.on(exitSignal, async () => {
        try {
          //await server.close();
          console.log(`App exited with success`);
          process.exit(0);
        } catch (error) {
          console.log(`App exited with error: ${error}`);
          process.exit(1);
        }
      });
    }
  } catch (error) {
    console.log(`App exited with error: ${error}`);
    process.exit(1);
  }
})();

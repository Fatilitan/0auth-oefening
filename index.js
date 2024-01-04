import express from "express";
import booksRouter from "./routes/books.js";
import recordsRouter from "./routes/records.js";
import log from "./middelware/logMiddleware.js";
import loginRouter from "./routes/login.js";
import errorHandler from "./middelware/errorHandler.js";
import "dotenv/config";
import * as Sentry from "@sentry/node";

const app = express();

Sentry.init({
  dsn: "https://9d0d629489958fe069da15d298fbab81@o4506472839446528.ingest.sentry.io/4506472847572992",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use(log);

app.use("/books", booksRouter);
app.use("/records", recordsRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

/*
  Start een nieuwe thread op slack voor waarom ik geen notificaties krijg op sentry
**/

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

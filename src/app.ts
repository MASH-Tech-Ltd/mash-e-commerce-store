import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import routes from "./routes/index";
import { globalErrorHandler } from "./helpers/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import config from "./config/index";
import { globalLimiter } from "./utils/rateLimiter";
import { ipBlocker, botDetector } from "./utils/securityMiddleware";

const app: Application = express();

const allowedOrigins = [
  config.frontendUrl, ...config.allowed_origins.split(",")];
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express 5 compat for mongoSanitize: req.query is a read-only getter
app.use((req, res, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  if (req.params) req.params = mongoSanitize.sanitize(req.params);
  if (req.query) {
    const sanitizedQuery = mongoSanitize.sanitize(req.query);
    Object.defineProperty(req, 'query', {
      value: sanitizedQuery,
      configurable: true,
      enumerable: true
    });
  }
  next();
});

app.use(morgan(config.env === "development" ? "dev" : "short"));

// Apply security middlewares to block known bots and banned IPs globally
app.use(ipBlocker);
app.use(botDetector);

// Apply global rate limiter to all api routes
app.use("/api/v1", globalLimiter, routes);

// Health check endpoint
app.get("/health/rit", (req: Request, res: Response) => {
  res.status(200).json({ message: "pong", time: new Date() });
});

// Not Found Middleware
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;

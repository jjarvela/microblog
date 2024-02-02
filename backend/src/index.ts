import Express from 'express';
import api from "./controllers/loadApi"
import type { Request } from 'openapi-backend';
import cors from "cors";
import "dotenv/config";

const app = Express();
app.use(Express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
api.init();

app.use((req, res) => api.handleRequest(req as Request, req, res));

app.listen(9000, () => console.info("api listening at http://localhost:9000"));

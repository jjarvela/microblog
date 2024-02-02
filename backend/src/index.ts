import Express from "express";
import api from "./controllers/loadApi";
import type { Request } from "openapi-backend";
import cors from "cors";

const app = Express();
app.use(Express.json());
app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
api.init();

app.use((req, res) => api.handleRequest(req as Request, req, res));

app.listen(9000, () => console.info("api listening at http://localhost:9000"));

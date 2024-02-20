import Express, { NextFunction, Request, Response, response } from "express";
import { api, dbConfig } from "./controllers/loadApi";
import { Pool } from "pg";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import type { Request as oaReq } from "openapi-backend";
import cors from "cors";
import { io } from "./socket/socketIndex";
import fileUpload from "express-fileupload";
import "dotenv/config";

const db_client = new Pool(dbConfig);

const app = Express();

app.use(Express.json());

app.use("/files", Express.static("./user_media/",))

app.use(
  session({
    store: new (connectPgSimple(session))({
      pool: db_client,
      tableName: "mbsession",
      createTableIfMissing: true,
      ttl: 900
    }),
    secret: "fnrj4736eFMEJFUHEE472yr234723FNpjormdNwjg",
    resave: false,
    name: "mbCookieAuth",
    saveUninitialized: true,
    cookie: { secure: false, sameSite: "lax" }
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

// Media upload handler for files
app.post('/media/:userId/:postId', fileUpload({ debug: true }))
app.use((req: Request, res: Response, next: NextFunction) => api.handleRequest(req as oaReq, req, res, next));

api.init();

io.listen(8800);

app.listen(9000, () => console.info("api listening at http://localhost:9000"));

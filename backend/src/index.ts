import Express from 'express';
import { api, dbConfig } from "./controllers/loadApi"
import { Pool } from 'pg'
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple';
import type { Request } from 'openapi-backend'
import cors from "cors";

const db_client = new Pool(dbConfig)

const app = Express();
app.use(Express.json());

app.use(session({
  store: new (connectPgSimple(session))({
    pool: db_client,
    tableName: 'mbsession',
    createTableIfMissing: true,
    ttl: 900,
  }),
  secret: 'fnrj4736eFMEJFUHEE472yr234723FNpjormdNwjg',
  resave: false,
  name: 'mbCookieAuth',
  saveUninitialized: true,
  cookie: { secure: false, sameSite: 'lax' }
}))

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);


app.use((req, res, next) => api.handleRequest(req as Request, req, res, next));

api.init();

app.listen(9000, () => console.info("api listening at http://localhost:9000"));

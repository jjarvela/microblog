import OpenAPIBackend from 'openapi-backend';
import { Request, Response } from "express";
import { Context } from 'openapi-backend';
import { PoolConfig } from 'pg'
import * as handlers from "./blogHandlers";
import * as followHandlers from "./FollowHandlers";
import * as authHandler from "./authHandler";
import Ajv from "ajv"
import addFormats from "ajv-formats"

// Check working directory and form path to api-definition.

const base_dir = process.cwd()
const api_def = `${base_dir}/../api-definition/api-definition.yaml`
// Init custom configuration for ajv validator.
const ajv = new Ajv()
ajv.addVocabulary(["example", "content"]);
addFormats(ajv);

// Load Api definition and init OpenAPI with customized ajv configuration.
export const api = new OpenAPIBackend({
  definition: api_def,
  customizeAjv: () => ajv,
});

// Export DB configuration object
export const dbConfig: PoolConfig = {
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
}
// Default handlers for errors.

function validationFailHandler(c: Context, req: Request, res: Response) {
  return res.status(400).json({ status: 400, err: c.validation.errors });
}

function notFound(c: Context, req: Request, res: Response) {
  return res.status(404).json({ status: 404, err: "Not found" });
}

function notImplementedHandler(c: Context, req: Request, res: Response) {
  return res
    .status(404)
    .json({ status: 501, err: "No handler registered for operation" });
}

api.register("notImplemented", notImplementedHandler);
api.register("notFound", notFound);
api.register("validationFail", validationFailHandler);

// Blog post handlers
api.register("addBlogPost", handlers.addBlogPost);
api.register("getBlogPost", handlers.getBlogPost);
api.register("updateBlogPost", handlers.updateBlogPost);
api.register("deleteBlogPost", handlers.deleteBlogPost);

// Followings handlers
api.register("addFollowing", followHandlers.addFollowing);
api.register("getFollowings", followHandlers.getFollowings);
api.register("getGroupFollowings", followHandlers.getGroupFollowings);
api.register("getFollowers", followHandlers.getFollowers);
api.register("deleteFollowing", followHandlers.deleteFollowing);

// Authentication handlers
api.register("loginUser", authHandler.loginUser)
api.register("logoutUser", authHandler.logoutUser)

// Security handler
api.registerSecurityHandler("mbCookieAuth", authHandler.securityHandler);

export default api
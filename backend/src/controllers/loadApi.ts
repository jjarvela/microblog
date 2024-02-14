import OpenAPIBackend from "openapi-backend";
import { Request, Response } from "express";
import { Context } from "openapi-backend";
import { PoolConfig } from "pg";
import * as userHandlers from "./userHandler";
import * as blogHandlers from "./blogHandlers";
import * as followHandlers from "./FollowHandlers";
import * as profileElementHandlers from "./profileElementHandlers";
import * as conversationHandlers from "./conversationHandlers";
import * as userRegHandler from "./registrationHandler";
import * as authHandler from "./authHandler";
import Ajv from "ajv";
import addFormats from "ajv-formats";

// Check working directory and form path to api-definition.

const base_dir = process.cwd();
const api_def = `${base_dir}/../api-definition/api-definition.yaml`;
// Init custom configuration for ajv validator.
const ajv = new Ajv();
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
};

api.registerSecurityHandler("mbCookieAuth", authHandler.securityHandler);

// Default blogHandlers for errors.

export function unAuthHandler(c: Context, _req: Request, res: Response) {
  return res
    .status(401)
    .json({ status: 401, err: [{ message: "Authentication failed." }] });
}

function validationFailHandler(c: Context, req: Request, res: Response) {
  console.log(c.request.requestBody);
  return res.status(400).json({ status: 400, err: c.validation.errors });
}

function notFound(c: Context, req: Request, res: Response) {
  return res.status(404).json({ status: 404, err: "Not found" });
}

function notImplementedHandler(c: Context, req: Request, res: Response) {
  return res
    .status(501)
    .json({ status: 501, err: "No handler registered for operation" });
}

api.register("unauthorizedHandler", unAuthHandler);
api.register("notImplemented", notImplementedHandler);
api.register("notFound", notFound);
api.register("validationFail", validationFailHandler);

// User handlers
api.register("getUser", userHandlers.getUser);
api.register("editUser", userHandlers.editUser);
api.register("deleteUser", userHandlers.deleteUser);

//user information handler
api.register("getUserInfo", userHandlers.getUserThumbInfo);

// Blog post handlers
api.register("addBlogPost", blogHandlers.addBlogPost);
api.register("getBlogPost", blogHandlers.getBlogPost);
api.register("updateBlogPost", blogHandlers.updateBlogPost);
api.register("deleteBlogPost", blogHandlers.deleteBlogPost);

// Followings handlers
api.register("addFollowing", followHandlers.addFollowing);
api.register("getFollowings", followHandlers.getFollowings);
api.register("getGroupFollowings", followHandlers.getGroupFollowings);
api.register("getFollowers", followHandlers.getFollowers);
api.register("deleteFollowing", followHandlers.deleteFollowing);

// Authentication handlers
api.register("loginUser", authHandler.loginUser);
api.register("logoutUser", authHandler.logoutUser);

// User registration
api.register("registerUser", userRegHandler.registerUser);

// Profile element handlers
api.register("getProfileElements", profileElementHandlers.getProfileElements);
api.register("editProfileElements", profileElementHandlers.editProfileElements);

//Conversation handlers

api.register("getConversations", conversationHandlers.getUserConversations);
api.register("getConversationDetails", conversationHandlers.getConversation);
api.register(
  "getConversationMessages",
  conversationHandlers.getConversationMessages
);
api.register("createConversation", conversationHandlers.createConversation);
api.register("deleteConversation", conversationHandlers.deleteConversation);
api.register("sendDirectMessage", conversationHandlers.postMessage);
api.register("editDirectMessage", conversationHandlers.editMessage);
api.register("deleteDirectMessage", conversationHandlers.deleteMessage);

export default api;

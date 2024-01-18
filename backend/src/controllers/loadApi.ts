import OpenAPIBackend from 'openapi-backend';
import { Request, Response} from "express";
import { Context } from 'openapi-backend';
import * as handlers from "./blogHandlers";
import Ajv from "ajv"
import addFormats from "ajv-formats"

console.log(__dirname);
console.log(process.cwd);
// Init custom configuration for ajv validator.
const ajv = new Ajv()
ajv.addVocabulary(["example","content"]);
addFormats(ajv);

// Load Api definition and init OpenAPI with customized ajv configuration.
export const api = new OpenAPIBackend({
  definition: "../../api-definition/api-definition.yaml",
  customizeAjv: () => ajv,
});


// Default handlers for errors.

function validationFailHandler(c:Context, req:Request, res:Response) {
  return res.status(400).json({ status: 400, err: c.validation.errors });
}

function notFound(c:Context, req:Request, res:Response) {
  return res.status(404).json({ status: 404, err: "Not found" });
}

function notImplementedHandler(c:Context, req:Request, res:Response) {
  return res
    .status(404)
    .json({ status: 501, err: "No handler registered for operation" });
}

api.register("notImplemented", notImplementedHandler);
api.register("notFound", notFound);
api.register("validationFail", validationFailHandler);

// Blog post handlers
api.register("addBlogPost",handlers.addBlogPost);
api.register("getBlogPost",handlers.getBlogPost);
api.register("updateBlogPost", handlers.updateBlogPost);
api.register("deleteBlogPost", handlers.deleteBlogPost);


export default api
import OpenAPIBackend from 'openapi-backend';
import { Request, Response} from "express";
import { Context } from 'openapi-backend';
import * as handlers from "./routeHandlers";
import Ajv from "ajv"
import addFormats from "ajv-formats"

// Init custom configuration for ajv validator.
const ajv = new Ajv()
ajv.addVocabulary(["example"]);
addFormats(ajv)

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

// Blog entry handlers
api.register("addBlogEntry",handlers.addBlogEntry);
api.register("getBlogEntry",handlers.getBlogEntry);


export default api
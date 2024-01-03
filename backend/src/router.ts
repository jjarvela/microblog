import OpenAPIBackend from "openapi-backend";
import express from 'express';

const api = new OpenAPIBackend({ definition: "../../api-definition/api-definition.yaml" });

api.register({
  
});
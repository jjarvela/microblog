import { UUID } from "crypto";
import type { Components, Paths } from "../microblog-backend";
import type { Express } from "express"
import type { FileArray } from "express-fileupload";

// Blog entries
export type BlogPost = Components.Schemas.BlogPost;
export type RefPost = Components.Schemas.RefPost;
export type BlogAddReqParams = Paths.AddBlogPost.PathParameters;
export type BlogUpdateParams = Paths.UpdateBlogPost.PathParameters;
export type ErrorObject = Components.Schemas.ErrorResponse;
// Session management types

declare module 'express-session' {
  export interface SessionData {

    user: {
      authenticated: boolean,
      uid?: UUID,
      [key: string]: any
    };
  }
}

// User authentication
export type authObj = Components.Schemas.UserAuth;
export type MediaParameters = Paths.AddUserMedia.PathParameters
export type UserRegData = Components.Schemas.NewUserObject;

export type fileObject = {
  imagefile?: FileArray[];
}
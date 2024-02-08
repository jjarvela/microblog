import type { Components, Paths } from "../microblog-backend";

// Blog entries
export type BlogPost = Components.Schemas.BlogPost;
export type RefPost = Components.Schemas.RefPost;
export type BlogAddReqParams = Paths.AddBlogPost.PathParameters;
export type BlogUpdateParams = Paths.UpdateBlogPost.PathParameters;

// Session management types

declare module 'express-session' {
  export interface SessionData {

    user: {
      authenticated: boolean,
      [key: string]: any
    };
  }
}
// User authentication
export type authObj = Components.Schemas.UserAuth;

// export type UserRegBody = Paths.UserRegister.Post.RequestBody;

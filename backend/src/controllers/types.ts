import type { Components, Paths } from "../microblog-backend";

// Blog entries
export type BlogPost = Components.Schemas.BlogPost;
export type RefPost = Components.Schemas.RefPost;
export type BlogAddReqParams = Paths.AddBlogPost.PathParameters;
export type BlogUpdateParams = Paths.UpdateBlogPost.PathParameters;

// User authentication
export type authObj = Components.Schemas.UserAuth;

// export type UserRegBody = Paths.UserRegister.Post.RequestBody;

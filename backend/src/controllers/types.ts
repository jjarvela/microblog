import type { Components,Paths } from "../microblog-backend";

export type BlogEntry = Components.Schemas.BlogEntry;
export type RefEntry = Components.Schemas.RefEntry;

export type BlogAddReqBody = Paths.AddBlogEntry.RequestBody;
export type BlogAddReqParams = Paths.AddBlogEntry.PathParameters;
export type BlogAddResponse = Paths.AddBlogEntry.PathParameters;


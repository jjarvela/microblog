import { Path } from "@prisma/client/runtime/library";
import type { Components,Paths } from "../microblog-backend";

// Blog entries
export type BlogEntry = Components.Schemas.BlogEntry;
export type RefEntry = Components.Schemas.RefEntry;
export type BlogAddReqParams = Paths.AddBlogEntry.PathParameters;
<<<<<<< Updated upstream
=======
export type BlogAddResponse = Components.Responses.;
>>>>>>> Stashed changes

// User handling
export type UserRegBody = Paths.UserRegister.Post.RequestBody;

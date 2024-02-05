import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig
} from "openapi-client-axios";

declare namespace Components {
  namespace Responses {
    export type ErrorResponse = Schemas.ErrorResponse;
    export type MediaRes = Schemas.MediaRes;
    export type NewUserId =
      /**
       * example:
       * d8a935c3-62dd-4315-b4a6-638579214891
       */
      Schemas.Uuid /* uuid */;
    export interface OK {}
    export type PostId = Schemas.PostId;
  }
  namespace Schemas {
    /**
     * Blog post that hasn't assigned an id.
     */
    export interface BlogPost {
      /**
       * example:
       * Future date for publishing in ISO 8601 UTC datetime eg. 2024-01-10T10:32:00Z
       */
      date?: string; // date-time
      /**
       * example:
       * Blog post main text
       */
      text: string;
      hashtags: string[];
    }
    export type Date = string; // date
    export interface ErrorResponse {
      /**
       * Status of response.
       */
      status?: 400 | 500;
      err?: {
        /**
         * Class of error
         */
        keyword?: string;
        /**
         * Description of error
         */
        message?: string;
      }[];
    }
    export type MediaRes = {
      /**
       * URL to access the media file.
       */
      fileUrl?: string;
      /**
       * Mime type string for the media file.
       */
      mimeType?: string;
      /**
       * Unique id for media file.
       */
      mediaId?: string;
      /**
       * The folder media file is related to.
       */
      folderId?: string;
    }[];
    export type MultipleFiles = {
      imagefile?: string; // base64
    }[];
    /**
     * Schema to create new user.
     */
    export interface NewUserObject {
      screenName: string;
      userName: string;
      email: string;
      location?: string;
      birthday: string; // date
    }
    export type PortfolioRes = {
      /**
       * User uuid
       */
      userId?: string;
    }[];
    export interface PostId {
      postId?: number;
    }
    export type QueryPosts = number[];
    /**
     * Blog post that can be referred with an id.
     */
    export interface RefPost {
      /**
       * Blog post id.
       */
      id: number;
      date?: string; // date
      /**
       * example:
       * Blog post main text
       */
      text: string;
      hashtags: string[];
    }
    /**
     * User authentication object.
     */
    export interface UserAuth {
      /**
       * User id
       */
      userId?: string;
      password?: string;
      /**
       * Optional serialized authorization data for client.
       */
      jwt?: string;
    }
    export interface UserObject {
      screenName?: string;
      userName: string;
      email: string;
      location?: string;
      birthday?: string; // date
    }
    export interface UserProfile {
      /**
       * User uuid
       */
      userId: string;
      /**
       * Is profile visible to all.
       */
      published?: boolean;
    }

    export interface newConversation {
      /**
       * Participant 1 uuid
       */
      participant_1: string;
      /**
       * Participant 2 uuid
       */
      participant_2: string;
    }

    export interface newConversationMessage {
      /**
       * Id of the conversation
       */
      conversation_id: int;
      /**
       * Message content
       */
      message: string;
    }

    /**
     * example:
     * d8a935c3-62dd-4315-b4a6-638579214891
     */
    export type Uuid = string; // uuid
  }
}
declare namespace Paths {
  namespace AddBlogPost {
    namespace Parameters {
      export type UserId = string; // uuid
    }
    export interface PathParameters {
      userId: Parameters.UserId /* uuid */;
    }
    export type RequestBody =
      /* Blog post that hasn't assigned an id. */ Components.Schemas.BlogPost;
    namespace Responses {
      export type $200 = Components.Responses.PostId;
      export type $400 = Components.Schemas.ErrorResponse;
    }
  }
  namespace AddUserMedia {
    namespace Parameters {
      export type FolderId = string;
      export type UserId = string;
    }
    export interface PathParameters {
      userId: Parameters.UserId;
      folderId: Parameters.FolderId;
    }
    namespace Responses {
      export type $200 = Components.Responses.OK;
    }
  }
  namespace DelUserMedia {
    namespace Parameters {
      export type MediaId = string;
      export type UserId = string;
    }
    export interface PathParameters {
      userId: Parameters.UserId;
      mediaId: Parameters.MediaId;
    }
    namespace Responses {
      export type $200 = Components.Responses.OK;
    }
  }
  namespace DeleteBlogPost {
    namespace Parameters {
      export type PostId = Components.Schemas.QueryPosts;
      export type UserId = string;
    }
    export interface PathParameters {
      userId: Parameters.UserId;
    }
    export interface QueryParameters {
      postId: Parameters.PostId;
    }
    namespace Responses {
      export type $200 = Components.Responses.PostId;
      export type $400 = Components.Responses.ErrorResponse;
    }
  }
  namespace GetBlogPost {
    namespace Parameters {
      export type EndDate = Components.Schemas.Date /* date */;
      export type PostId = string;
      export type StartDate = Components.Schemas.Date /* date */;
      export type UserId = string;
    }
    export interface PathParameters {
      userId: Parameters.UserId;
    }
    export interface QueryParameters {
      postId?: Parameters.PostId;
      startDate?: Parameters.StartDate;
      endDate?: Parameters.EndDate;
    }
    namespace Responses {
      export type $200 =
        /* Blog post that can be referred with an id. */ Components.Schemas.RefPost[];
      export type $400 = Components.Schemas.ErrorResponse;
    }
  }
  namespace GetProfile {
    namespace Parameters {
      export type UserId = string;
    }
    export interface PathParameters {
      userId: Parameters.UserId;
    }
    namespace Responses {
      export type $200 = Components.Responses.OK;
    }
  }
  namespace GetUserMedia {
    namespace Parameters {
      export type UserId = string;
    }
    export interface PathParameters {
      userId: Parameters.UserId;
    }
    namespace Responses {
      export type $200 = Components.Responses.MediaRes;
    }
  }
  namespace LoginUser {
    export type RequestBody =
      /* User authentication object. */ Components.Schemas.UserAuth;
    namespace Responses {
      export type $200 = Components.Responses.OK;
    }
  }
  namespace Portfolio$UserIdPublic {
    namespace Get {
      namespace Parameters {
        export type UserId = string;
      }
      export interface PathParameters {
        userId: Parameters.UserId;
      }
      namespace Responses {
        export type $200 = Components.Schemas.PortfolioRes;
      }
    }
  }
  namespace RegisterUser {
    export type RequestBody =
      /* Schema to create new user. */ Components.Schemas.NewUserObject;
    namespace Responses {
      export type $200 = Components.Responses.OK;
    }
  }
  namespace UpdateBlogPost {
    namespace Parameters {
      export type PostId = string;
      export type UserId = string;
    }
    export interface PathParameters {
      userId: Parameters.UserId;
      postId: Parameters.PostId;
    }
    export type RequestBody =
      /* Blog post that can be referred with an id. */ Components.Schemas.RefPost;
    namespace Responses {
      export type $200 = Components.Responses.OK;
    }
  }
  namespace User$UserIdProfile {
    namespace Patch {
      namespace Parameters {
        export type UserId = string;
      }
      export interface PathParameters {
        userId: Parameters.UserId;
      }
      export type RequestBody = Components.Schemas.UserProfile;
      namespace Responses {
        export type $200 = Components.Responses.OK;
      }
    }
  }
}

export interface OperationMethods {
  /**
   * getBlogPost - Get entries filtered by userId and optionally by date or postId
   */
  "getBlogPost"(
    parameters?: Parameters<
      Paths.GetBlogPost.PathParameters & Paths.GetBlogPost.QueryParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetBlogPost.Responses.$200>;
  /**
   * addBlogPost - Post new post to the user's blog.
   */
  "addBlogPost"(
    parameters?: Parameters<Paths.AddBlogPost.PathParameters> | null,
    data?: Paths.AddBlogPost.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.AddBlogPost.Responses.$200>;
  /**
   * deleteBlogPost - Delete one or several blog posts.
   */
  "deleteBlogPost"(
    parameters?: Parameters<
      Paths.DeleteBlogPost.PathParameters & Paths.DeleteBlogPost.QueryParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteBlogPost.Responses.$200>;
  /**
   * updateBlogPost - Update blog post.
   */
  "updateBlogPost"(
    parameters?: Parameters<Paths.UpdateBlogPost.PathParameters> | null,
    data?: Paths.UpdateBlogPost.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateBlogPost.Responses.$200>;
  /**
   * addUserMedia - Upload a media files to selected folder.
   */
  "addUserMedia"(
    parameters?: Parameters<Paths.AddUserMedia.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.AddUserMedia.Responses.$200>;
  /**
   * getUserMedia - Get list of media files and their location.
   */
  "getUserMedia"(
    parameters?: Parameters<Paths.GetUserMedia.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetUserMedia.Responses.$200>;
  /**
   * delUserMedia - Delete refered media file.
   */
  "delUserMedia"(
    parameters?: Parameters<Paths.DelUserMedia.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DelUserMedia.Responses.$200>;
  /**
   * getProfile - Get user profile atributes.
   */
  "getProfile"(
    parameters?: Parameters<Paths.GetProfile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetProfile.Responses.$200>;
  /**
   * registerUser - Send user's registration data.
   */
  "registerUser"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RegisterUser.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.RegisterUser.Responses.$200>;
  /**
   * loginUser - Login using user's credentials.
   */
  "loginUser"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.LoginUser.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.LoginUser.Responses.$200>;
}

export interface PathsDictionary {
  ["/blog/{userId}"]: {
    /**
     * getBlogPost - Get entries filtered by userId and optionally by date or postId
     */
    "get"(
      parameters?: Parameters<
        Paths.GetBlogPost.PathParameters & Paths.GetBlogPost.QueryParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetBlogPost.Responses.$200>;
    /**
     * addBlogPost - Post new post to the user's blog.
     */
    "post"(
      parameters?: Parameters<Paths.AddBlogPost.PathParameters> | null,
      data?: Paths.AddBlogPost.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.AddBlogPost.Responses.$200>;
    /**
     * deleteBlogPost - Delete one or several blog posts.
     */
    "delete"(
      parameters?: Parameters<
        Paths.DeleteBlogPost.PathParameters &
          Paths.DeleteBlogPost.QueryParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteBlogPost.Responses.$200>;
  };
  ["/blog/{userId}/{postId}"]: {
    /**
     * updateBlogPost - Update blog post.
     */
    "put"(
      parameters?: Parameters<Paths.UpdateBlogPost.PathParameters> | null,
      data?: Paths.UpdateBlogPost.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateBlogPost.Responses.$200>;
  };
  ["/media/{userId}/{folderId}"]: {
    /**
     * addUserMedia - Upload a media files to selected folder.
     */
    "post"(
      parameters?: Parameters<Paths.AddUserMedia.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.AddUserMedia.Responses.$200>;
  };
  ["/media/{userId}"]: {
    /**
     * getUserMedia - Get list of media files and their location.
     */
    "get"(
      parameters?: Parameters<Paths.GetUserMedia.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetUserMedia.Responses.$200>;
  };
  ["/media/{userId}/{mediaId}"]: {
    /**
     * delUserMedia - Delete refered media file.
     */
    "delete"(
      parameters?: Parameters<Paths.DelUserMedia.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DelUserMedia.Responses.$200>;
  };
  ["/portfolio/{userId}/public"]: {};
  ["/user/{userId}/profile"]: {
    /**
     * getProfile - Get user profile atributes.
     */
    "get"(
      parameters?: Parameters<Paths.GetProfile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetProfile.Responses.$200>;
  };
  ["/user/register"]: {
    /**
     * registerUser - Send user's registration data.
     */
    "post"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RegisterUser.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.RegisterUser.Responses.$200>;
  };
  ["/login"]: {
    /**
     * loginUser - Login using user's credentials.
     */
    "post"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.LoginUser.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.LoginUser.Responses.$200>;
  };
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>;

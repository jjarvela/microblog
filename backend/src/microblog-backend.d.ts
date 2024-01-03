import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Responses {
        export interface OK {
        }
    }
    namespace Schemas {
        /**
         * Blog entry that hasn't assigned an id.
         */
        export interface BlogEntry {
            date?: string; // date
            /**
             * example:
             * Blog entry title
             */
            title?: string;
            /**
             * example:
             * Blog entry main text
             */
            text?: string;
            hashtags?: string[];
        }
        export type Date = string; // date
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
        export type QueryEntries = number[];
        /**
         * Blog entry that can be referred with an id.
         */
        export interface RefEntry {
            /**
             * Blog entry id.
             */
            id?: number;
            date?: string; // date
            /**
             * example:
             * Blog entry header
             */
            header?: string;
            /**
             * example:
             * Blog entry main text
             */
            text?: string;
            hashtags?: string[];
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
    }
}
declare namespace Paths {
    namespace AddBlogEntry {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export type RequestBody = /* Blog entry that hasn't assigned an id. */ Components.Schemas.BlogEntry;
        namespace Responses {
            export interface $200 {
            }
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
    namespace DeleteBlogEntry {
        namespace Parameters {
            export type PostId = Components.Schemas.QueryEntries;
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export interface QueryParameters {
            postId: Parameters.PostId;
        }
        namespace Responses {
            export type $200 = Components.Responses.OK;
        }
    }
    namespace GetBlogEntry {
        namespace Parameters {
            export type EndDate = Components.Schemas.Date /* date */;
            export type StartDate = Components.Schemas.Date /* date */;
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export interface QueryParameters {
            startDate?: Parameters.StartDate;
            endDate?: Parameters.EndDate;
        }
        namespace Responses {
            export type $200 = /* Blog entry that can be referred with an id. */ Components.Schemas.RefEntry[];
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
            export type $200 = Components.Schemas.MediaRes;
        }
    }
    namespace LoginUser {
        export type RequestBody = /* User authentication object. */ Components.Schemas.UserAuth;
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
    namespace UpdateBlogEntry {
        namespace Parameters {
            export type PostId = string;
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
            postId: Parameters.PostId;
        }
        export type RequestBody = /* Blog entry that can be referred with an id. */ Components.Schemas.RefEntry;
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
    namespace UserRegister {
        namespace Post {
            export type RequestBody = /* Schema to create new user. */ Components.Schemas.NewUserObject;
            namespace Responses {
                export type $200 = Components.Responses.OK;
            }
        }
    }
}

export interface OperationMethods {
  /**
   * getBlogEntry - Get entries filtered by userId and optionally by date
   */
  'getBlogEntry'(
    parameters?: Parameters<Paths.GetBlogEntry.PathParameters & Paths.GetBlogEntry.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBlogEntry.Responses.$200>
  /**
   * addBlogEntry - Post new entry to the user's blog.
   */
  'addBlogEntry'(
    parameters?: Parameters<Paths.AddBlogEntry.PathParameters> | null,
    data?: Paths.AddBlogEntry.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddBlogEntry.Responses.$200>
  /**
   * deleteBlogEntry - Delete one or several blog entries.
   */
  'deleteBlogEntry'(
    parameters?: Parameters<Paths.DeleteBlogEntry.PathParameters & Paths.DeleteBlogEntry.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteBlogEntry.Responses.$200>
  /**
   * updateBlogEntry - Update blog entry.
   */
  'updateBlogEntry'(
    parameters?: Parameters<Paths.UpdateBlogEntry.PathParameters> | null,
    data?: Paths.UpdateBlogEntry.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateBlogEntry.Responses.$200>
  /**
   * addUserMedia - Upload a media files to selected folder.
   */
  'addUserMedia'(
    parameters?: Parameters<Paths.AddUserMedia.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddUserMedia.Responses.$200>
  /**
   * getUserMedia - Get list of media files and their location.
   */
  'getUserMedia'(
    parameters?: Parameters<Paths.GetUserMedia.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserMedia.Responses.$200>
  /**
   * delUserMedia - Delete refered media file.
   */
  'delUserMedia'(
    parameters?: Parameters<Paths.DelUserMedia.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DelUserMedia.Responses.$200>
  /**
   * getProfile - Get user profile atributes.
   */
  'getProfile'(
    parameters?: Parameters<Paths.GetProfile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProfile.Responses.$200>
  /**
   * loginUser - Login using user's credentials.
   */
  'loginUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.LoginUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LoginUser.Responses.$200>
}

export interface PathsDictionary {
  ['/blog/{userId}']: {
    /**
     * getBlogEntry - Get entries filtered by userId and optionally by date
     */
    'get'(
      parameters?: Parameters<Paths.GetBlogEntry.PathParameters & Paths.GetBlogEntry.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBlogEntry.Responses.$200>
    /**
     * addBlogEntry - Post new entry to the user's blog.
     */
    'post'(
      parameters?: Parameters<Paths.AddBlogEntry.PathParameters> | null,
      data?: Paths.AddBlogEntry.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddBlogEntry.Responses.$200>
    /**
     * deleteBlogEntry - Delete one or several blog entries.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteBlogEntry.PathParameters & Paths.DeleteBlogEntry.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteBlogEntry.Responses.$200>
  }
  ['/blog/{userId}/{postId}']: {
    /**
     * updateBlogEntry - Update blog entry.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateBlogEntry.PathParameters> | null,
      data?: Paths.UpdateBlogEntry.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateBlogEntry.Responses.$200>
  }
  ['/media/{userId}/{folderId}']: {
    /**
     * addUserMedia - Upload a media files to selected folder.
     */
    'post'(
      parameters?: Parameters<Paths.AddUserMedia.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddUserMedia.Responses.$200>
  }
  ['/media/{userId}']: {
    /**
     * getUserMedia - Get list of media files and their location.
     */
    'get'(
      parameters?: Parameters<Paths.GetUserMedia.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserMedia.Responses.$200>
  }
  ['/media/{userId}/{mediaId}']: {
    /**
     * delUserMedia - Delete refered media file.
     */
    'delete'(
      parameters?: Parameters<Paths.DelUserMedia.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DelUserMedia.Responses.$200>
  }
  ['/portfolio/{userId}/public']: {
  }
  ['/user/{userId}/profile']: {
    /**
     * getProfile - Get user profile atributes.
     */
    'get'(
      parameters?: Parameters<Paths.GetProfile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProfile.Responses.$200>
  }
  ['/user/register']: {
  }
  ['/login']: {
    /**
     * loginUser - Login using user's credentials.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.LoginUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LoginUser.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

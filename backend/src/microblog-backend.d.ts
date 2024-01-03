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
        export interface Entry {
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
        }
        /**
         * Blog entry that can be referred with an id.
         */
        export interface KnownEntry {
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
             * Uniqe id for media file.
             */
            mediaId?: string;
            /**
             * The context media file is related to.
             */
            contextId?: string;
        }[];
        export type MultipleFiles = {
            imagefile?: string; // base64
        }[];
        export type QueryEntries = number[];
        export interface UserProfile {
            /**
             * User uuid
             */
            userId: string;
            /**
             * Profile attribute object.
             */
            atrObj: {
                [key: string]: any;
            };
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
        export type RequestBody = /* Blog entry that hasn't assigned an id. */ Components.Schemas.Entry;
        namespace Responses {
            export interface $200 {
            }
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
            export type SearchString = string;
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export interface QueryParameters {
            searchString?: Parameters.SearchString;
        }
        namespace Responses {
            export type $200 = /* Blog entry that can be referred with an id. */ Components.Schemas.KnownEntry[];
        }
    }
    namespace Media$UserId {
        namespace Get {
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
    }
    namespace Media$UserId$ContextId {
        namespace Post {
            namespace Parameters {
                export type ContextId = string;
                export type UserId = string;
            }
            export interface PathParameters {
                userId: Parameters.UserId;
                contextId: Parameters.ContextId;
            }
            namespace Responses {
                export type $200 = Components.Responses.OK;
            }
        }
    }
    namespace Media$UserId$MediaId {
        namespace Delete {
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
        export type RequestBody = /* Blog entry that can be referred with an id. */ Components.Schemas.KnownEntry;
        namespace Responses {
            export type $200 = Components.Responses.OK;
        }
    }
    namespace User$UserIdProfile {
        namespace Get {
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
  ['/media/{userId}/{contextId}']: {
  }
  ['/media/{userId}']: {
  }
  ['/media/{userId}/{mediaId}']: {
  }
  ['/user/{userId}/profile']: {
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

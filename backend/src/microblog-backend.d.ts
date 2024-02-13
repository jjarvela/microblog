import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Responses {
        export type ErrorResponse = Schemas.ErrorResponse;
        export type Id = /* numerical id. */ Schemas.Id;
        export type MediaRes = Schemas.MediaRes;
        export type NewUserId = /**
         * example:
         * d8a935c3-62dd-4315-b4a6-638579214891
         */
        Schemas.Uuid /* uuid */;
        export interface OK {
        }
        export type PostId = /* List of item ids. */ Schemas.IdList;
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
        export interface ConversationMessages {
            /**
             * conversations id
             */
            conversation_id: number;
            /**
             * User uuid
             */
            sender_userid: string;
            message: string;
            /**
             * date
             */
            timestamp?: string;
            notification?: boolean;
            conversations?: number[];
        }
        export interface Conversations {
            /**
             * User uuid
             */
            participant_1: string;
            /**
             * User uuid
             */
            participant_2: string;
            /**
             * date
             */
            timestamp?: string;
            conversation_messages?: number[];
        }
        export type Date = string; // date
        export interface ErrorResponse {
            /**
             * Status of response.
             */
            status?: 400 | 409 | 401 | 500;
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
        /**
         * numerical id.
         */
        export interface Id {
            id: number;
        }
        /**
         * List of item ids.
         */
        export interface IdList {
            itemIds: number[];
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
        export interface NewConversation {
            /**
             * User uuid
             */
            participant_1: string;
            /**
             * User uuid
             */
            participant_2: string;
        }
        export interface NewConversationMessage {
            /**
             * conversations id
             */
            conversation_id: number;
            /**
             * User uuid
             */
            sender_userid: string;
            message: string;
        }
        /**
         * For creating new following
         */
        export interface NewFollow {
            follows_user: string; // uuid
            follows_group: number;
        }
        /**
         * Schema to create new user.
         */
        export interface NewUserObject {
            screenName: string;
            userName: string;
            email: string; // email
            password: string; // password
            location?: string;
            birthday: string; // date
        }
        export type ProfileElements = {
            /**
             * Profile element type.
             */
            type?: string;
            /**
             * Profile element data object.
             */
            data?: {
                [name: string]: any;
            };
        }[];
        /**
         * Blog post that can be referred with an id.
         */
        export interface RefPost {
            /**
             * Blog post id.
             */
            id: number;
            date?: string; // date-time
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
        /**
         * User following other user or group.
         */
        export interface UserFollow {
            id: number;
            user_id: string; // uuid
            follows_user: string; // uuid
            follows_group: number;
        }
        export interface UserInfo {
            id: string; // uuid
            username: string;
            screenName?: string;
            profileImage?: number;
            description?: string;
            following: {
                id: number;
                user_id: string; // uuid
                follows_user: string; // uuid
                follows_group: number;
            }[];
            followers: {
                id: number;
                user_id: string; // uuid
                follows_user: string; // uuid
                follows_group: number;
            }[];
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
        export type RequestBody = /* Blog post that hasn't assigned an id. */ Components.Schemas.BlogPost;
        namespace Responses {
            export type $200 = Components.Responses.PostId;
            export type $400 = Components.Schemas.ErrorResponse;
        }
    }
    namespace AddFollowing {
        namespace Parameters {
            export type FollowsGroup = string;
            export type FollowsUser = string; // uuid
            export type UserId = string; // uuid
        }
        export interface PathParameters {
            userId: Parameters.UserId /* uuid */;
        }
        export interface QueryParameters {
            followsUser?: Parameters.FollowsUser /* uuid */;
            followsGroup?: Parameters.FollowsGroup;
        }
        namespace Responses {
            export type $200 = /* User following other user or group. */ Components.Schemas.UserFollow;
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
    namespace CreateConversation {
        export type RequestBody = Components.Schemas.NewConversation;
        namespace Responses {
            export type $200 = Components.Schemas.Conversations[];
            export type $400 = Components.Schemas.ErrorResponse;
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
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export type RequestBody = /* List of item ids. */ Components.Schemas.IdList;
        namespace Responses {
            export type $200 = Components.Responses.PostId;
            export type $400 = Components.Responses.ErrorResponse;
        }
    }
    namespace DeleteConversation {
        namespace Parameters {
            export type ConversationId = string;
        }
        export interface PathParameters {
            conversationId: Parameters.ConversationId;
        }
        namespace Responses {
            export type $200 = Components.Responses.Id;
            export type $400 = Components.Responses.ErrorResponse;
        }
    }
    namespace DeleteDirectMessage {
        namespace Parameters {
            export type ConversationId = string;
            export type MessageId = string;
        }
        export interface PathParameters {
            conversationId: Parameters.ConversationId;
            messageId: Parameters.MessageId;
        }
        namespace Responses {
            export type $200 = Components.Responses.Id;
            export type $400 = Components.Responses.ErrorResponse;
        }
    }
    namespace DeleteFollowing {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export type RequestBody = /* numerical id. */ Components.Schemas.Id;
        namespace Responses {
            export type $200 = Components.Responses.Id;
            export type $400 = Components.Responses.ErrorResponse;
        }
    }
    namespace EditDirectMessage {
        namespace Parameters {
            export type ConversationId = string;
            export type MessageId = string;
        }
        export interface PathParameters {
            conversationId: Parameters.ConversationId;
            messageId: Parameters.MessageId;
        }
        export interface RequestBody {
            message: string;
        }
        namespace Responses {
            export type $201 = Components.Schemas.ConversationMessages;
            export type $400 = Components.Schemas.ErrorResponse;
        }
    }
    namespace EditProfileElements {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export type RequestBody = Components.Schemas.ProfileElements;
        namespace Responses {
            export type $200 = Components.Responses.OK;
            export type $400 = Components.Schemas.ErrorResponse;
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
            export type $200 = /* Blog post that can be referred with an id. */ Components.Schemas.RefPost[];
            export type $400 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetConversationDetails {
        namespace Parameters {
            export type ConversationId = string;
        }
        export interface PathParameters {
            conversationId: Parameters.ConversationId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Conversations[];
            export type $400 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetConversationMessages {
        namespace Parameters {
            export type ConversationId = string;
        }
        export interface PathParameters {
            conversationId: Parameters.ConversationId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ConversationMessages[];
            export type $400 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetConversations {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Conversations[];
        }
    }
    namespace GetFollowers {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = /* User following other user or group. */ Components.Schemas.UserFollow[];
        }
    }
    namespace GetFollowings {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = /* User following other user or group. */ Components.Schemas.UserFollow[];
            export type $400 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetGroupFollowings {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = /* User following other user or group. */ Components.Schemas.UserFollow[];
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
    namespace GetProfileElements {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ProfileElements;
            export type $400 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetUserInfo {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserInfo;
            export type $400 = Components.Schemas.ErrorResponse;
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
        export type RequestBody = /* User authentication object. */ Components.Schemas.UserAuth;
        namespace Responses {
            export type $200 = Components.Responses.OK;
            export type $401 = Components.Responses.ErrorResponse;
        }
    }
    namespace LogoutUser {
        namespace Responses {
            export type $200 = Components.Responses.OK;
            export type $500 = Components.Responses.ErrorResponse;
        }
    }
    namespace RegisterUser {
        export type RequestBody = /* Schema to create new user. */ Components.Schemas.NewUserObject;
        namespace Responses {
            export type $200 = Components.Responses.OK;
        }
    }
    namespace SendDirectMessage {
        namespace Parameters {
            export type ConversationId = string;
        }
        export interface PathParameters {
            conversationId: Parameters.ConversationId;
        }
        export type RequestBody = Components.Schemas.NewConversationMessage;
        namespace Responses {
            export type $201 = Components.Schemas.ConversationMessages;
            export type $400 = Components.Schemas.ErrorResponse;
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
        export type RequestBody = /* Blog post that can be referred with an id. */ Components.Schemas.RefPost;
        namespace Responses {
            export type $200 = Components.Responses.OK;
        }
    }
}

export interface OperationMethods {
  /**
   * getBlogPost - Get entries filtered by userId and optionally by date or postId
   */
  'getBlogPost'(
    parameters?: Parameters<Paths.GetBlogPost.QueryParameters & Paths.GetBlogPost.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBlogPost.Responses.$200>
  /**
   * addBlogPost - Post new post to the user's blog.
   */
  'addBlogPost'(
    parameters?: Parameters<Paths.AddBlogPost.PathParameters> | null,
    data?: Paths.AddBlogPost.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddBlogPost.Responses.$200>
  /**
   * deleteBlogPost - Delete one or several blog posts.
   */
  'deleteBlogPost'(
    parameters?: Parameters<Paths.DeleteBlogPost.PathParameters> | null,
    data?: Paths.DeleteBlogPost.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteBlogPost.Responses.$200>
  /**
   * updateBlogPost - Update blog post.
   */
  'updateBlogPost'(
    parameters?: Parameters<Paths.UpdateBlogPost.PathParameters> | null,
    data?: Paths.UpdateBlogPost.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateBlogPost.Responses.$200>
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
   * getUserInfo - Get user's details to show to other users
   */
  'getUserInfo'(
    parameters?: Parameters<Paths.GetUserInfo.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserInfo.Responses.$200>
  /**
   * getProfile - Get user profile atributes.
   */
  'getProfile'(
    parameters?: Parameters<Paths.GetProfile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProfile.Responses.$200>
  /**
   * getProfileElements - Get profile elements.
   */
  'getProfileElements'(
    parameters?: Parameters<Paths.GetProfileElements.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProfileElements.Responses.$200>
  /**
   * editProfileElements - Update profile elements.
   */
  'editProfileElements'(
    parameters?: Parameters<Paths.EditProfileElements.PathParameters> | null,
    data?: Paths.EditProfileElements.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EditProfileElements.Responses.$200>
  /**
   * getFollowings - Get list of users the person is following.
   */
  'getFollowings'(
    parameters?: Parameters<Paths.GetFollowings.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFollowings.Responses.$200>
  /**
   * addFollowing - Add the user's id and a user or a group they are following
   */
  'addFollowing'(
    parameters?: Parameters<Paths.AddFollowing.QueryParameters & Paths.AddFollowing.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddFollowing.Responses.$200>
  /**
   * deleteFollowing - Delete one user's following item
   */
  'deleteFollowing'(
    parameters?: Parameters<Paths.DeleteFollowing.PathParameters> | null,
    data?: Paths.DeleteFollowing.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteFollowing.Responses.$200>
  /**
   * getGroupFollowings - Get list of groups the person is following.
   */
  'getGroupFollowings'(
    parameters?: Parameters<Paths.GetGroupFollowings.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGroupFollowings.Responses.$200>
  /**
   * getFollowers - Get list of user's followers.
   */
  'getFollowers'(
    parameters?: Parameters<Paths.GetFollowers.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFollowers.Responses.$200>
  /**
   * getConversations - Get list of user's active conversations.
   */
  'getConversations'(
    parameters?: Parameters<Paths.GetConversations.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConversations.Responses.$200>
  /**
   * registerUser - Send user's registration data.
   */
  'registerUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RegisterUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RegisterUser.Responses.$200>
  /**
   * loginUser - Login using user's credentials.
   */
  'loginUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.LoginUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LoginUser.Responses.$200>
  /**
   * logoutUser - Logout user and destroy the session.
   */
  'logoutUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LogoutUser.Responses.$200>
  /**
   * createConversation - Start new conversation
   */
  'createConversation'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateConversation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateConversation.Responses.$200>
  /**
   * getConversationDetails - Get conversation by id.
   */
  'getConversationDetails'(
    parameters?: Parameters<Paths.GetConversationDetails.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConversationDetails.Responses.$200>
  /**
   * sendDirectMessage - Add a new message to the conversation
   */
  'sendDirectMessage'(
    parameters?: Parameters<Paths.SendDirectMessage.PathParameters> | null,
    data?: Paths.SendDirectMessage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SendDirectMessage.Responses.$201>
  /**
   * deleteConversation - Delete conversation by ID
   */
  'deleteConversation'(
    parameters?: Parameters<Paths.DeleteConversation.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteConversation.Responses.$200>
  /**
   * getConversationMessages - Get messages by conversation id.
   */
  'getConversationMessages'(
    parameters?: Parameters<Paths.GetConversationMessages.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConversationMessages.Responses.$200>
  /**
   * editDirectMessage - Edit message in a conversation
   */
  'editDirectMessage'(
    parameters?: Parameters<Paths.EditDirectMessage.PathParameters> | null,
    data?: Paths.EditDirectMessage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EditDirectMessage.Responses.$201>
  /**
   * deleteDirectMessage - Delete message by ID
   */
  'deleteDirectMessage'(
    parameters?: Parameters<Paths.DeleteDirectMessage.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteDirectMessage.Responses.$200>
}

export interface PathsDictionary {
  ['/blog/{userId}']: {
    /**
     * getBlogPost - Get entries filtered by userId and optionally by date or postId
     */
    'get'(
      parameters?: Parameters<Paths.GetBlogPost.QueryParameters & Paths.GetBlogPost.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBlogPost.Responses.$200>
    /**
     * addBlogPost - Post new post to the user's blog.
     */
    'post'(
      parameters?: Parameters<Paths.AddBlogPost.PathParameters> | null,
      data?: Paths.AddBlogPost.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddBlogPost.Responses.$200>
    /**
     * deleteBlogPost - Delete one or several blog posts.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteBlogPost.PathParameters> | null,
      data?: Paths.DeleteBlogPost.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteBlogPost.Responses.$200>
  }
  ['/blog/{userId}/{postId}']: {
    /**
     * updateBlogPost - Update blog post.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateBlogPost.PathParameters> | null,
      data?: Paths.UpdateBlogPost.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateBlogPost.Responses.$200>
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
  ['/user/{userId}/details']: {
    /**
     * getUserInfo - Get user's details to show to other users
     */
    'get'(
      parameters?: Parameters<Paths.GetUserInfo.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserInfo.Responses.$200>
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
  ['/user/{userId}/profile/elements']: {
    /**
     * getProfileElements - Get profile elements.
     */
    'get'(
      parameters?: Parameters<Paths.GetProfileElements.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProfileElements.Responses.$200>
    /**
     * editProfileElements - Update profile elements.
     */
    'post'(
      parameters?: Parameters<Paths.EditProfileElements.PathParameters> | null,
      data?: Paths.EditProfileElements.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EditProfileElements.Responses.$200>
  }
  ['/user/{userId}/following']: {
    /**
     * getFollowings - Get list of users the person is following.
     */
    'get'(
      parameters?: Parameters<Paths.GetFollowings.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFollowings.Responses.$200>
    /**
     * addFollowing - Add the user's id and a user or a group they are following
     */
    'post'(
      parameters?: Parameters<Paths.AddFollowing.QueryParameters & Paths.AddFollowing.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddFollowing.Responses.$200>
    /**
     * deleteFollowing - Delete one user's following item
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteFollowing.PathParameters> | null,
      data?: Paths.DeleteFollowing.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteFollowing.Responses.$200>
  }
  ['/user/{userId}/followingGroups']: {
    /**
     * getGroupFollowings - Get list of groups the person is following.
     */
    'get'(
      parameters?: Parameters<Paths.GetGroupFollowings.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGroupFollowings.Responses.$200>
  }
  ['/user/{userId}/followers']: {
    /**
     * getFollowers - Get list of user's followers.
     */
    'get'(
      parameters?: Parameters<Paths.GetFollowers.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFollowers.Responses.$200>
  }
  ['/user/{userId}/conversations']: {
    /**
     * getConversations - Get list of user's active conversations.
     */
    'get'(
      parameters?: Parameters<Paths.GetConversations.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConversations.Responses.$200>
  }
  ['/user/register']: {
    /**
     * registerUser - Send user's registration data.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RegisterUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RegisterUser.Responses.$200>
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
  ['/logout']: {
    /**
     * logoutUser - Logout user and destroy the session.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LogoutUser.Responses.$200>
  }
  ['/conversation']: {
    /**
     * createConversation - Start new conversation
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateConversation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateConversation.Responses.$200>
  }
  ['/conversation/{conversationId}']: {
    /**
     * getConversationDetails - Get conversation by id.
     */
    'get'(
      parameters?: Parameters<Paths.GetConversationDetails.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConversationDetails.Responses.$200>
    /**
     * sendDirectMessage - Add a new message to the conversation
     */
    'post'(
      parameters?: Parameters<Paths.SendDirectMessage.PathParameters> | null,
      data?: Paths.SendDirectMessage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SendDirectMessage.Responses.$201>
    /**
     * deleteConversation - Delete conversation by ID
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteConversation.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteConversation.Responses.$200>
  }
  ['/conversation/{conversationId}/messages']: {
    /**
     * getConversationMessages - Get messages by conversation id.
     */
    'get'(
      parameters?: Parameters<Paths.GetConversationMessages.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConversationMessages.Responses.$200>
  }
  ['/conversation/{conversationId}/{messageId}']: {
    /**
     * editDirectMessage - Edit message in a conversation
     */
    'put'(
      parameters?: Parameters<Paths.EditDirectMessage.PathParameters> | null,
      data?: Paths.EditDirectMessage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EditDirectMessage.Responses.$201>
    /**
     * deleteDirectMessage - Delete message by ID
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteDirectMessage.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteDirectMessage.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

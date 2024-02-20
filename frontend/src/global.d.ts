type User = {
  id: string;
  userName: string;
  screenName: string;
  profileImage?: number;
  email: string;
  birthday: Date;
  joined: Date;
  location: string;
  password?: string;
};

type RegisterUser = {
  userName: string;
  password: string;
  screenName: string;
  email: string;
  location: string;
  birthday: string;
};

type UserDetails = {
  id?: string;
  userName: string;
  screenName: string;
  profileImage?: number;
  followers?: {
    id: number;
    user_id: string;
    follows_user: string;
    follows_group: number;
  }[];
  following?: {
    id: number;
    user_id: string;
    follows_user: string;
    follows_group: number;
  }[];
};

type UserFollowing = {
  id: number;
  user_id: string;
  follows_user: string;
  follows_group: number;
};

type UserTouser = {
  uid: string;
  username?: string;
  screen_name?: string;
  profile_image?: number;
};

type Media = {
  id: string;
  source: string;
  type: "img" | "vid";
};

type BlogPostFromServer = {
  id: number;
  original_post_id?: number;
  original_poster_id: string;
  user_id: string;
  blog_text: string;
  timestamp: string;
  original_created: string;
  reposter_id?: string;
  commenter_id?: string;
  item_properties: { blogpost_id: number; context_id: number; value: string }[];
  user_idTousers: UserTouser;
  original_poster_idTousers: UserTouser;
  reposter_idTousers?: UserTouser;
  commenter_idTousers?: UserTouser;
};

type BlogPostToServer = {
  id?: number;
  text: string;
  date: string;
  hashtags: string[];
};

type RepostToServer = {
  user_id: string;
  original_post_id?: number;
  original_poster_id: string;
  blog_text: string;
  timestamp: string;
  reposter_id: string;
  commenter_id?: string;
  item_properties: { blogpost_id: number; context_id: number; value: string }[];
};

type CommentToServer = {
  user_id: string;
  original_post_id?: number;
  original_poster_id: string;
  blog_text: string;
  timestamp: string;
  commenter_id: string;
  item_properties: { blogpost_id: number; context_id: number; value: string }[];
};

type UserProfile = {
  userId: string;
  profile_text: string;
  header_media_id: number;
  homepage: string;
};

type Group = {
  groupName: string;
  groupAdmin: User;
  groupDescription: string;
  groupMembers: number; //change to User[] when data starts coming in
  groupCreated: Date;
  recentActivity: Date | "--";
  joinRule: "everyone" | "permission" | "closed";
};

interface NewConversation {
  participant_1: string;
  participant_2: string;
}

interface Conversation extends NewConversation {
  id: number;
  timestamp: string;
  conversation_messages: ConversationMessage[];
  users_conversations_participant_1Tousers: UserTouser;
  users_conversations_participant_2Tousers: UserTouser;
}

interface NewConversationMessage {
  conversation_id: number;
  sender_userid: string;
  recipient_userid: string;
  message: string;
  notification: boolean;
}

interface ConversationMessage extends NewConversationMessage {
  id: number;
  timestamp: string;
  conversations?: Conversation[];
}

interface ReactionToServer {
  type: "like" | "repost" | "comment" | "like of repost" | "repost of repost";
  recipient_userid: string;
  sender_userid: string;
  read: boolean;
  media_id?: number;
  blogpost_id?: number;
}

interface ReactionFromServer extends ReactionToServer {
  type: string;
  id: number;
  timestamp: string;
  recipient_useridTousers: UserTouser;
  sender_useridTousers: UserTouser;
}

type Theme = "system" | "light" | "dark";

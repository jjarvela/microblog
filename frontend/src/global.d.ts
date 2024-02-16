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

type UserTouser = {
  admin?: boolean;
  birthday: string;
  email: string;
  joined: string;
  last_login: string;
  location: string;
  password: string;
  timezone: string;
  uid: string;
  username: string;
  screen_name: string;
};

type Media = {
  id: string;
  source: string;
  type: "img" | "vid";
};

type Post = {
  id?: number;
  postOwner: UserDetails;
  reposter?: UserDetails;
  replyingTo?: UserDetails;
  text: string;
  media: Array<Media>;
  reactions: number;
  tags: string[];
  time: Date;
};

type BlogPostFromServer = {
  blog_text: string;
  id: number;
  timestamp: string;
  user_id: string;
  item_properties: { blogpost_id: number; context_id: number; value: string }[];
};

type BlogPostToServer = {
  id?: number;
  text: string;
  date: string;
  hashtags: string[];
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
  type: "like" | "repost" | "comment";
  recipient_userid: string;
  sender_userid: string;
  read: boolean;
  media_id?: number;
  blogpost_id?: number;
}

interface ReactionFromServer extends reactionToServer {
  id: number;
}

type Theme = "system" | "light" | "dark";

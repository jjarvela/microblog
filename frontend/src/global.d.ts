type User = {
  userName: string;
  screenName: string;
  password?: string;
  profileImage?: string;
  location?: string;
  email?: string;
  joinDate?: Date;
  birthday?: Date;
  followers?: number; //change to User[] when data starts coming in
  following?: number; //change to User[] when data starts coming in
  jwt?: string;
};

type Media = {
  id: string;
  source: string;
  type: "img" | "vid";
};

type Post = {
  id?: number;
  postOwner: User;
  reposter?: string | undefined; //change to User when data starts coming in
  replyingTo?: string | undefined; //change to User when data starts coming in
  text: string;
  media: Array<Media>;
  reactions: number;
  tags: string[];
  time: Date;
};

type BlogFromServer = {
  blog_text: string;
  id: number;
  timestamp: string;
  user_id: string;
  item_properties: { blogpost_id: number; context_id: number; value: string }[];
};

type BlogToServer = {
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

type Theme = "system" | "light" | "dark";

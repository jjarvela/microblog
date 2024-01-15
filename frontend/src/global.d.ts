type Media = {
  id: string;
  source: string;
  type: "img" | "vid";
};

type Post = {
  postOwner: User;
  reposter?: string | undefined; //change to User when data starts coming in
  replyingTo?: string | undefined; //change to User when data starts coming in
  text: string;
  media: Array<Media>;
  reactions: number;
  tags: string[];
  time: Date;
};

type User = {
  userName: string;
  screenName: string;
  profileImage?: string;
  location?: string;
  email?: string;
  joinDate?: Date;
  birthDate?: Date;
  followers: number; //change to User[] when data starts coming in
  following: number; //change to User[] when data starts coming in
};

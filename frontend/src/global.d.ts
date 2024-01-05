type Media = {
  id: string;
  source: string;
  type: string;
};

type Post = {
  profileName: string;
  profileImage?: string;
  postOwner: string;
  reposter?: string | undefined;
  replyingTo?: string | undefined;
  text: string;
  media?: Array<Media> | undefined;
  reactions: number;
  tags: string[];
  time: Date;
};

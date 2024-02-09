import { userid1 } from "./users";

export const elementTypes = [
  { id: 0, name: "text" },
  { id: 1, name: "links" },
  { id: 2, name: "media" },
  { id: 3, name: "post" },
];

export const userProfiles = [
  {
    user_id: userid1,
    profile_text: "Hello! My name is Jane.",
    header_media_id: 0,
    homepage: "microblog.com",
  },
];

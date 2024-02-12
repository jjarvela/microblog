import { userid1, userid2 } from "./users";

export const elementTypes = [
  { id: 0, name: "text" },
  { id: 1, name: "links" },
  { id: 2, name: "media" },
  { id: 3, name: "post" }
];

export const userProfiles = [
  {
    user_id: userid1,
    profile_text: "Hello! My name is Jane.",
    header_media_id: 0,
    homepage: "microblog.com"
  },

  {
    user_id: userid2,
    profile_text: "Johnny Boy's in town",
    header_media_id: 0,
    homepage: "microblog.com"
  }
];

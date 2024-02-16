import { userid1, userid2, userid3 } from "./users";

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
  },

  {
    user_id: userid3,
    profile_text: "I am new here, please be my friend",
    header_media_id: 0,
    homepage: "microblog.com"
  },

  {
    user_id: "3fa8d704-2c84-45e9-9451-cb0673de810f",
    profile_text: "Oooooo so fancy",
    header_media_id: 0,
    homepage: null
  },

  {
    id: "eee98cf6-6472-41eb-86c6-39445ba77f49",
    user_id: "5454dc94-2adf-450b-8f45-ece44f1284d9",
    profile_text: "ONLY I KNOW THE TRUTH THE REST OF YOU ARE SHEEP",
    header_media_id: null,
    homepage: null
  }
];

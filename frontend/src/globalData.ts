export const locationList = [
  "Finland",
  "Rest of Europe",
  "North America",
  "South America",
  "Middle East",
  "Africa",
  "Asia",
  "Oceania",
  "Antarctica",
];

export const emptyPost: Post = {
  text: "",
  tags: [],
  postOwner: {
    userName: "",
    screenName: "",
    followers: [],
    following: [],
  },
  media: [],
  reactions: 0,
  time: new Date(),
};

export const serverUrl = import.meta.env.VITE_BACKEND_URL;
export const testUserId = "22e61ac8-96cd-49cc-8a25-3f0b4b42eb6b";

export const recipientUser1: User = {
  id: "641ae1b3-d5bf-4058-b8d8-2e9e6023114d",
  userName: "@johnmalkoffitz",
  screenName: "Heeeeeere's Johnny",
  birthday: new Date(),
  joined: new Date(),
  email: "",
  location: "",
};

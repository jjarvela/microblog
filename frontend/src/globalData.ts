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
    followers: 0,
    following: 0,
  },
  media: [],
  reactions: 0,
  time: new Date(),
};

export const serverUrl = import.meta.env.VITE_BACKEND_URL;
export const testUserId = "22e61ac8-96cd-49cc-8a25-3f0b4b42eb6b";

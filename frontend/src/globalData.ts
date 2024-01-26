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

import { userid1, userid2, userid3, userid5 } from "./users";

export const postdata = [
  // User 1's Post
  {
    id: 1,
    user_id: userid1,
    original_poster_id: userid1,
    blog_text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    timestamp: new Date("2024-01-01T13:00:00Z"),
    original_created: new Date("2024-01-01T13:00:00Z"),
    item_properties: {
      createMany: {
        data: [
          {
            id: 1,
            creator_user_id: userid1,
            value: "newtag",
            context_id: 1,
            time: new Date("2024-01-01T13:00:00Z")
          }
        ]
      }
    }
  },
  {
    id: 2,
    user_id: userid1,
    original_poster_id: userid1,
    blog_text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    timestamp: new Date("2024-01-05T07:55:00Z"),
    original_created: new Date("2024-01-05T07:55:00Z"),
    item_properties: {
      createMany: {
        data: [
          {
            id: 2,
            creator_user_id: userid1,
            value: "tag",
            context_id: 1,
            time: new Date("2024-01-05T07:55:00Z")
          },
          {
            id: 3,
            creator_user_id: userid1,
            value: "newtag",
            context_id: 1,
            time: new Date("2024-01-05T07:55:00Z")
          }
        ]
      }
    }
  },

  // User 2's Post
  {
    id: 3,
    user_id: userid2,
    original_poster_id: userid2,
    blog_text: "This is my first post",
    timestamp: new Date("2023-11-20T11:03:53Z"),
    original_created: new Date("2023-11-20T11:03:53Z"),
    item_properties: {
      createMany: {
        data: [
          {
            id: 4,
            creator_user_id: userid2,
            value: "hello",
            context_id: 1,
            time: new Date("2023-11-20T11:03:53Z")
          }
        ]
      }
    }
  },
  {
    id: 4,
    user_id: userid2,
    original_poster_id: userid2,
    blog_text: "Posting the pictures of the day. ",
    timestamp: new Date("2023-12-06T12:12:00Z"),
    original_created: new Date("2023-12-06T12:12:00Z"),
    item_properties: {
      createMany: {
        data: [
          {
            id: 5,
            creator_user_id: userid2,
            value: "nice",
            context_id: 1,
            time: new Date("2023-12-06T12:12:00Z")
          },
          {
            id: 6,
            creator_user_id: userid2,
            value: "work",
            context_id: 1,
            time: new Date("2023-12-06T12:12:00Z")
          }
        ]
      }
    }
  },

  // User 3 posts
  {
    id: 5,
    user_id: userid3,
    original_poster_id: userid3,
    blog_text: "Hello this is my very cool post!",
    timestamp: new Date("2023-12-06T12:12:00Z"),
    original_created: new Date("2023-12-06T12:12:00Z"),
    item_properties: {
      createMany: {
        data: [
          {
            id: 7,
            creator_user_id: userid3,
            value: "help",
            context_id: 1,
            time: new Date("2023-12-06T12:12:00Z")
          },
          {
            id: 8,
            creator_user_id: userid3,
            value: "me",
            context_id: 1,
            time: new Date("2023-12-06T12:12:00Z")
          },
          {
            id: 9,
            creator_user_id: userid3,
            value: "thanks",
            context_id: 1,
            time: new Date("2023-12-06T12:12:00Z")
          }
        ]
      }
    }
  },

  {
    id: 6,
    user_id: userid3,
    original_poster_id: userid1,
    original_post_id: 2,
    reposter_id: userid3,
    blog_text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    timestamp: new Date("2024-02-08T16:01:00Z"),
    original_created: new Date("2024-01-05T07:55:00Z"),
    item_properties: {
      createMany: {
        data: [
          {
            id: 10,
            creator_user_id: userid1,
            value: "tag",
            context_id: 1,
            time: new Date("2024-01-05T07:55:00Z")
          },
          {
            id: 11,
            creator_user_id: userid1,
            value: "newtag",
            context_id: 1,
            time: new Date("2024-01-05T07:55:00Z")
          }
        ]
      }
    }
  },

  //User 5 posts
  {
    id: 7,
    user_id: userid5,
    original_post_id: 5,
    original_poster_id: userid3,
    reposter_id: userid5,
    blog_text: "Hello this is my very cool post!",
    timestamp: new Date("2024-01-11T08:25:00Z"),
    original_created: new Date("2023-12-06T12:12:00Z"),
    item_properties: {
      createMany: {
        data: [
          {
            id: 12,
            creator_user_id: userid3,
            value: "help",
            context_id: 1,
            time: new Date("2023-12-06T12:12:00Z")
          },
          {
            id: 13,
            creator_user_id: userid3,
            value: "me",
            context_id: 1,
            time: new Date("2023-12-06T12:12:00Z")
          },
          {
            id: 14,
            creator_user_id: userid3,
            value: "thanks",
            context_id: 1,
            time: new Date("2023-12-06T12:12:00Z")
          }
        ]
      }
    }
  },

  {
    id: 8,
    user_id: userid5,
    original_poster_id: userid5,
    blog_text:
      "I'm saying something very controversial! You should definitely not share this anywhere online, but we can't understand that because technology melted our collective brains.",
    timestamp: new Date("2023-12-06T12:12:00Z"),
    original_created: new Date("2023-12-06T12:12:00Z"),
    item_properties: {
      createMany: {
        data: [
          {
            id: 15,
            creator_user_id: userid5,
            value: "AngryAtEverything",
            context_id: 1,
            time: new Date("2023-12-06T12:12:00Z")
          },
          {
            id: 16,
            creator_user_id: userid5,
            value: "ExceptWhatIsActuallyWrong",
            context_id: 1,
            time: new Date("2023-12-06T12:12:00Z")
          }
        ]
      }
    }
  }
];

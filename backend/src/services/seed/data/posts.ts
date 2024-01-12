import { userid1, userid2 } from "./users";

export const postdata = [
    // User 1's Post  
    {
        id: 1,
        user_id: userid1,
        blog_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        timestamp: new Date("2024-01-01T13:00:00Z"),
        item_properties: {
          createMany: {
            data: [ {value: "newtag",
              context_id: 1,
              time: new Date("2024-01-01T13:00:00Z")}],
          },
        },
    },
    {
        id: 2,
        user_id: userid1,
        blog_text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        timestamp: new Date("2024-01-05T07:55:00Z"),
        item_properties: {
            createMany: {
                data: [ {value: "tag",
                context_id: 1,
                time: new Date("2024-01-05T07:55:00Z")},
                {value: "newtag",
                context_id: 1,
                time: new Date("2024-01-05T07:55:00Z")}],
            },
        },
    },
 
    // User 2's Post
    {
        id: 3,
        user_id: userid2,
        blog_text: "This is my first post",
        timestamp: new Date("2023-11-20T11:03:53Z"),
        item_properties: {
          createMany: {
            data: [ {value: "hello",
              context_id: 1,
              time: new Date("2023-11-20T11:03:53Z")}],
          },
        },
    },
    {
        id: 4,
        user_id: userid2,
        blog_text: "Posting the pictures of the day.",
        timestamp: new Date("2023-12-06T12:12:00Z"),
        item_properties: {
          createMany: {
            data: [ {value: "nice",
              context_id: 1,
              time: new Date("2023-12-06T12:12:00Z")},
              {value: "work",
              context_id: 1,
              time: new Date("2023-12-06T12:12:00Z")},
            ],
          },
        },
    }       
  ];
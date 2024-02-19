export const userid1 = "22e61ac8-96cd-49cc-8a25-3f0b4b42eb6b";
export const userid2 = "641ae1b3-d5bf-4058-b8d8-2e9e6023114d";
export const userid3 = "7e6dbd74-61bc-4e7e-97c6-e44778f835a1";
export const userid5 = "5454dc94-2adf-450b-8f45-ece44f1284d9";

export const userdata = [
  // User 1
  {
    uid: userid1,
    username: "Jane",
    screen_name: "Test User ✨",
    // Clear text: somepass
    password:
      "$argon2id$v=19$m=65536,t=3,p=4$DnnPcb9QqOiSjwthZ1+5jg$xla6n2awJ945pGKCTIwJbefX08hMxb4KUkvekO/jkCc",
    email: "jane@mail.com",
    admin: true,
    location: "Finland",
    birthday: new Date("1970-12-31"),
    joined: new Date("2024-01-01T10:00:00Z"),
    timezone: "UTC+02:00",
    last_login: new Date("2024-01-04T08:13:00Z")
  },

  // User 2
  {
    uid: userid2,
    username: "John",
    screen_name: "Dickerson",
    // Clear text: mypassword
    password:
      "$argon2id$v=19$m=65536,t=3,p=4$1GjjBY0fPUWDCS21PPbt4g$vVOx28HI25g2csK+37uaugWrBUtBtVgYC5tb5KoqCnI",
    email: "user@mail.com",
    admin: false,
    location: "Finland",
    birthday: new Date("1999-09-09"),
    joined: new Date("2023-10-08T19:00:00Z"),
    timezone: "UTC+02:00",
    last_login: new Date("2024-01-11T22:00:00Z")
  },

  // User 3
  {
    uid: "7e6dbd74-61bc-4e7e-97c6-e44778f835a1",
    username: "anotheruser",
    //clear text: anotherpass
    password:
      "$argon2id$v=19$m=65536,t=3,p=4$+sOlWk0novZ7Nfg/n+2Arw$rjcOXcVY6I3T9dKr+muDLPFqtO6eSaS9lRlNKuJdZU0",
    email: "imanother@mail.com",
    screen_name: "Another User 🙂",
    profile_image: null,
    admin: null,
    location: "Finland",
    birthday: new Date("2004-02-29"),
    joined: new Date("2023-12-16T12:56:24.334Z"),
    timezone: null,
    last_login: null,
    disabled: false,
    verified: false
  },

  // User 4

  {
    uid: "3fa8d704-2c84-45e9-9451-cb0673de810f",
    username: "fancyuser",
    //clear text: fancypass
    password:
      "$argon2id$v=19$m=65536,t=3,p=4$O/nPh42iCYeQO4KcKeAWQg$QFxsndY3pPKXFRnbWFqAOlU6nI3boXhaHMASLF8CL5M",
    email: "fancymail@mail.com",
    screen_name: "Fancy User",
    profile_image: null,
    admin: null,
    location: "Finland",
    birthday: new Date("1992-07-04"),
    joined: new Date("2024-02-16T13:30:06.927Z"),
    timezone: null,
    last_login: null,
    disabled: false,
    verified: false
  },

  // User 5

  {
    uid: "5454dc94-2adf-450b-8f45-ece44f1284d9",
    username: "madasitgets",
    //clear text: angrypass
    password:
      "$argon2id$v=19$m=65536,t=3,p=4$t6tDh/3sD3YU2IWs+Kdqaw$eMffoJ+WN2iqHiGJWNEJPUZLd7ZD9jiAOPp73MozWE0",
    email: "angery@mail.com",
    screen_name: "Outraged user 951 😤",
    profile_image: null,
    admin: null,
    location: "Finland",
    birthday: new Date("2000-03-25"),
    joined: new Date("2024-02-16T13:33:47.602Z"),
    timezone: null,
    last_login: null,
    disabled: false,
    verified: false
  }
];

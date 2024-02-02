export const userid1 = "22e61ac8-96cd-49cc-8a25-3f0b4b42eb6b";
export const userid2 = "641ae1b3-d5bf-4058-b8d8-2e9e6023114d";

export const userdata = [
    // User 1
    {
        uid: userid1,
        username: "Jane",
        password: "somepass",
        email: "jane@mail.com",
        admin: true,
        location: "Finland",
        birthday: new Date("1970-12-31"),
        joined: new Date("2024-01-01T10:00:00Z"), 
        timezone: "UTC+02:00", 
        last_login: new Date("2024-01-04T08:13:00Z"), 
    },
  
    // User 2
    {
        uid: userid2,
        username: "John",
        password: "mypassword",
        email: "user@mail.com",
        admin: false,
        location: "Finland",
        birthday: new Date("1999-09-09"),
        joined: new Date("2023-10-08T19:00:00Z"),
        timezone: "UTC+02:00", 
        last_login: new Date("2024-01-11T22:00:00Z"), 
    }
  ];
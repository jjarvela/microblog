import { PrismaClient, followings, groupmembers, users } from '@prisma/client';

const prisma = new PrismaClient();




// const postdata = {
//     user_uuid: '22e61ac8-96cd-49cc-8a25-3f0b4b42eb6b', 
//     startdate: new Date("2024-01-01T00:00:00Z"),
//     enddate: new Date("2024-01-05T00:00:00Z"), 
// };

// const post = selectPosts(postdata)
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   });

// const follow = {
//     user_id: '22e61ac8-96cd-49cc-8a25-3f0b4b42eb6b',
//     follows_user: '641ae1b3-d5bf-4058-b8d8-2e9e6023114d',
//     follows_group: undefined
// };

// insertFollowing(follow)
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   });

// const user = {
//     uid: '641ae1b3-d5bf-4058-b8d8-2e9e6023114d',
//     admin: false,
//     location: 'Sweden',
// };

// updateUser(user)
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   });

 
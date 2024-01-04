import { PrismaClient } from '@prisma/client';
//import { v4 as uuidv4 } from 'uuid';
 
// Generate a random UUID
// const random_uuid = uuidv4();
const user_uuid = '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed';
const profile_uuid = '1b9d6bcd-bbfd-3b2d-9b5d-ab8dfbbd4bed';

const prisma = new PrismaClient();

async function main() {
    // await prisma.users.create({
    //     data: {
    //       uid: user_uuid,
    //       username: 'Jane',
    //       password: 'somepass',
    //       email: 'jane@mail.com',
    //       user_profiles: {
    //         create: { id: profile_uuid,
    //                   profile_text: 'This is my profile' },
    //       },
    //     },
    //   });
    
      const allUsers = await prisma.users.findMany({
        include: {
          user_profiles: true,
        },
      });
      console.log(allUsers[0].user_profiles);
      console.log(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
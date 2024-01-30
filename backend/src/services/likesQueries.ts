import { PrismaClient, likes } from '@prisma/client';

const prisma = new PrismaClient();


export const insertLikes = async (param: { creator_user_id: string; media_id?: number; blogpost_id?: number}) => {  
    let condition: any = {}; 
    if (param.media_id) {
        condition = {
            creator_media: {
                creator_user_id: param.creator_user_id,
                media_id: param.media_id,
                },
        };
    } else if (param.blogpost_id) {
        condition = {
            creator_post: {
                creator_user_id: param.creator_user_id,
                blogpost_id: param.media_id,
                },
        };
    } else {
        return null;
    }

    const result: likes | null = await prisma.likes.upsert({    
        where: condition,
        update: {},
        create: {
            creator_user_id: param.creator_user_id,
            media_id: param.media_id,
            blogpost_id: param.blogpost_id,
        },
    });
    console.log(result);
    return result;
};

export const selectLikes = async (param: { user_id: string; }) => {  
    const result: likes[] | null = await prisma.likes.findMany({
        where: {
            creator_user_id: param.user_id,
        },
    });
    console.log(result);
    return result;
};

export const deleteLike = async (param: { creator_user_id: string; 
    media_id?: number; blogpost_id?: number }) => {  
        let condition: any = {}; 
        if (param.media_id) {
            condition = {
                creator_media: {
                    creator_user_id: param.creator_user_id,
                    media_id: param.media_id,
                    },
            };
        } else if (param.blogpost_id) {
            condition = {
                creator_post: {
                    creator_user_id: param.creator_user_id,
                    blogpost_id: param.media_id,
                    },
            };
        } else {
            return null;
        }

    const result: likes | null = await prisma.likes.delete({
        where: condition,
  });
  console.log(result);
  return result;
};



// const like = {
//         creator_user_id: '641ae1b3-d5bf-4058-b8d8-2e9e6023114d',
//         media_id: 1,
//     };

//     insertLikes(like)
//       .then(async () => {
//         await prisma.$disconnect()
//       })
//       .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//       });
    
    
    // deleteLike(like)
    //   .then(async () => {
    //     await prisma.$disconnect()
    //   })
    //   .catch(async (e) => {
    //     console.error(e)
    //     await prisma.$disconnect()
    //     process.exit(1)
    //   });
    
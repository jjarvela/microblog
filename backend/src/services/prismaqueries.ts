import { Prisma, PrismaClient, blog_posts } from '@prisma/client';
import { Result } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();


const insertPost = async (param: { user_uuid: string; text: string; timestamp: Date; hashtags: string[] }) => {  

    let createdObjects = [];  // contains each item_property

    for (let i = 0; i < param.hashtags.length; i++) {
        createdObjects.push({ 
            creator_user_id: param.user_uuid,
            value: param.hashtags[i],
            context_id: 1,
            time: param.timestamp,
        });
    }
    

    const result = await prisma.blog_posts.create({
        data: {
            user_id: param.user_uuid,
            blog_text: param.text,
            timestamp: param.timestamp,
            item_properties: {
                        create: createdObjects,
            },
        },
        include: {
            item_properties: true,
        },
    });
    console.log(result);
    return result;
};



const selectOnePost = async (param: { blog_post_id: number, user_uuid: string }) => {  
    const result: object | null = await prisma.blog_posts.findUnique({
        where: {
            id: param.blog_post_id,
            user_id: param.user_uuid  
        },
        include: {
            item_properties: {
                select: {
                    blogpost_id: true,
                    value: true,
                    context_id: true,
                },
                where: {
                    context_id: 1,
                },
            },
        },
    });
    console.log(result);
    return result;
};

const selectPostsByUser = async (param: { user_uuid: string; }) => {
    const result = await prisma.blog_posts.findMany({
        where: {
            user_id: param.user_uuid,
        },
    });
    console.log(result);
    return result;
};

const selectPostsbyDate = async (param: { user_uuid: string; startdate: Date; enddate: Date; }) => {  
    const result: object | null = await prisma.blog_posts.findMany({
        where: {
            user_id: param.user_uuid,
            AND: [
                {
                    timestamp: {
                        gte: param.startdate, //greater than or equals
                    },
                },
                {
                    timestamp: {
                        lte: param.enddate,
                    },
                },
                ],
        },
        include: {
            item_properties: {
                select: {
                    blogpost_id: true,
                    value: true,
                    context_id: true,
                },
                where: {
                    context_id: 1,
                },
            },
        },
    });
    console.log(result);
    return result;
};

const updatePost = async (param: { id: number; blogtext: string}) => {  
    const result: blog_posts | null = await prisma.blog_posts.update({
        where: {
            id: param.id,
        },
        data: {
            blog_text: param.blogtext,
        },
    });
    console.log(result);
    return result;
};

const deletePost = async (param: { id: number; }) => {  
    const result: object | null = await prisma.blog_posts.delete({
        where: {
            id: param.id,
        },
    });
    console.log(result);
    return result;
};


const insertUser = async (param: { uid: string; username: string; email: string; passwordHash: string; joined: Date}) => {  
    //register: username, email and password from user
    const result = await prisma.users.create({
        data: {
            uid: param.uid,
            username: param.username,
            email: param.email,
            password: param.passwordHash,
            joined: param.joined,
        },
    });
    console.log(result);
    return result;
};


const selectUser = async (param: { username: string; }) => {  
    const result: object | null = await prisma.users.findUnique({
        where: {
            username: param.username, 
        },
        select: {
            uid: true,
            username: true,
            password: true,
        },
    });
    console.log(result);
    return result;
};

const deleteUser = async (param: { uid: string; }) => {  
    const result: object = await prisma.users.delete({
        where: {
            uid: param.uid,
        },
    });
    console.log(result);
    return result;
};

const updateUser = async (param: { uid: string; password: string; email: string; admin: boolean; 
    location: string; birthday: Date; joined: Date; timezone: string; last_login: Date}) => {  
    const result: object = await prisma.users.update({
        where: {
            uid: param.uid,
        },
        data: {
            password: param.password || undefined, 
            email: param.email || undefined, 
            admin: param.admin || undefined,
            location: param.location || undefined, 
            birthday: param.birthday || undefined, 
            joined: param.joined || undefined, 
            timezone: param.timezone || undefined, 
            last_login: param.last_login || undefined,
          },
    });
    console.log(result);
    return result;
};

export default {insertPost, selectOnePost, selectPostsByUser, selectPostsbyDate, updatePost, deletePost, 
    insertUser, selectUser, deleteUser, updateUser};

// const postdata = {
//     user_uuid: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 
//     text: 'New post',
//     timestamp: new Date, 
//     hashtags: [],
// };

// const post = insertPost(postdata)
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   });

// const postdata = {
//     user_uuid: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 
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
//   })



// selectOnePost({blog_post_id: 4})
// .then(async () => {
// await prisma.$disconnect()
// })
// .catch(async (e) => {
// console.error(e)
// await prisma.$disconnect()
// process.exit(1)
// })


// const postdata = {
//     id: 2,
//     blogtext: 'my second post', 
// };

// updatePost(postdata)
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   });


// deletePost({id: 2})
// .then(async () => {
// await prisma.$disconnect()
// })
// .catch(async (e) => {
// console.error(e)
// await prisma.$disconnect()
// process.exit(1)
// });
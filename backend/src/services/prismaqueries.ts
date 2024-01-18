import { Prisma, PrismaClient, blog_posts } from '@prisma/client';
import { Result } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();


export const insertPost = async (param: { user_uuid: string; text: string; timestamp: Date; hashtags: string[] }) => {  

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



export const selectOnePost = async (param: { blog_post_id: number; }) => {  
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

export const selectPosts = async (param: { user_uuid: string; startdate: Date; enddate: Date; }) => {  
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
        orderBy: {
            timestamp: 'desc',
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

export const deletePost = async (param: { id: number; }) => {  
    const result: object | null = await prisma.blog_posts.delete({
        where: {
            id: param.id,
        },
    });
    console.log(result);
    return result;
};


export const insertUser = async (param: { uid: string; username: string; email: string; passwordHash: string; joined: Date}) => {  
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


export const selectUser = async (param: { username: string; }) => {  
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

export const deleteUser = async (param: { uid: string; }) => {  
    const result: object = await prisma.users.delete({
        where: {
            uid: param.uid,
        },
    });
    console.log(result);
    return result;
};

export const updateUser = async (param: { uid: string; password: string; email: string; admin: boolean; 
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

export const insertProfile = async (param: { id: string; user_id: string; profile_text: string; screen_name: string}) => {  
    const result = await prisma.user_profiles.create({
        data: {
            id: param.id,
            user_id: param.user_id,
            profile_text: param.profile_text,
            screen_name: param.screen_name,
        },
    });
    console.log(result);
    return result;
};

export const selectProfile = async (param: { user_id: string; }) => {  
    const result: object | null = await prisma.user_profiles.findUnique({
        where: {
            user_id: param.user_id, 
        },
        include: {
            social_links: {
                select: {
                    id: true,
                    link: true,
                },
            },
        },
    });
    console.log(result);
    return result;
};

export const updateProfile = async (param: { id: string; user_id: string; profile_image: number;
     profile_text: string; header_media_id: number; homepage: string; screen_name: string; }) => {  
    const result = await prisma.user_profiles.update({
        where: {
            id: param.id,
        },
        data: {
            profile_image: param.profile_image || undefined, 
            profile_text: param.profile_text || undefined, 
            header_media_id: param.header_media_id || undefined,
            homepage: param.homepage || undefined, 
            screen_name: param.screen_name || undefined,
    
        }
    });
    console.log(result);
    return result;
};

export const deleteProfile = async (param: { id: string; }) => {  
    const result: object = await prisma.user_profiles.delete({
        where: {
            id: param.id,
        },
    });
    console.log(result);
    return result;
};


export const insertConversation = async (param: { participant_1: string; participant_2: string; 
    timestamp: Date; message: string; }) => {  
    const result = await prisma.conversations.create({
        data: {
            participant_1: param.participant_1,
            participant_2: param.participant_2,
            timestamp: param.timestamp,
            conversation_messages: {
                        create: {
                            message: param.message,
                            timestamp: param.timestamp,
                            sender_userid: param.participant_1,
                        },
                    }
        },
        include: {
            conversation_messages: true,
        },
    });
    console.log(result);
    return result;
};

export const selectConversations = async (param: { user_id: string; }) => {  
    const result: object = await prisma.conversations.findMany({
        where: {
            OR: [
                {
                    participant_1: param.user_id,
                },
                {
                    participant_2: param.user_id,
                },
                ],
        },
        orderBy: {
            timestamp: 'desc',
        },
    });
    console.log(result);
    return result;
};

export const insertMessage = async (param: { conversation_id: number; message: string; timestamp: Date; sender_userid: string }) => {  
    const result = await prisma.conversation_messages.create({
        data: {
            conversation_id: param.conversation_id,
            message: param.message,
            timestamp: param.timestamp,
            sender_userid: param.sender_userid,
        },
    });
    console.log(result);
    return result;
};

export const selectMessages = async (param: { conversation_id: number; }) => {  
    const result = await prisma.conversation_messages.findMany({
        where: {
            conversation_id: param.conversation_id, 
        },
        orderBy: {
            timestamp: 'asc',
        },
    });
    console.log(result);
    return result;
};


export const deleteMessage = async (param: { id: number; }) => {  
    const result = await prisma.conversation_messages.delete({
        where: {
            id: param.id,
        },
    });
    console.log(result);
    return result;
};

export const updateMessage = async (param: { id: number; message: string; }) => {  
    const result = await prisma.conversation_messages.update({
        where: {
            id: param.id,
        },
        data: {
            message: param.message,
        },
    });
    console.log(result);
    return result;
};

export const insertGroup = async (param: { group_name: string; owner_userid: string; created_at: Date}) => {  
    const result = await prisma.groups.create({
        data: {
            name: param.group_name,
            owner_uuid: param.owner_userid,
            created_at: param.created_at,
        },
    });
    console.log(result);
    return result;
};

export const selectGroups = async () => {  
    const result = await prisma.groups.findMany({
        orderBy: {
            name: 'asc',
        },
    });
    console.log(result);
    return result;
};


export const updateGroup = async (param: { id: number; name: string; owner_uuid: string }) => {  
    const result = await prisma.groups.update({
        where: {
            id: param.id,
        },
        data: {
            name: param.name || undefined, 
            owner_uuid: param.owner_uuid || undefined, 
        },
    });
    console.log(result);
    return result;
};

export const deleteGroup = async (param: { id: number; }) => {  
    const result = await prisma.groups.delete({
        where: {
            id: param.id,
        },
    });
    console.log(result);
    return result;
};

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

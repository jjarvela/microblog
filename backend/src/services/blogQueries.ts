import {PrismaClient, blog_posts } from '@prisma/client';

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

export const updatePost = async (param: { id: number; blogtext: string}) => {  
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



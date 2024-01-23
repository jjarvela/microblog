import { PrismaClient, likes } from '@prisma/client';

const prisma = new PrismaClient();


export const insertLikes = async (param: { creator_user_id: string; media_id?: number; blogpost_id?: number}) => {  
    const result: likes | null = await prisma.likes.upsert({
        where: {
            OR: [
                {
                    creator_user_id: param.creator_user_id,
                    media_id: param.media_id,
                },
                {
                    creator_user_id: param.creator_user_id,
                    blogpost_id: param.blogpost_id,
                },
                ],
        },
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
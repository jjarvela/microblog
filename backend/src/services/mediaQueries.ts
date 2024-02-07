import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const insertMedia = async (param: { user_id: string; filename: string; path: string; uuid: string; }) => {  
    const result = await prisma.user_medias.create({
        data: {
            user_id: param.user_id,
            filename: param.filename,
            path: param.path,
            uuid: param.uuid,
        },
    });
    console.log(result);
    return result;
};

export const insertMediaWithPost = async (param: { user_id: string; filename: string; path: string; uuid: string; blogpost_id: number}) => {  
    const result = await prisma.user_medias.create({
        data: {
            user_id: param.user_id,
            filename: param.filename,
            path: param.path,
            uuid: param.uuid,
            post_medias: {
                create: {
                    blogpost_id: param.blogpost_id,
                }
            }
        },
    });
    console.log(result);
    return result;
};



export const selectMediaByPost = async (param: { blogpost_id: number; }) => {  
    const result: object | null = await prisma.post_medias.findMany({
        where: {
            blogpost_id: param.blogpost_id, 
        },
        select: {
            user_medias: true,
        },
        
    });
    console.log(result);
    return result;
};

export const selectMediaByUser = async (param: { user_id: string; }) => { 
    const result: object | null = await prisma.user_medias.findMany({
        where: {
            user_id: param.user_id, 
        },
    });
    console.log(result);
    return result;
};


export const deleteMedia = async (param: { id: number; }) => {  
    const result: object = await prisma.user_medias.delete({
        where: {
            id: param.id,
        },
    });
    console.log(result);
    return result;
};
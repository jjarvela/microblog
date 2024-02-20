import { PrismaClient, user_medias } from '@prisma/client';

const prisma = new PrismaClient();

export const insertMedia = async (param: { user_id: string; filename: string; path: string; blogpost_id: number }) => {
    console.log("user_id: " + param.user_id);
    console.log("filename: " + param.filename);
    console.log("path: " + param.path);
    console.log("blogpost_id: " + param.blogpost_id);

    const result = await prisma.user_medias.create({
        data: {
            user_id: param.user_id,
            filename: param.filename,
            path: param.path,
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
    console.log(typeof result);
    return result;
};

export const selectMediaByUser = async (param: { user_id: string; }) => {
    const result: object | null = await prisma.user_medias.findMany({
        where: {
            user_id: param.user_id,
        },
    });
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


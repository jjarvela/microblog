import { PrismaClient, followings } from '@prisma/client';

const prisma = new PrismaClient();


export const insertFollowing = async (param: { user_id: string; follows_user?: string; follows_group?: number;}) => {  
    const result: followings | null = await prisma.followings.create({
        data: {
            user_id: param.user_id,
            follows_user: param.follows_user,
            follows_group: param.follows_group,
        },
    });
    console.log(result);
    return result;
};

export const selectFollowingUsers = async (param: { user_id: string; }) => {  
    const result: followings[] | null = await prisma.followings.findMany({
        where: {
            AND: [
                {
                    user_id: param.user_id,
                },
                {
                    follows_user: { not: null },
                },
                ],
        },
    });
    console.log(result);
    return result;
};

export const selectFollowingGroups = async (param: { user_id: string; }) => {  
    const result = await prisma.followings.findMany({
        where: {
            AND: [
                {
                    user_id: param.user_id,
                },
                {
                    follows_group: { not: null },
                },
                ],
        },
    });
    console.log(result);
    return result;
};

export const deleteFollowing = async (param: { id: number; }) => {  
    const result = await prisma.followings.delete({
        where: {
            id: param.id,
        },
    });
    console.log(result);
    return result;
};
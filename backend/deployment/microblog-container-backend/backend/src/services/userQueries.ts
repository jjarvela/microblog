import { PrismaClient, users } from '@prisma/client';

const prisma = new PrismaClient();



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

export const updateUser = async (param: { uid: string; password?: string; email?: string; 
    admin?: boolean; location?: string; birthday?: Date; 
    joined?: Date; timezone?: string; last_login?: Date}) => {  
    const result: users | null = await prisma.users.update({
        where: {
            uid: param.uid,
        },
        data: {
            password: param.password, 
            email: param.email, 
            admin: param.admin,
            location: param.location, 
            birthday: param.birthday, 
            joined: param.joined, 
            timezone: param.timezone, 
            last_login: param.last_login,
          },
    });
    console.log(result);
    return result;
};
import { PrismaClient, groupmembers } from '@prisma/client';

const prisma = new PrismaClient();


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


export const updateGroup = async (param: { id: number; name?: string; owner_uuid?: string }) => {  
    const result = await prisma.groups.update({
        where: {
            id: param.id,
        },
        data: {
            name: param.name, 
            owner_uuid: param.owner_uuid, 
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

export const insertGroupMember = async (param: { group_id: number; member_id: string; admin: boolean; joined: Date}) => {  
    const result: groupmembers | null = await prisma.groupmembers.create({
        data: {
            group_id: param.group_id,
            member_id: param.member_id,
            admin: param.admin,
            joined: param.joined,
        },
    });
    console.log(result);
    return result;
};

export const selectGroupMembers = async (param: { group_id: number; }) => {  
    const result = await prisma.groupmembers.findMany({
        where: {
            group_id: param.group_id, 
        },
    });
    console.log(result);
    return result;
};

export const deleteGroupMember = async (param: { id: number; }) => {  
    const result = await prisma.groupmembers.delete({
        where: {
            id: param.id,
        },
    });
    console.log(result);
    return result;
};

export const updateGroupMember = async (param: { id: number; admin: boolean; }) => {  
    const result = await prisma.groupmembers.update({
        where: {
            id: param.id,
        },
        data: {
            admin: param.admin, 
        },
    });
    console.log(result);
    return result;
};
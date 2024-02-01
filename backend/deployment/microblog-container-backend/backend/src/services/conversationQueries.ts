import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


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
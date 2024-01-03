import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const insertPost = async (post: { user_uuid: any; text: any; timestamp: any; }) => {  
    console.log("insert blog post");
    const result = await prisma.blog_posts.create({
        data: {
            user_id: post.user_uuid,
            blog_text: post.text,
            timestamp: post.timestamp,
        },
    });
    return result;
};

export default {insertPost};
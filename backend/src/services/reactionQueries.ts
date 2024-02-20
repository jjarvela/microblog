import { PrismaClient, reactions } from "@prisma/client";

const prisma = new PrismaClient();

export const selectUnread = async (param: {
  user_id: string;
  type?: string[];
}) => {
  if (!param.type) {
    const result: reactions[] | null = await prisma.reactions.findMany({
      where: {
        recipient_userid: param.user_id,
        read: false,
      },
    });
    console.log(result);
    return result;
  } else {
    const resultArray: reactions[] = [];
    param.type.forEach(async (item) => {
      const result = await prisma.reactions.findMany({
        where: {
          recipient_userid: param.user_id,
          type: item,
          read: false,
        },
        include: {
          sender_useridTousers: {
            select: {
              uid: true,
              username: true,
              screen_name: true,
              profile_image: true,
            },
          },
          recipient_useridTousers: {
            select: {
              uid: true,
            },
          },
        },
        orderBy: {
          timestamp: "asc",
        },
      });
      result && resultArray.concat(result);
      console.log(resultArray);
    });
    return resultArray;
  }
};

export const selectReactions = async (
  condition: { [key: string]: unknown },
  type?: string[]
) => {
  if (!type) {
    const result: object[] | null = await prisma.reactions.findMany({
      where: condition,
      include: {
        sender_useridTousers: {
          select: {
            uid: true,
            screen_name: true,
            username: true,
            profile_image: true,
          },
        },
        recipient_useridTousers: {
          select: {
            uid: true,
          },
        },
        blog_posts: {
          select: {
            blog_text: true,
          },
        },
      },
    });
    console.log(result);
    return result;
  } else {
    const resultArray: reactions[] = [];
    type.forEach(async (item) => {
      const result = await prisma.reactions.findMany({
        where: { ...condition, type: item },
        include: {
          sender_useridTousers: {
            select: {
              uid: true,
              username: true,
              profile_image: true,
            },
          },
          recipient_useridTousers: {
            select: {
              uid: true,
            },
          },
        },
      });
      result && resultArray.concat(result);
      console.log(resultArray);
    });
    return resultArray;
  }
};

export const insertReaction = async (param: {
  recipient_userid: string;
  sender_userid: string;
  type: string;
  media_id?: number;
  blogpost_id?: number;
  read: boolean;
}) => {
  const result: reactions | null = await prisma.reactions.create({
    data: {
      recipient_userid: param.recipient_userid,
      sender_userid: param.sender_userid,
      type: param.type,
      media_id: param.media_id,
      blogpost_id: param.blogpost_id,
      read: param.read,
      timestamp: new Date(Date.now()),
    },
  });
  console.log(result);
  return result;
};

export const deleteReaction = async (param: {
  blogpost_id: number;
  sender_userid: string;
  type: string;
}) => {
  const result: reactions[] = await prisma.reactions.findMany({
    where: {
      AND: [
        { blogpost_id: param.blogpost_id },
        { sender_userid: param.sender_userid },
        { type: param.type },
      ],
    },
  });

  if (result.length < 1) {
    throw new Error("Could not find reaction");
  }

  const deleted: reactions = await prisma.reactions.delete({
    where: {
      id: result[0].id,
    },
  });

  console.log(deleted);
  return result;
};

export const updateReadStatus = async (
  reactions: number[],
  userId: string,
  status: boolean
) => {
  const results: reactions[] = [];
  reactions.map(async (reaction) => {
    const updated = await prisma.reactions.update({
      where: {
        id: reaction,
        recipient_userid: userId,
      },
      data: {
        read: status,
      },
    });
    results.push(updated);
  });
  return results;
};


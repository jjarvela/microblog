import { PrismaClient, reactions } from "@prisma/client";

const prisma = new PrismaClient();

export const insertReactions = async (param: {
  recipient_userid: string;
  sender_userid: string;
  type: string;
  media_id?: number;
  blogpost_id?: number;
}) => {
  let condition: any = {};
  if (param.media_id) {
    condition = {
      creator_media: {
        creator_user_id: param.recipient_userid,
        media_id: param.media_id,
      },
    };
  } else if (param.blogpost_id) {
    condition = {
      creator_post: {
        creator_user_id: param.recipient_userid,
        blogpost_id: param.media_id,
      },
    };
  } else {
    return null;
  }

  const result: reactions | null = await prisma.reactions.upsert({
    where: condition,
    update: {},
    create: {
      recipient_userid: param.recipient_userid,
      sender_userid: param.sender_userid,
      type: param.type,
      media_id: param.media_id,
      blogpost_id: param.blogpost_id,
    },
  });
  console.log(result);
  return result;
};

export const selectReactions = async (param: {
  user_id: string;
  type: Array<"like" | "repost" | "comment">;
}) => {
  if (param.type.length < 1) {
    const result: reactions[] | null = await prisma.reactions.findMany({
      where: {
        recipient_userid: param.user_id,
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
        },
      });
      result && resultArray.concat(result);
      console.log(resultArray);
    });
    return resultArray;
  }
};

export const deleteReaction = async (param: { reaction_id: number }) => {
  /*let condition: any = {};
  if (param.media_id) {
    condition = {
      creator_media: {
        creator_user_id: param.creator_user_id,
        media_id: param.media_id,
      },
    };
  } else if (param.blogpost_id) {
    condition = {
      creator_post: {
        creator_user_id: param.creator_user_id,
        blogpost_id: param.media_id,
      },
    };
  } else {
    return null;
  }*/

  const result: reactions | null = await prisma.reactions.delete({
    where: {
      id: param.reaction_id,
    },
  });
  console.log(result);
  return result;
};

// const like = {
//         creator_user_id: '641ae1b3-d5bf-4058-b8d8-2e9e6023114d',
//         media_id: 1,
//     };

//     insertLikes(like)
//       .then(async () => {
//         await prisma.$disconnect()
//       })
//       .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//       });

// deleteLike(like)
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   });


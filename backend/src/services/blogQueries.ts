import { PrismaClient, blog_posts } from "@prisma/client";

const prisma = new PrismaClient();

export const insertPost = async (param: {
  user_uuid: string;
  original_post_id?: number;
  original_poster_id: string;
  text: string;
  timestamp: Date;
  original_created?: Date;
  hashtags: string[];
  reposter_id?: string;
  commenter_id?: string;
}) => {
  let createdObjects = []; // contains each item_property

  for (let i = 0; i < param.hashtags.length; i++) {
    createdObjects.push({
      creator_user_id: param.user_uuid,
      value: param.hashtags[i],
      context_id: 1,
      time: param.timestamp
    });
  }
  const result = await prisma.blog_posts.create({
    data: {
      original_post_id: param.original_post_id || null,
      user_id: param.user_uuid,
      original_poster_id: param.original_poster_id,
      blog_text: param.text,
      timestamp: param.timestamp,
      original_created: param.original_created || param.timestamp,
      reposter_id: param.reposter_id || null,
      commenter_id: param.commenter_id || null,
      item_properties: {
        create: createdObjects
      }
    },
    include: {
      item_properties: true,
      user_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      },
      original_poster_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      },
      reposter_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      },
      commenter_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      }
    }
  });
  console.log(result);
  return result;
};

export const selectOnePost = async (param: { blog_post_id: number }) => {
  const result: object | null = await prisma.blog_posts.findUnique({
    where: {
      id: param.blog_post_id
    },
    include: {
      item_properties: {
        select: {
          blogpost_id: true,
          value: true,
          context_id: true
        },
        where: {
          context_id: 1
        }
      },
      user_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      },
      original_poster_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      },
      reposter_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      },
      commenter_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      }
    }
  });
  console.log(result);
  return result;
};

export const queryPosts = async (param?: {
  hashtags?: string | string[];
  usernames?: string | string[];
  keyword?: string;
  startDate?: string;
  endDate?: string;
}) => {
  if (!param) {
    const result = await prisma.blog_posts.findMany({
      where: {},
      include: {
        item_properties: {
          select: {
            blogpost_id: true,
            value: true,
            context_id: true
          },
          where: {
            context_id: 1
          }
        },
        user_idTousers: {
          select: {
            uid: true,
            username: true,
            screen_name: true,
            profile_image: true
          }
        },
        original_poster_idTousers: {
          select: {
            uid: true,
            username: true,
            screen_name: true,
            profile_image: true
          }
        },
        reposter_idTousers: {
          select: {
            uid: true,
            username: true,
            screen_name: true,
            profile_image: true
          }
        },
        commenter_idTousers: {
          select: {
            uid: true,
            username: true,
            screen_name: true,
            profile_image: true
          }
        }
      },
      orderBy: {
        timestamp: "desc"
      }
    });
    return result;
  }
  const posts: object[] = [];
};

export const selectPosts = async (param: {
  user_uuid: string;
  startdate: Date;
  enddate: Date;
}) => {
  const result: object | null = await prisma.blog_posts.findMany({
    where: {
      user_id: param.user_uuid,
      AND: [
        {
          timestamp: {
            gte: param.startdate //greater than or equals
          }
        },
        {
          timestamp: {
            lte: param.enddate
          }
        }
      ]
    },
    include: {
      item_properties: {
        select: {
          blogpost_id: true,
          value: true,
          context_id: true
        },
        where: {
          context_id: 1
        }
      },
      user_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      },
      original_poster_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      },
      reposter_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      },
      commenter_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      }
    },
    orderBy: {
      timestamp: "desc"
    }
  });
  console.log(result);
  return result;
};

export const updatePost = async (param: {
  id: number;
  post: {
    user_uuid: string;
    text: string;
    timestamp: Date;
    hashtags: string[];
  };
}) => {
  const deleted = prisma.item_properties.deleteMany({
    // Delete existing post hashtags
    where: {
      blogpost_id: param.id
    }
  });
  console.log("Deleted " + (await deleted).count + " tags");

  const createdObjects = [];

  for (let i = 0; i < param.post.hashtags.length; i++) {
    createdObjects.push({
      creator_user_id: param.post.user_uuid,
      value: param.post.hashtags[i],
      context_id: 1,
      time: param.post.timestamp
    });
  }

  const result: blog_posts | null = await prisma.blog_posts.update({
    where: {
      id: param.id
    },
    data: {
      blog_text: param.post.text,
      item_properties: {
        create: createdObjects
      }
    },
    include: {
      item_properties: true,
      user_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      },
      original_poster_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      },
      reposter_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      },
      commenter_idTousers: {
        select: {
          uid: true,
          username: true,
          screen_name: true,
          profile_image: true
        }
      }
    }
  });
  console.log(result);
  return result;
};

export const deletePost = async (param: { id: number; user_id?: string }) => {
  if (param.user_id) {
    const result: object | null = await prisma.blog_posts.delete({
      where: {
        id: param.id,
        user_id: param.user_id
      }
    });
    console.log(result);
    return result;
  } else {
    const result: object | null = await prisma.blog_posts.delete({
      where: {
        id: param.id
      }
    });
    console.log(result);
    return result;
  }
};

export const selectReposts = async (param: {
  original_post_id: number;
  reposter_id?: string;
}) => {
  if (param.reposter_id) {
    const result = await prisma.blog_posts.findMany({
      where: {
        original_post_id: param.original_post_id,
        reposter_id: param.reposter_id
      }
    });

    if (result) return result;
    else return [];
  } else {
    const result = await prisma.blog_posts.findMany({
      where: {
        original_post_id: param.original_post_id
      }
    });

    if (result) return result;
    else return [];
  }
};

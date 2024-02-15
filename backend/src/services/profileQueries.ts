import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProfile = async (param: { uid: string }) => {
  const profile_id = await findProfileIdWithUserId(param.uid);

  const profile = await prisma.user_profiles.findUnique({
    where: {
      id: profile_id,
    },
  });
  const result = {
    user_id: profile?.user_id,
    profile_text: profile?.profile_text,
    header_media_id: profile?.header_media_id,
    homepage: profile?.homepage,
  };
  console.log(result);
  return result;
};

export const editProfile = async (param: {
  uid: string;
  data: {
    user_id: string;
    profile_text: string;
    header_media_id: number;
    homepage: string;
  };
}) => {
  const profile_id = await findProfileIdWithUserId(param.uid);

  const profile = await prisma.user_profiles.update({
    where: { id: profile_id },
    data: param.data,
  });
  const result = {
    user_id: profile?.user_id,
    profile_text: profile?.profile_text,
    header_media_id: profile?.header_media_id,
    homepage: profile?.homepage,
  };
  console.log(result);
  return result;
};

export const getProfileElements = async (param: { uid: string }) => {
  const profile_id = await findProfileIdWithUserId(param.uid);

  const profileElements = await prisma.profile_elements.findMany({
    where: {
      profile_id: profile_id,
    },
  });
  const result = await Promise.all(
    profileElements.map(async (element) => {
      const typeName = (
        await prisma.element_types.findFirst({
          where: { id: element.type_id },
        })
      )?.name;
      return { type: typeName, data: element.data };
    })
  );
  if (result && result.length > 0) {
    console.log(result);
    return result;
  } else {
    console.log("No profile element results");
    return [];
  }
};

export const updateProfileElements = async (param: {
  uid: string;
  elements: { type: string; data: object }[];
}) => {
  const profile_id = await findProfileIdWithUserId(param.uid);

  const data = Promise.all(
    param.elements.map(async (element) => {
      return {
        type_id:
          (
            await prisma.element_types.findUnique({
              where: { name: element.type },
              select: { id: true },
            })
          )?.id || 0,
        data: element.data,
        profile_id: profile_id,
      };
    })
  );
  await prisma.profile_elements.deleteMany({
    where: {
      profile_id: profile_id,
    },
  });
  if (await data) {
    const result = await prisma.profile_elements.createMany({
      data: await data,
    });
    console.log(result);
    return result;
  } else {
    console.error("Could not generate profile elements data!");
    return;
  }
};

async function findProfileIdWithUserId(userId: string) {
  const profileId =
    (
      await prisma.user_profiles.findUnique({
        where: { user_id: userId },
        select: { id: true },
      })
    )?.id || "";
  if (profileId === "")
    console.warn(`Profile id was not found! (defaults to "")`);
  return profileId;
}

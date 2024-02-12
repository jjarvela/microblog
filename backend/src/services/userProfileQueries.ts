import {
  PrismaClient,
  folders,
  item_properties,
  profile_elements,
  social_links
} from "@prisma/client";

const prisma = new PrismaClient();

type Profile = {
  id: string;
  user_id: string;
  profile_text: string | null;
  header_media_id: number | null;
  homepage: string | null;
};

export const insertProfile = async (param: {
  id: string;
  user_id: string;
  profile_text: string;
  screen_name: string;
}) => {
  const result = await prisma.user_profiles.create({
    data: {
      id: param.id,
      user_id: param.user_id,
      profile_text: param.profile_text
    }
  });
  console.log(result);
  return result;
};

export const selectProfile = async (param: { user_id: string }) => {
  const result: Profile | null = await prisma.user_profiles.findUnique({
    where: {
      user_id: param.user_id
    },
    include: {
      social_links: {
        select: {
          id: true,
          link: true
        }
      }
    }
  });
  console.log(result);
  return result;
};

export const updateProfile = async (param: {
  id: string;
  user_id: string;
  profile_image?: number;
  profile_text?: string;
  header_media_id?: number;
  homepage?: string;
  screen_name?: string;
}) => {
  const result = await prisma.user_profiles.update({
    where: {
      id: param.id
    },
    data: {
      profile_text: param.profile_text,
      header_media_id: param.header_media_id,
      homepage: param.homepage
    }
  });
  console.log(result);
  return result;
};

export const deleteProfile = async (param: { id: string }) => {
  const result: object = await prisma.user_profiles.delete({
    where: {
      id: param.id
    }
  });
  console.log(result);
  return result;
};

export const insertLink = async (param: {
  profile_id: string;
  link: string;
}) => {
  const result = await prisma.social_links.create({
    data: {
      profile_id: param.profile_id,
      link: param.link
    }
  });
  console.log(result);
  return result;
};

export const deleteLink = async (param: { id: number }) => {
  const result: object = await prisma.social_links.delete({
    where: {
      id: param.id
    }
  });
  console.log(result);
  return result;
};

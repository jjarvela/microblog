import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProfileElements = async (param: { uid: string }) => {
  const queryResult = await prisma.user_profiles.findUnique({
    where: { user_id: param.uid },
    select: { profile_elements: true },
  });
  const result = queryResult?.profile_elements.map(async (element) => {
    const typeName = (
      await prisma.element_types.findFirst({
        where: { id: element.type_id },
      })
    )?.name;
    return { type: typeName, data: element.data };
  });
  console.log(result);
  return result;
};

export const updateProfileElements = async (param: {
  uid: string;
  elements: { type: string; data: object }[];
}) => {
  const data = Promise.all(
    param.elements.map(async (element) => {
      return {
        type_id:
          (
            await prisma.element_types.findFirst({
              where: { name: element.type },
              select: { id: true },
            })
          )?.id || 0,
        data: element.data,
        profile_id: param.uid,
      };
    })
  );
  await prisma.profile_elements.deleteMany({
    where: { profile_id: param.uid },
  });
  const result = await prisma.profile_elements.createMany({ data: await data });
  console.log(result);
  return result;
};

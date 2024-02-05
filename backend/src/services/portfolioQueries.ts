import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPortfolio = async (param: { uid: string }) => {
  const queryResult = await prisma.user_profiles.findUnique({
    where: { user_id: param.uid },
    select: { profile_elements: true },
  });
  const result = queryResult?.profile_elements.map(async (element) => {
    const typeName = await prisma.element_types.findFirst({
      where: { id: element.type_id },
    });
    return { type: typeName, data: element.data };
  });
  console.log(result);
  return result;
};

export const updatePortfolio = async (param: {
  uid: string;
  elements: { type: string; data: object }[];
}) => {
  const data = param.elements.map(async (element) => {
    return {
      type_id: (
        await prisma.element_types.findFirst({
          where: { name: element.type },
          select: { id: true },
        })
      )?.id,
      data: element.data,
    };
  });
  const result = await prisma.profile_elements.updateMany({
    data: data,
    where: { profile_id: param.uid },
  });
  console.log(result);
  return result;
};

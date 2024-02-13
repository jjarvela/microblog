import { PrismaClient, users } from "@prisma/client";

const prisma = new PrismaClient();

export const insertUser = async (param: {
  uid: string;
  username: string;
  email: string;
  screen_name: string;
  passwordHash: string;
  joined: Date;
  birthday: Date;
  location: string;
  disabled: boolean;
  verified: boolean;
}) => {
  //register: username, email and password from user
  const result = await prisma.users.create({
    data: {
      uid: param.uid,
      screen_name: param.screen_name,
      username: param.username,
      email: param.email,
      birthday: param.birthday,
      location: param.location,
      password: param.passwordHash,
      joined: param.joined,
      disabled: param.disabled,
      verified: param.verified,
    },
  });
  return result;
};

export const selectUser = async ({
  username,
  uid,
}: {
  username?: string;
  uid?: string;
}) => {
  if (username) {
    const result: object | null = await prisma.users.findUnique({
      where: {
        username: username,
      },
      select: {
        uid: true,
        username: true,
        password: true,
      },
    });
    return result;
  } else if (uid) {
    const result: object | null = await prisma.users.findUnique({
      where: {
        uid: uid,
      },
      select: {
        uid: true,
        username: true,
        screen_name: true,
        profile_image: true,
        email: true,
        birthday: true,
        joined: true,
        location: true,
      },
    });
    return result;
  }
};

export const deleteUser = async (param: { uid: string }) => {
  const result: object = await prisma.users.delete({
    where: {
      uid: param.uid,
    },
  });
  return result;
};

export const updateUser = async (param: {
  uid: string;
  password?: string;
  email?: string;
  admin?: boolean;
  location?: string;
  birthday?: Date;
  joined?: Date;
  timezone?: string;
  last_login?: Date;
}) => {
  const result: users | null = await prisma.users.update({
    where: {
      uid: param.uid,
    },
    data: {
      password: param.password,
      email: param.email,
      admin: param.admin,
      location: param.location,
      birthday: param.birthday,
      joined: param.joined,
      timezone: param.timezone,
      last_login: param.last_login,
    },
  });
  return result;
};

export const getSocket = async (userId: string) => {
  const result: object | null = await prisma.users.findUnique({
    where: {
      uid: userId,
    },
    select: {
      uid: true,
      socket_id: true,
    },
  });
  return result;
};

export const updateSocket = async (userId: string, socketId: string | null) => {
  const result: users | null = await prisma.users.update({
    where: {
      uid: userId,
    },
    data: {
      socket_id: socketId,
    },
  });
  console.log(result);
};

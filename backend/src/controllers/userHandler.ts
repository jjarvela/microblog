import { Request, Response } from "express";
import * as userQueries from "../services/userQueries";
import * as userProfileQueries from "../services/userProfileQueries";
import * as followingQueries from "../services/followingQueries";
import { Context } from "openapi-backend";
import { users } from "@prisma/client";

type User = {
  uid: string;
  username: string;
  screen_name: string | null;
  profile_image: number | null;
};

export async function getUser(c: Context, _req: Request, res: Response) {
  const userId = c.request.params.userId;

  try {
    const result = await userQueries.selectUser({ uid: userId.toString() });
    console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function editUser(c: Context, _req: Request, res: Response) {
  const userId = c.request.params.userId;
  const userObj = c.request.requestBody;

  try {
    const result = await userQueries.updateUser({ uid: userId, ...userObj });
    console.log(result);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteUser(c: Context, _req: Request, res: Response) {
  const userId = c.request.params.userId as string;
  try {
    const result = await userQueries.deleteUser({ uid: userId });
    console.log("Deleted user id: " + userId);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUserId(c: Context, _req: Request, res: Response) {
  const userName = c.request.params.userName;
  try {
    const user = await userQueries.getUserIdByName(userName as string);
    res.status(200).send(user?.uid);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUserThumbInfo(
  c: Context,
  _req: Request,
  res: Response
) {
  const username = c.request.params.username.toString();

  try {
    const user = await userQueries.selectUser({ username: username });
    if (!user) throw new Error("User does not exist");
    const following = await followingQueries.selectFollowingUsers({
      user_id: (user as users).uid
    });
    const followers = await followingQueries.selectFollowers({
      user_id: (user as users).uid
    });
    const profile = await userProfileQueries.selectProfile({
      user_id: (user as users).uid
    });

    if (!user || !following || !followers || !profile)
      throw new Error("Internal server error");

    const result = {
      id: (user as User).uid,
      userName: (user as User).username,
      screenName: (user as User).screen_name || (user as User).username,
      profileImage: (user as User).profile_image || "",
      following: following,
      followers: followers,
      description: profile.profile_text || ""
    };
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

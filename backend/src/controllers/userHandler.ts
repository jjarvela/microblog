import { Request, Response } from "express";
import * as userQueries from "../services/userQueries";
import * as userProfileQueries from "../services/userProfileQueries";
import * as followingQueries from "../services/followingQueries";
import { Context } from "openapi-backend";

type User = {
  uid: string;
  username: string;
  screen_name: string | null;
  profile_image: number | null;
};

export async function getUserThumbInfo(
  c: Context,
  _req: Request,
  res: Response
) {
  const userId = c.request.params.userId;

  try {
    const user = await userQueries.selectUser({ uid: userId.toString() });
    const following = await followingQueries.selectFollowingUsers({
      user_id: userId.toString()
    });
    const followers = await followingQueries.selectFollowers({
      user_id: userId.toString()
    });
    const profile = await userProfileQueries.selectProfile({
      user_id: userId.toString()
    });

    if (!user || !following || !followers || !profile)
      throw new Error("Internal server error");

    const result = {
      id: (user as User).uid,
      username: (user as User).username,
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

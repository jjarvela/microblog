import { PrismaClient } from "@prisma/client";
import { userdata } from "./data/users";
import { postdata } from "./data/posts";
import { contextdata } from "./data/contexts";
import { groupdata } from "./data/groups";
import { elementTypes, userProfiles } from "./data/profile";
import { userMedia } from "./data/media";

const prisma = new PrismaClient();

async function runSeeders() {
  // contexts
  await Promise.all(
    contextdata.map(async (context) =>
      prisma.contexts.upsert({
        where: { id: context.id },
        update: {},
        create: context,
      })
    )
  );

  // users
  await Promise.all(
    userdata.map(async (user) =>
      prisma.users.upsert({
        where: { uid: user.uid },
        update: {},
        create: user,
      })
    )
  );

  // blog_posts
  await Promise.all(
    postdata.map(async (post) =>
      prisma.blog_posts.upsert({
        where: { id: post.id },
        update: {},
        create: post,
      })
    )
  );

  // groups
  await Promise.all(
    groupdata.map(async (group) =>
      prisma.groups.upsert({
        where: { id: group.id },
        update: {},
        create: group,
      })
    )
  );

  /// Profile
  await Promise.all(
    elementTypes.map(async (type) =>
      prisma.element_types.upsert({
        where: { id: type.id, name: type.name },
        update: {},
        create: type,
      })
    )
  );

  await Promise.all(
    userMedia.map(async (media) =>
      prisma.user_medias.upsert({
        where: { id: media.id, user_id: media.user_id },
        update: {},
        create: media,
      })
    )
  );

  await Promise.all(
    userProfiles.map(async (profile) =>
      prisma.user_profiles.upsert({
        where: { user_id: profile.user_id },
        update: {},
        create: profile,
      })
    )
  );

  // Fix autoincrement id counter lag by reseting increment counter to 20
  // If scripts seeds more than 20 users or blog post increase accordingly.

  await prisma.$queryRaw`SELECT setval('public.blog_posts_id_seq', 20, true)`;
  await prisma.$queryRaw`SELECT setval('public.item_properties_id_seq', 20, true)`;
  await prisma.$queryRaw`SELECT setval('public.groups_id_seq', 20, true)`;
  await prisma.$queryRaw`SELECT setval('public.profile_elements_id_seq', 20, true)`;
}

runSeeders()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Successfully seeded database. Closing connection.");
    await prisma.$disconnect();
  });

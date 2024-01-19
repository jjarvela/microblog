import { PrismaClient } from '@prisma/client';
import { userdata } from './data/users';
import { postdata } from './data/posts';
import { contextdata } from './data/contexts';

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
        where : { uid: user.uid },
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

// Fix autoincrement id counter lag by reseting increment counter to 20
// If scripts seeds more than 20 users or blog post increase accordingly.

await prisma.$queryRaw`SELECT setval('public.blog_posts_id_seq', 20, true)`;  
await prisma.$queryRaw`SELECT setval('public.item_properties_id_seq', 20, true)`;  
}

runSeeders()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Successfully seeded database. Closing connection.');
    await prisma.$disconnect();
  });
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
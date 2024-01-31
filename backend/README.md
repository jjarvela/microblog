# Microblog Backend

Backend for Microblog service using Express server and PostgreSQL database 
with Prisma connected to the database.

## Installing

1. Clone the repository
2. Navigate to `.\backend\` and run `npm install`

### Running Express server locally:

1. In folder `.\backend\`, run `npm run start`
2. Server is listening http://localhost:9000

### Running database locally:

1. you need PostgreSQL database server running

2. create empty database `microblog`

3. Navigate to `\backend\src\services` and set in file schema.prisma the url field of the datasource block to your database connection URL.

Set the url as environment variable in .env file.

The format of URL is as follows, uppercased are placeholders for your connection details:

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/microblog?schema=public"

When running locally, set HOST to localhost and PORT is typically 5432.

4. run `npx prisma db push` to push the initial schema to the database.

### Seeding

1. Navigate to `.\backend\` and run `npx prisma db seed`. 

This will populate the database with data that is required for application 
to start, and for development purpose also.

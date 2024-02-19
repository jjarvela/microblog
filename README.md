# Project Title

A brief description of what the project does.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)
- [Contact](#contact)

## Installation

Instructions for installing and setting up the project.

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

1. Navigate to `.\backend\` and run `npx prisma db seed --schema ./src/services/schema.prisma`.

This will populate the database with data that is required for application
to start, and for development purpose also.

### Container build & starting

1. In developement pull branch 'backend-container' from origin.
2. On your local developement environment navigate to .\backend\deployment\microblog-container-backend
3. In microblog-container-backend folder:
   a) Edit .env environment variables  
   b) Run `docker-compose build` to build container image. The default configuration has all development dependencies,
   if you want to reduce image size edit package.json accordingly.
   c) Run `docker-compose up` to start up the container.

## Usage

How to use the project and examples of usage.

## Contributing

Guidelines for contributing to the project.

## License

This project is licensed under the [License Name](LICENSE.md) - see the [LICENSE.md](LICENSE.md) file for details.

## Credits

Acknowledgments and credits for contributions.

## Contact

Contact information for project maintainer.

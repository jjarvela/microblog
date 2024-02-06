#!/bin/bash
cd /opt/microblog/backend
DB_INIT="DB_INIT_DONE"
# debug
printenv $DATABASE_URL

if [ ! -e "$DB_INIT" ] && [ -n "$DATABASE_URL" ]; then
    touch $DB_INIT
    echo "Installing packages for microblog app..."
    # Install npm production packages 
    cd /opt/microblog/backend/
    echo "Initializing database"
    npx prisma db push --schema=./src/services/schema.prisma
    npm run seed
    npm start
elif [ -z "$DATABASE_URL" ]; then
    echo "DATABASE_URL variable is not set. Microblog not started"
    exit 1
else     
  echo "DB already initialized."
  cd /opt/microblog/backend/
  npm start
fi


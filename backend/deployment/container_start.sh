#!/bin/bash
DB_INIT="DB_INIT_DONE"

if [ ! -e "$DB_INIT" ] && [ -n "$DATABASE_URL" ]; then
    echo "Installing packages for microblog app..."
    # Install npm production packages 
    cd /opt/microblog/backend/
    echo "Initializing database"
    
    npx prisma db push --schema=./src/services/schema.prisma
    npx prisma db seed
    touch $DB_INIT
    
elif [ -z "$DATABASE_URL" ]; then
    echo "DATABASE_URL variable is not set. Microblog not started"
    exit 1
fi

if [ "$NODE_ENV" == "development" ]; then
  cd /opt/microblog/backend
  npm install -g openapicmd
  openapi typegen ../api-definition/api-definition.yaml > ./src/microblog-backend.d.ts
  npx nodemon ./src/index.ts
else 
  cd /opt/microblog/backend
  npm start
fi




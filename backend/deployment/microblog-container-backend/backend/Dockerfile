FROM node:20-alpine3.18
WORKDIR /opt/microblog/backend/
# Install Bash
RUN apk add --no-cache bash
# Set required env variables.
ARG DATABASE_URL 
ENV DATABASE_URL=$DATABASE_URL
# Copy package.json, source code and api definition.
COPY ./backend/package.json /opt/microblog/backend/
COPY ./backend/src/ /opt/microblog/backend/src
COPY ./api-definition/api-definition.yaml /opt/microblog/api-definition/
COPY ./backend/deployment/container_start.sh .
RUN npm install -g npm@10.4.0
RUN npm install
RUN npx prisma generate --schema=./src/services/schema.prisma
RUN chmod +x ./container_start.sh

# ENV NODE_ENV production
ENV PORT 9000
EXPOSE 9000
# CMD /opt/microblog/backend/container_start.sh $DATABASE_URL
CMD /bin/bash container_start.sh ${DATABASE_URL}
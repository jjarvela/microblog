# Microblog Frontend

This is the Vite + React + TypeScript frontend for the Microblog service.

## Building and Running

### Running locally:

1. Clone the repository
2. Navigate to `./frontend/` and run `npm install`
3. Run with `npm run dev`
4. Go to http://localhost:5173/

### Running in Docker:

1. Clone the repository
2. Navigate to `./frontend/` and run `docker build . -t "microblog-frontend"`
3. Once built run it with `docker run -p 4000:4000 --name "microblog-frontend" "microblog-frontend"`
4. Go to http://localhost:4000/

### GraphQL API for a track search service.

---
## Technologies used

Back-end : [Nodejs](https://nodejs.org/en/) , [Typescript](https://www.typescriptlang.org/), [GraphQL](https://graphql.org/) , [Apollo Server](https://www.apollographql.com/docs/apollo-server/), [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/), [Docker](https://www.docker.com/)

---
## Pre-requisites

You will need to install the following as pre-requisites to getting started:

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/en/docs/install) to install the project dependencies
- Docker for [Mac](https://docs.docker.com/docker-for-mac/install/) or [Windows](https://docs.docker.com/docker-for-windows/install/)

---
## Getting Started

Once you have the above installed, run the following commands from the root:

-  Install node modules: `yarn install`
-  Start the database (run postgres docker container, run db migrations + db seed): `yarn db:start`
-  Start dev server: `yarn dev`
-  Open browser tab with (http://localhost:4000/) (Studio Apollo GraphQl)


Other useful commands:

- Stop database and clean up `yarn db:stop`
- Start Prisma studio `yarn db:studio`

---
## Start the project in production

-  Build the project: `yarn build`
-  Start the server: `yarn start`

___
## Authentication

You need to authenticate against the GraphQl API with a token, otherwise the schema can not be introspected in Studio.
You need to provide a valid HTTP header when send requests like: ```Authorization : Bearer AUTH_TOKEN```

Test auth token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UifQ.xuEv8qrfXu424LZk8bVgr9MQJUIrp1rHcPyZw_KSsds` 

___
## External API

https://docs.acrcloud.com/reference/metadata-api
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import schema from './schema';

import HackerNewsConnector from './hackernews/connector';
import { HackerNewsUsers, HackerNewsStories } from './hackernews/models';


export function run({
  PORT = 3020,
}) {
  const app = express();

  const hackerNewsConnector = new HackerNewsConnector();

  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/graphql', graphqlExpress({
    schema,
    context: {
      HackerNewsStories: new HackerNewsStories({ connector: hackerNewsConnector }),
      HackerNewsUsers: new HackerNewsUsers({ connector: hackerNewsConnector }),
    },
  }));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));

  const server = createServer(app);

  server.listen(PORT, () => {
    console.log(`API Server is now running on http://localhost:${PORT}/graphql`)
  });
}

import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import { schema as hackerNewsSchema, resolvers as hackerNewsResolvers } from './hackernews/schema';

const rootSchema = [`
  type Query {
    hello: String
    ping(message: String!): String
    hackerNewsTopStories(sort: HackerNewsTopStoriesSort first:Int offset: Int): [HackerNewsStory]!
    hackerNewsStory(id:Int!): HackerNewsStory
  }

  # type Mutation {
  # }

  # type Subscription {
  # }

  schema {
    query: Query
    # mutation: Mutation
    # subscription: Subscription
  }
`];

const rootResolvers = {
  Query: {
    hello(root, args, context) {
      return "Hello world!";
    },
    ping(root, { message }, context) {
      return `Answering ${message}`;
    },
  },
  // Mutation: {
  // },
  // Subscription: {
  // },
};

const typeDefs = [...rootSchema, ...hackerNewsSchema];
const resolvers = merge(rootResolvers, hackerNewsResolvers);

const jsSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default jsSchema;

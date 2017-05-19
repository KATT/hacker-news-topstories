import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = [`
  type Query {
    hello: String
    ping(message: String!): String
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

const resolvers = {
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

const jsSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default jsSchema;

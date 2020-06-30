import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

const users = [
  {
    id: 0,
    name: 'User One',
    email: 'user_one@domain.com',
  },
  {
    id: 1,
    name: 'User Two',
    email: 'user_two@domain.com',
  },
];

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!,
    name: String!,
    email: String!
  }

  type Query {
    users: [User!]!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
  },
  User: {
    __resolveReference(user: any) { // eslint-disable-line
      return users.find((u) => u.id === user.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen(5051).then(() => {
  console.log('Users service running on port 5051!');
});

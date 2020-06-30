import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

const posts = [
  {
    id: '0',
    owner_id: '0',
    title: 'Post from User One',
    text: 'This is the content',
  },
  {
    id: '0',
    owner_id: '1',
    title: 'Post from User Two!!',
    text: 'This is the content',
  },
];

const typeDefs = gql`
  # type User @key(fields: "id") {
  #   id: ID!,
  #   name: String!,
  #   email: String!
  # }

  type Post {
    id: ID
    title: String
    text: String
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    posts: [Post]
  }

  extend type Query {
    posts: [Post!]!
  }
`;

const resolvers = {
  Query: {
    posts: () => posts,
  },
  User: {
    posts: (user:any) => {
      console.log({ user });
      return posts.filter((p) => p.owner_id === user.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen(5052).then(() => {
  console.log('Posts service running on port 5052!');
});

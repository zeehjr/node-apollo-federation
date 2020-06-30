import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

const gateway = new ApolloGateway({
  serviceList: [
    {
      name: 'users',
      url: 'http://localhost:5051',
    },
    {
      name: 'posts',
      url: 'http://localhost:5052',
    },
  ],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen(5050).then(() => {
  console.log('Gateway is running on port 5050!');
});

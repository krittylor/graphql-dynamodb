const dataStore = require('./dataStore');
const uuid = require('uuid');
export const resolvers = {
  Query: {
    users: () => dataStore.getUser()
  },
  Mutation: {
    addUser: (root, args) => {
      const newChannel = { id: uuid.v4(), name: args.name };
      return dataStore.addUser(newChannel);
    },
  },
};

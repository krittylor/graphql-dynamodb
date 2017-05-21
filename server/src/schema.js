import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
type User {
  id: ID!                # "!" denotes a required field
  name: String
}
# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
  users: [User]    # "[]" means this is a list of channels
}

# The mutation root type, used to define all mutations.
type Mutation {
  # A mutation to add a new channel to the list of channels
  addUser(name: String!): User
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };

import React from 'react';
import { gql, graphql } from 'react-apollo';

import { usersListQuery } from './UsersListWithData';

const AddUser = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      mutate({ 
        variables: { name: evt.target.value },
        optimisticResponse: {
          addUser: {
            name: evt.target.value,
            id: 'not_yet',
            __typename: 'User',
          },
        },
        update: (store, { data: { addUser } }) => {
            // Read the data from the cache for this query.
            const data = store.readQuery({ query: usersListQuery });
            console.log('update : ', data);
            // Add our channel from the mutation to the end.
            data.users.push(addUser);
            // Write the data back to the cache.
            store.writeQuery({ query: usersListQuery, data });
          },
      });
      evt.target.value = '';
    }
  };

  return (
    <input
      type="text"
      placeholder="New User"
      onKeyUp={handleKeyUp}
    />
  );
};

const addChannelMutation = gql`
  mutation addUser($name: String!) {
    addUser(name: $name) {
      id
      name
    }
  }
`;

const AddUserWithMutation = graphql(
  addChannelMutation,
)(AddUser);

export default AddUserWithMutation;
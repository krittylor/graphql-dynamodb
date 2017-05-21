import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';

import AddChannel from './AddUser';

const UsersList = ({ data: {loading, error, users }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="channelsList">
      <AddChannel />
      { users.map( ch =>
        (<div key={ch.id} className={'channel ' + (ch.id === 'not_yet' ? 'optimistic' : '')}>{ch.name}</div>)
      )}
    </div>
  );
};

export const usersListQuery = gql`
  query ChannelsListQuery {
    users {
      id
      name
    }
  }
`;

export default graphql(usersListQuery, {

})(UsersList);
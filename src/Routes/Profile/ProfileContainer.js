import React from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useMutation, useQuery } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";
import { LOG_USER_OUT } from "../Auth/AuthQueries";

const GET_USER = gql`
  query seeUser($username: String!) {
seeUser(username: $username) {
   user{
	  id
      avatar
      username
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
    }
    posts{
    id
    likeCount
    commentCount
      files{
        id
        url
      }
     } 
    }
  }
`;



export default withRouter(({ match: { params: { username } } }) => {
  const { data, loading } = useQuery(GET_USER, { variables: { username } });
  const [logOut] = useMutation(LOG_USER_OUT);
  return <ProfilePresenter loading={loading} logOut={logOut} data={data} />;
});
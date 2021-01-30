import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import { Helmet } from "rl-react-helmet";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar 
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      commentLike
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
`;

export default () => {
    const { data, loading } = useQuery(FEED_QUERY);
    console.log(data)
    return (
        <Wrapper>
            {loading && <Loader />}
            {!loading && data && data.seeFeed && data.seeFeed.map(post =>
                <Post key={post.id}
                    id={post.id}
                    user={post.user}
                    files={post.files}
                    likeCount={post.likeCount}
                    caption={post.caption}
                    avatar={post.user.avatar}
                    isLiked={post.isLiked}
                    comments={post.comments}
                createdAt={post.createdAt}
                commentLike={post.commentLike}
                />)}
        </Wrapper>);
};
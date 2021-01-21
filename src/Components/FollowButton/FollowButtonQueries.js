import { gql } from "apollo-boost";

export const FOLLOW = gql`
  mutation following($id: String!) {
    follow(id: $id)
  }
`;

export const UNFOLLOW = gql`
  mutation unfollowing($id: String!) {
    unfollow(id: $id)
  }
`;
import React, { useRef } from "react";
import styled from "styled-components";
import { Helmet } from "rl-react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup'; 
//import "../../Styles/PopUp.css";


const Users = styled.ul`
  margin-top:10px;
`;

const User = styled.li`
  margin-bottom:10px;
  span{
    margin-right:5px;
  }
  display : flex;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const Caption = styled.div`
  margin : 10px 0px
`;


const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const Div = styled.div`
width : 60px;
align-items: right; 
text-align:right;
margin-left:auto;

 `;


const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 26px;
  display: block;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
  cursor: pointer;
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const FullNameF = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  
  width: 90px;
    overflow: hidden;
    height: 13px
`;

const UserDetail = styled.div`
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

export default ({ loading, data, logOut }) => {
    if (loading === true) {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    } else if (!loading && data && data.seeUser) {
        const {
            seeUser: {
                id,
            avatar,
                username,
                fullName,
            isFollowing,
            followers,
                following,
                isSelf,
                bio,
                followingCount,
                followersCount,
                postsCount,
                posts
            }
        } = data;
        return (
            <Wrapper>
                <Helmet>
                    <title>{username} | Semicolon</title>
                </Helmet>
                <Header>
                    <HeaderColumn>
                        <Avatar size="lg" url={avatar} />
                    </HeaderColumn>
                    <HeaderColumn>
                        <UsernameRow>
                            <Username>{username}</Username>{" "}

                        </UsernameRow>
                        <Counts>
                            <Count>
                                <FatText text={String(postsCount)} /> posts
              </Count>
                            <Count>
                    <FatText text={String(followersCount)} /> {FollowerPopUp(followers)}
              </Count>
                            <Count>
                                <FatText text={String(followingCount)} /> {FollowingPopUp(following)}
              </Count>

                        </Counts>
                        <FullName text={fullName} />
                        <Bio>{bio}</Bio>
                {isSelf ? <Button onClick={logOut} text="Log Out"/> : <FollowButton isFollowing={isFollowing} id={id} />}
                    </HeaderColumn>
                </Header>
                <Posts>
                    {posts &&
                posts.map(post => (
                  <SquarePost
                    key={post.id}
                    postid={post.id}
                                likeCount={post.likeCount}
                                commentCount={post.commentCount}
                                file={post.files[0]}
                            />
                    
                        ))}
                </Posts>
            </Wrapper>
        );
    }
    return null;
};

const FollowerPopUp = (followers) => {
  const ref = useRef();
  
  return (
    <div>
      <Popup
        ref={ref}
        trigger={
          <Count>
            followers
          </Count>
        }
      >
        <div width="30%">
        {followers && (
          <Users>
            {followers.map(follower => (
              <User key={follower.id}>
                <Avatar url={follower.avatar} />
                <UserDetail>
                  <FatText text={follower.username} />
                  <FullNameF>{follower.fullName}</FullNameF>
                </UserDetail>
                <Div> <FollowButton isFollowing={follower.isFollowing} id={follower.id}/></Div>
              </User>
            ))}
          </Users>
          )}
          </div>
      </Popup>
    </div>
  );
};

const FollowingPopUp = (following) => {
  const ref = useRef();
  
  return (
    <div>
      <Popup
        ref={ref}
        trigger={
          <Count>
            following
          </Count>
        }
      >
        {following && (
          <Users>
            {following.map(following => (
              <User key={following.id}>
                <Avatar url={following.avatar} />
                <UserDetail>
                <FatText text={following.username} />
                  <FullNameF>{following.fullName}</FullNameF>
                  </UserDetail>
                <Div><FollowButton isFollowing={following.isFollowing} id={following.id}/></Div>
              
              </User>
            ))}
          </Users>
        )}
      </Popup>
    </div>
  );
};
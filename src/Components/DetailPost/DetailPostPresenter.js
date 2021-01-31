import React, {useState} from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { HeartFull, HeartEmpty, Comment as CommentIcon } from "../Icons";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import Popup from 'reactjs-popup';
import BurgerIcon from "../../Styles/BurgerIcon";
import "../../Styles/Menu.css";
import Menu from "../Menu";

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  user-select: none;
  margin-bottom: 25px;
  a{
    color:inherit;
  }
  flexDirection: row;
  
`;

const PostComment = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 300px;
  user-select: none;
  margin-bottom: 25px;
  a{
    color:inherit;
  }
  flexDirection: row;
  
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const UserColumn = styled.div`
  margin-left: 10px;
  
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.div`
  position:absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-image: url(${props => props.src});
  background-size:cover;
  background-position: left;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Div = styled.div`
  display: flex;
`;

const Button = styled.span`
  cursor: pointer;
  
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  padding-top:10px;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const CommentCount = styled.span`
  font-weight: 400;
  opacity: 0.6;
  display: block;
  font-size: 12px;
  margin: 5px 0px;
  padding-bottom: 4px;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;



const Comments = styled.ul`
  height:340px;
  margin-top:10px;
  
`;

const Comment = styled.li`
  margin-bottom:7px;
  span{
    margin-right:5px;
  }
  resize: none;
`;

const Caption = styled.div`
  margin : 10px 0px;
  margin-bottom : 20px;   
`;

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  marginTop: "40px"
};
const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "80%",
  border: "none"
};


export default ({
  id,
  user: { username, avatar },
  location,
  files,
  isLiked,
  commentLike,
  likeCount,
  createdAt,
  newComment,
  caption,
  currentItem,
  toggleLike,
  onKeyUp,
  comments,
  delComment,
  commentLiked,
  replyComment,
  modifyComment,
  openRelpy,

}) => (
  <Div>
  <Post>
    
    <Files>
      {files &&
        files.map((file, index) => (
          <File key={file.id} src={file.url} showing={index === currentItem} />
        ))}
    </Files>
    </Post>
  <PostComment>
    <Meta>
          <Header>
      <Avatar size="sm" url={avatar} />
      <UserColumn>
        <Link to={`/${username}`}>
          <FatText text={username} />
          </Link>
        <Location>{location}</Location>
      </UserColumn>
        </Header>
       
        <Caption><FatText text={username} /> {caption}</Caption>

      {comments && (
        <Comments>
          {comments.map((comment, index, event) => (
            <Comment key={comment.id} index={index}>
              <FatText text={comment.user.username} />
              {comment.text}
              <Button>
                {popupMenu(id)}
              </Button>
              <Button onClick={() => delComment(comment.id, index)}>
                삭제
              </Button>
              <Button onClick={() => replyComment(comment.id, comment.user.username, event)}>
                답글 달기
              </Button>
              <Button onClick={() => commentLiked(comment.id)}>
                {commentLike ? <HeartFull /> : <HeartEmpty />}
              </Button>
              {openRelpy &&
              <Textarea
                placeholder={"Add a comment..."}
                value={newComment.value}
                onChange={newComment.onChange}
                onKeyPress={onKeyUp}
              />
          }
 

              <Timestamp>{createdAt}</Timestamp>
              </Comment>
            ))}

          </Comments>
      )}

        <Buttons>
        <Button onClick={toggleLike}>
          {isLiked ? <HeartFull /> : <HeartEmpty />}
          </Button>
          
        <Button>
          
          <CommentIcon />
          </Button>
          
        </Buttons>
        <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
         <Timestamp>{createdAt}</Timestamp>
     
         <Textarea
        placeholder={"Add a comment..."}
        value={newComment.value}
        onChange={newComment.onChange}
          onKeyPress={onKeyUp} />
      </Meta>
    </PostComment>
    </Div>
);



const popupMenu = () => (
    
    <Popup
      modal
      overlayStyle={{ background: "rgba(255,255,255,0.8" }}
      contentStyle={contentStyle}
      closeOnDocumentClick={false}
      trigger={(open) => <IoEllipsisHorizontalSharp open={open} />}
    >


      {(close) => <Menu close={close} />}
    </Popup>
  
);

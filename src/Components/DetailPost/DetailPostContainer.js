import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./DetailPostPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT, DELETE_COMMENT } from "./DetailPostQueries";
import { toast } from "react-toastify";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location,
  avatar,
  commentLike
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [cLikedS, setcLiked] = useState(commentLike);
  const [openRelpy, setOpenRelpy] = useState(false);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const comment = useInput("");
  const [selfComments, setSelfComments] = useState([...comments]);
  
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value }
  });
  const [replyCommentMutation] = useMutation(ADD_COMMENT, {
  variables: { postId: id, text: comment.value }
  });
  const [removeCommentMutation] = useMutation(DELETE_COMMENT);
  const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    }
  };
  useEffect(() => {
    slide();
  }, [currentItem]);

  const toggleLike = () => {
    toggleLikeMutation();
    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  };

  const onKeyUp = async event => {
    const { which } = event;
    if (which === 13) {
      event.preventDefault();
      try {
        const {
          data: { addComment }
        } = await addCommentMutation();
        setSelfComments([...selfComments, addComment]);
        comment.setValue("");
      } catch {
        toast.error("Can't send comment 😔");
      }
      
    }
  };
  const delComment = async (comments, num) => {
    console.log('1', comments, num);
    
    await removeCommentMutation({ variables: { id: comments } })

    // setSelfComments(...selfComments.filter((selfComments) => {
    // return selfComments.id !== comments;
    // }))
    setSelfComments([...selfComments].filter(comment => comment.id !== comments))
    console.log('2', selfComments);
  }


  const commentLiked = (comments) => {
    const like = [...selfComments].find(comment => comment.id === comments)
    console.log(comments, like.id)
    toggleLikeMutation();
    if (like.id === comments && cLikedS === true) {
      setcLiked(false);
      
    }
      else {
      setcLiked(true);
      
      }
  }


  const replyComment = async (commentid, user, event) => {
      setOpenRelpy(!openRelpy);
      console.log(commentid, user, event);
      const { which } = event;
      if (which === 13) {
      event.preventDefault();
      try {
        const {
          data: { addComment }
        } = await replyCommentMutation();
        setSelfComments([...selfComments, addComment]);
        comment.setValue(user);
      } catch {
        toast.error("Can't send comment 😔");
      }
      
    }
  }
  
  
 
  return (
    <PostPresenter
      id={id}
      user={user}
      files={files}
      likeCount={likeCountS}
      location={location}
      caption={caption}
      isLiked={isLikedS}
      commentLike={cLikedS}
      comments={selfComments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyUp={onKeyUp}
      avatar={avatar}
      commentLiked={commentLiked}
      delComment={delComment}
      replyComment={replyComment}
      openRelpy={openRelpy}
      
      
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

export default PostContainer;
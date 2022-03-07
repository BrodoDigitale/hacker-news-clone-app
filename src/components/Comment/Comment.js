import React from "react";
import "./Comment.css";

//import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";

const Comment = (props) => {
  const comment = props;

  console.log(comment);
  //console.log(props)
  //const [kidsCommentsParentId, setKidsCommentsParentId] = useState(-1);

  function getSubcomments(subcomments) {
    console.log(subcomments);
    return subcomments.map((i) => {
      if (!i.hasOwnProperty("deleted") && !i.hasOwnProperty("dead")) {
        return (
          <div key={i.id} className="commentList__comment">
            {Comment(i)}
            {i.hasOwnProperty("kids") ? getSubcomments(i.kids) : null}
          </div>
        );
      } else {
        return null;
      }
    });
  }

  /*const getSubcommentElement = (id) => {
    if (kidsCommentsParentId === id) {
        const comments = comment.kids;
        return (
            <React.Fragment>
                {getSubcomments(comments)}
            </React.Fragment>
        );
    }
};*/

  function getParentComment(comment) {
    /*const nestedComments = (comment.kids || []).map((reply) => {
            return <Comment key={reply.id} comment={reply} type="child" />
        });*/
    return (
      <div className="comment">
        <p className="comment__info">
          {comment.by} at{" "}
          {new Date(comment.time * 1000).toLocaleDateString("en-GB", {
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
        {ReactHtmlParser(comment.text)}
      </div>
    );
  }
  //функция отображения комментария и вложенных комментариев
  const renderCommentTree = (comment) => {
    return (
      <div className="commentList__comment">
        {getParentComment(comment)}
        {comment.kids ? getSubcomments(comment.kids) : null}
      </div>
    );
  };
  /*{comment.kids ? getSubcomments(comment) : null}*/
  if (!comment.hasOwnProperty("deleted") && !comment.hasOwnProperty("dead")) {
    //comment.kids ? setKidsCommentsParentId(comment.id) : null;
    return renderCommentTree(comment);
  } else {
    return null;
  }
};

export default Comment;

import React from "react";
import "./CommentsList.css";
import { useEffect, useState } from "react";
import { newsApi } from "../../utils/HackerNewsApi";
import ReactHtmlParser from "react-html-parser";

const CommentsList = (props) => {
  const parentIds = props.comments;
  const [comments, setComments] = useState([]);
  const [kidsComments, setKidsComments] = useState([]);

  useEffect(() => {
    Promise.all(parentIds?.map((i) => newsApi.getComments(i))).then((res) => {
      console.log(res);
      setComments(res);
      //res.map((i) => childCommentsLoader(i))
    });
  }, [props.comments]);

  function Comment({ comment }) {
    const nestedComments = (kidsComments || []).map((comment) => {
      return <Comment key={comment.id} comment={comment} type="child" />;
    });

    return (
      <li style={{ marginLeft: "25px", marginTop: "10px" }}>
        <p>{ReactHtmlParser(comment.text)}</p>
        {nestedComments}
      </li>
    );
  }
  /*const childCommentsLoader = (comment) => {
        if(comment.kids && comment.kids.length > 0) {
          console.log(comment.kids)
          Promise.all(comment.kids.map((i) => newsApi.getComments(i)))
          .then((res) => {
            console.log(res)
            setKidsComments(res)
            res.map((i) => childCommentsLoader(i))
          })
        } else {
            return
        }
      }*/

  return (
    <div className="commentsList">
      <p className="commentsList__title">Comments</p>
      <ul>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />

        /*<div>
    <p className="newsPage__comment-info">{comment.by} at {
                new Date(comment.time * 1000).toLocaleDateString("en-GB", {
                  hour: "numeric",
                  minute: "numeric",
                })
    }</p>
    <p>{ ReactHtmlParser(comment.text) }</p>

    {comment.kids ? 
    <p></p>
    : null
    }
  </div>*/
      ))}
    </ul>
    </div>
  );
};

export default CommentsList;

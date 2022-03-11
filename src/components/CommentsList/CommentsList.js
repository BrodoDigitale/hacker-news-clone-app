 
import React from "react";
import "./CommentsList.css";
import  Comment  from "../Comment/Comment";
import { useEffect, useState } from "react";
import { newsApi } from "../../utils/HackerNewsApi";
//import ReactHtmlParser from "react-html-parser";

const CommentsList = (props) => {
  //const [comments, setComments] = useState([]);
  //const [kidsComments, setKidsComments] = useState([]);
  //const comments = props.comments
  //const isLoaded = props.isLoaded
  const comments = props.comments
  console.log(comments)
  //props.comments.map((i) => console.log(i.kids))
  //console.log(comments)
  /*useEffect(() => {
    //const parentIds = props.comments;
    //получаем комментарии верхнего уровня
    //Promise.all(parentIds?.map((i) => newsApi.getComments(i))).then((res) => {
    //const commentsTree = res.map((i) => getAllcomments(i));
    const commentsTree = getCommentsTree()
    setComments(commentsTree);
    //console.log(commentsTree);
      
      //setComments(res);
    //});
  }, [props.comments]);
  */




  /*function Comment({ comment }) {
       comment.kids ? console.log(`${comment.id}: ${[comment.kids].length}`) : console.log(`${comment.id}: no kids`)
       const subcomments = [] || [comment.kids].map((child) => {
           return <Comment key={child.id} subComment={child}/>
       });
        return (
            <div className="commentList__comment">
              {ReactHtmlParser(comment.text)}
              {subcomments}
            </div>
        ) 
  }*/
  /*function getSubcomments(commentKids) {
    return commentKids.map((i) => {
        if ((!i.hasOwnProperty(`deleted`)) && (!i.hasOwnProperty(`dead`))) {
            return (
                <div key={i.id} className="commentList__comment">
                    {Comment(i)}
                    {i.hasOwnProperty(`kids`) ? getSubcomments(i.kids) : null}
                </div>
            ); 
        } else {
            return;
        }
    });
}
  /*function subComment({ comment }) {
    let nestedComments
        nestedComments = (comment.kids || []).map((comment) => {
            console.log(comment)
            return <Comment key={comment.id} comment={comment} type="child" />;
          });
          console.log(comment)
    return (
    <>
      <li className="commentList__comment">
        <span>{ReactHtmlParser(comment.text)}</span>
      </li>
      {nestedComments}
      </>
    );
  }*/

  /*const getAllcomments = (comment) => {
    const comments =[]
    if(!comment.kids) {
      return comments;
    } else {
      Promise.all(comment.kids.map((i) => newsApi.getComments(i)))
      .then((subComments) => subComments.forEach((i) => 
      {const commentsTree = getCommentsTree(i)
      comments.push(commentsTree)}
      ))
    }
    return comments
  }*/
  
  /*const getAllcomments = (comment) => {
    const resultComment = Object.assign({}, comment);
    if (!comment.kids) {
      return resultComment;
    } else {
      const commentWIthReplies = [];
      comment.kids.forEach((i) => {
        newsApi.getComments(i).then((res) => {
          const commentTree = getAllcomments(res);
          commentWIthReplies.push(commentTree);
        });
      });
      setKidsComments(commentWIthReplies)
      resultComment.kids = commentWIthReplies;
      //console.log(resultComment);
      //setComments(...comments, resultComment);
      return resultComment;
    }
  };
  /*const getCommentsTree = (comment) => {
    const result = Object.assign({}, comment);
    if (result.hasOwnProperty(`kids`)) {
        const tmp = [];
        result.kids.forEach((i) => {
            newsApi.getComments(i)
            .then((res) => {
                const answer =  getCommentsTree(res)
                tmp.push(answer)
                
            })
        });
        result.kids = tmp;
        console.log(result)
        setKidsComments(kidsComments.push(result))
        return result;
    } else {
        console.log(result)
        return result;
    }
  }*/

  return (
    <div className="commentsList">
        {console.log(props.comments)}
        {
        comments.map((comment) => 
          { console.log(comment)
            console.log(comment.kids)
            return <Comment  key={comment.id} {...comment}/>
          }
          

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
        ) 
    }
    </div>
  );
};

export default CommentsList;

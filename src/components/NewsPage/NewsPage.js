import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { newsApi } from "../../utils/HackerNewsApi";
import CommentsList from "../CommentsList/CommentsList";
import ReactHtmlParser from "react-html-parser";
import "./NewsPage.css";

/*const commentsCounter = (arr) =>{
  const result = arr.reduce((count, current) => count + current, 0);
  return result
}*/

const Link = ({ url, title, className }) => (
  <a className={className} href={url} target="_blank" rel="noreferrer">
    {title}
  </a>
);

//{ news: { by, title, score, time, url }, props }
const NewsPage = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [thisNews, setThisNews] = useState([]);
  const [commentsAreLoaded, setCommentsAreLoaded] = useState(false);
  const [subcommentsAreLoaded, setSubcommentsAreLoaded] = useState(false);
  const [parentComments, setParentComments] = useState([]);
  const [subComments, setSubComments] = useState([]);
  const [commentsTree, setCommentsTree] = useState([]);
  const [iteration, setIteration] = useState(0);

//загрузка новости при заходе на страницу
  useEffect(() => {
    newsApi.getTheNews(id).then((res) => {
      setThisNews(res);
  }
  )}, []);


  //загрузка комментариев верхнего уровня
  useEffect(() => {
      if (thisNews.kids) {
        getCommentsTree(thisNews).then((res) => {
          setParentComments(res.map((i) => getSubcomments(i)))
          //console.log(parentComments)
        });
        
      }
  }, [thisNews]);

  useMemo(() => {

      setCommentsTree(parentComments)
    //console.log(parentComments)
    setSubcommentsAreLoaded(true)

}, [parentComments]);
 // подгружаем остальные комментарии
  /*useEffect(() => {
    if (commentsAreLoaded) {
      setParentComments(parentComments.map((i) => 
      getSubcomments(i)
      ))
      console.log(parentComments)
    } else {
      return
    }
    //console.log(nestedTree) 

}, [commentsAreLoaded]);*/

/*useMemo(() => {

  setCommentsTree(subComments)

}, [parentComments]);*/



/*
useEffect(() => {

setCommentsTree(subComments)
}, [subcommentsAreLoaded]);

*/

  const getCommentsTree = async (news) => {
    const commentsIds = news.kids;
    const commentsReplies = await newsApi.getComments(commentsIds);
    return commentsReplies
  };
  
 /* const getReplies = (comments) => {
    comments.map(async (i) => {
      const nestedComm =  await getSubcomments(i);
      console.log(nestedComm)
       return nestedComm
 
    });
  }*/

  const getSubcomments =  (comment) => {
    const result = Object.assign({}, comment);
    if (result.kids) {
      const kids = result.kids;
      const subcomments = [];
      kids.forEach(async (i) => {
        const comment = await newsApi.getComment(i);
        const fullCommentStructure = await getSubcomments(comment);
        subcomments.push(fullCommentStructure);
        result.kids = subcomments;
      });
      console.log(result);
      return result;
    } else {
      return result;
    }
  };

  return (
    <React.Fragment>
      {props.isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="newsPage">
          <Link
            className="newsPage__title"
            url={thisNews.url}
            title={thisNews.title}
          />
          <p className="newsPage__text">{ReactHtmlParser(thisNews.text)}</p>
          <span className="newsPage__info">
            by{" "}
            <Link
              url={`https://news.ycombinator.com/user?id=${thisNews.by}`}
              title={thisNews.by}
            />
          </span>
          |
          <span className="newsPage__info">
            {new Date(thisNews.time * 1000).toLocaleDateString("en-GB", {
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
          |
          <span className="newsPage__info">
            <Link
              url={`https://news.ycombinator.com/item?id=${id}`}
              title={`${
                thisNews.kids  ? thisNews.descendants : 0
              } comments`}
            />
          </span>
          |
          <button className="newsPage__go-back-button" onClick={history.goBack}>
            Go back
          </button>
          {commentsTree&&commentsTree.length ? (
            <React.Fragment>
              <p className="newsPage__comments-title ">Comments</p>
              <CommentsList comments={commentsTree} />
            </React.Fragment>
          ) : null}
        </div>
      )}
    </React.Fragment>
  );
};

export default NewsPage;

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { newsApi } from "../../utils/HackerNewsApi";
import CommentsList from "../CommentsList/CommentsList";
import ReactHtmlParser from "react-html-parser";
import PageNotFound from "../PageNotFound/PageNotFound";
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

const LoadingData = (notFound) => (
  <>{notFound ? <PageNotFound /> : <p className="loading">Loading...</p>}</>
);

//{ news: { by, title, score, time, url }, props }
const NewsPage = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [newsNotFound, setNewsNotFound] = useState(false);
  const [thisNews, setThisNews] = useState({});
  const [comments, setComments] = useState([]);

  //загрузка новости при заходе на страницу
  useEffect(() => {
    if (props.isLoaded) {
      const news = props.news.find((i) => i.id == id);
      console.log(news);
      if( news === undefined) {
        setNewsNotFound(true);
      }
      setThisNews(news);
    }
  }, [props.isLoaded]);

  useEffect(() => {
    if (thisNews.id) {
      setIsLoaded(true);
      if (thisNews.kids) {
        getCommentsTree(thisNews).then((res) => {
          console.log(res);
          setTimeout(() => {
            setComments(res);
          });
        });
      }
    }
  }, [thisNews]);

  const getCommentsTree = async (news) => {
    const comments = [];
    const commentsIds = news.kids;
    const commentsChild = await newsApi.getComments(commentsIds);
    commentsChild.forEach(async (it) => {
      const subChildTree = await getSubcomments(it);
      comments.push(subChildTree);
    });
    return comments;
  };

  const getSubcomments = async (comment) => {
    const result = Object.assign({}, comment);

    if (result.hasOwnProperty(`kids`)) {
      const kids = result.kids;
      const tmp = [];
      kids.forEach(async (i) => {
        const comment = await newsApi.getComment(i);
        const newComment = await getSubcomments(comment);
        tmp.push(newComment);
      });

      result.kids = tmp;

      return result;
    } else {
      return result;
    }
  };

  return (
    <React.Fragment>
      {isLoaded && thisNews ? (
        <div className="newsPage">
          <Link
            className="newsPage__title"
            url={thisNews.url || ""}
            title={thisNews.title || ""}
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
              title={`${thisNews.kids ? thisNews.descendants : 0} comments`}
            />
          </span>
          |
          <button className="newsPage__go-back-button" onClick={history.goBack}>
            Go back
          </button>
          {isLoaded ? (
            <React.Fragment>
              <p className="newsPage__comments-title ">Comments</p>
              <CommentsList comments={comments} isLoaded={isLoaded} />
            </React.Fragment>
          ) : null}
        </div>
      ) : (
        <LoadingData notFound={newsNotFound} />
      )}
    </React.Fragment>
  );
};

export default NewsPage;

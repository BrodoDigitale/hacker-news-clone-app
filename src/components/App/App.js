import './App.css';
import {newsApi} from '../../utils/HackerNewsApi';
import {React, useState, useEffect } from 'react';
import Header from '../Header/Header';
import NewsList from '../NewsList/NewsList';
import NewsPage from '../NewsPage/NewsPage';
import PageNotFound from '../PageNotFound/PageNotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  //получение новостей от api
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    if(!isLoaded)
    {
      setIsLoading(true);
      newsApi.getAllNews()
        .then((res) => {
          console.log(res)
          Promise.all(res.slice(0, 100).map((i) => newsApi.getTheNews(i)))
          .then((news) => {
            console.log(news)
            setNews(news);
            setIsLoading(false);
            setIsLoaded(true);
          })
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <BrowserRouter>
    <div className="body">
      <Switch>
      <Route 
      exact path="/hacker-news-clone-app"
      >
      <Header />
      <NewsList
      news={news}
      isLoading={isLoading}
      />
      </Route>
      <Route path="/hacker-news-clone-app/:id">
       <NewsPage
       news={news}
       isLoaded={isLoaded}
       />
      </Route>
      <Route path="*">
      <PageNotFound/>
      </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import {newsApi} from '../../utils/HackerNewsApi';
import {React, useState, useEffect } from 'react';
import NewsList from '../NewsList/NewsList';
import NewsPage from '../NewsPage/NewsPage';
import PageNotFound from '../PageNotFound/PageNotFound';
import { HashRouter, Route, Switch } from 'react-router-dom';

function App() {
  //получение новостей от api
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    newsApi.getAllNews()
      .then((res) => {
        Promise.all(res.slice(0, 100).map((i) => newsApi.getTheNews(i)))
        .then((news) => {
          setNews(news);
          setIsLoading(false);
          setIsLoaded(true);
        })
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <HashRouter basename='/'>
    <div className="body">
      <Switch>
      <Route 
      exact path="/"
      >
      <NewsList
      news={news}
      isLoading={isLoading}
      />
      </Route>
      <Route path="/:id">
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
    </HashRouter>
  );
}

export default App;

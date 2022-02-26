import './App.css';
import {newsApi} from '../../utils/HackerNewsApi';
import {React, useState, useEffect } from 'react';
import Header from '../Header/Header';
import NewsList from '../NewsList/NewsList';
import PageNotFound from '../PageNotFound/PageNotFouns';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  //получение новостей от api
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    newsApi.getAllNews()
      .then((res) => {
        console.log(res)
        Promise.all(res.slice(0, 100).map((i) => newsApi.getTheNews(i)))
        .then((news) => {
          console.log(news)
          setNews(news);
          setIsLoading(false);
        })
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <BrowserRouter>
    <div className="body">
      <Header />
      <Switch>
      <Route path="/"
      component={NewsList}
      news={news}
      isLoading={isLoading}
      exact={true} />
      <Route component={PageNotFound} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

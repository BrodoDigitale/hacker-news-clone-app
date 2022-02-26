import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <p>
      Такой страницы не существует. Вернуться <Link to="/">на главную</Link>
    </p>
  );
};

export default PageNotFound;
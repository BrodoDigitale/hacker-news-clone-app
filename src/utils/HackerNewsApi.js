class HackerNewsApi {
  constructor(config) {
    // тело конструктора
    this._url = config.url;
    this._headers = config.headers;
  }
  //функция проверки ответа от сервера
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getAllNews() {
    return fetch(`${this._url}/newstories.json`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }
  getTheNews(id) {
    return fetch(`${this._url}/item/${id}.json`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }
  getComments(comment) {
    return fetch(`${this._url}/item/${comment}.json`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }
}

//Создание api
export const newsApi = new HackerNewsApi({
  url: "https://hacker-news.firebaseio.com/v0",
  headers: {
    "Content-Type": "application/json",
  },
});

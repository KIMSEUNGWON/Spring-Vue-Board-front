import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}

// 액시오스 초기화 함수
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  });
  return setInterceptors(instance);
}

export const instance = createInstance();
export const posts = createInstanceWithAuth('posts');
export const board = createInstanceWithAuth('board');
export const post = createInstanceWithAuth('board');
export const user = createInstanceWithAuth('user');
export const chat = createInstanceWithAuth('chat');
export const notifications = createInstanceWithAuth('notification');
export const comment = createInstanceWithAuth('comment');

// 액시오스 초기화 함수
function createPokeInstanceWithAuth() {
  const instance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
  });
  return setInterceptors(instance);
}

export const pokemon = createPokeInstanceWithAuth();

// CREATE - posts
// POST - posts
// PUT - posts {id}
// DELETE - posts {id}

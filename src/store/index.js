import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
} from '@/utils/cookies';
import { loginUser } from '@/api/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
    drawer: false,
    gradient: 'rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)',
    items: [
      { title: 'Main', icon: 'mdi-view-dashboard', to: '/main' },
      {
        title: 'Pages',
        icon: 'mdi-menu',
        items: [
          {
            title: 'Account',
            icon: 'mdi-account',
            items: [
              {
                title: 'SignIn',
                icon: 'mdi-login',
                to: '/login',
              },
              {
                title: 'SignUp',
                icon: 'mdi-account-plus',
                to: '/signup',
              },
              {
                title: 'Profile',
                icon: 'mdi-badge-account',
                to: '/profile',
              },
            ],
          },
          {
            title: 'ProductList',
            icon: 'mdi-format-list-bulleted',
            to: '/page/product-list',
          },
        ],
      },
      { title: 'Board List', icon: 'mdi-grid', to: '/board' },
      {
        title: 'Pokemon Encyclopedia',
        icon: 'mdi-book-open-page-variant',
        to: '/encyclopedia',
      },
      {
        title: 'Chatting Page',
        icon: 'mdi-view-list-outline',
        to: '/chat',
      },
      {
        title: 'Typography',
        icon: 'mdi-format-text-variant-outline',
        to: '/typography',
      },
      {
        title: 'Tables',
        icon: 'mdi-table-settings',
        items: [
          { title: 'Basic Table', to: '/tables/basic-table' },
          { title: 'App Table', to: '/tables/app-table' },
        ],
      },
      {
        title: 'Forms',
        icon: 'mdi-form-select',
        items: [
          { title: 'Validation Form', to: '/forms/validation-form' },
          { title: 'App Form', to: '/forms/app-form' },
        ],
      },
      { title: 'Buttons', icon: 'mdi-gesture-tap-button', to: '/buttons' },
      { title: 'Icons', icon: 'mdi-emoticon-excited-outline', to: '/icons' },
    ],
    notifications: [],
    comments: [],
  },
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
    getComments(state) {
      return state.comments;
    },
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    clearUsername(state) {
      state.username = '';
    },
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = '';
    },
    setDrawer(state, drawer) {
      state.drawer = drawer;
    },
    setNotifications(state, value) {
      state.notifications = value;
    },
    setComments(state, value) {
      state.comments = value;
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(data.data);
      commit('setToken', data.data.token);
      commit('setUsername', data.data.email);
      saveAuthToCookie(data.data.token);
      saveUserToCookie(data.data.email);
      return data.data;
    },
  },
});

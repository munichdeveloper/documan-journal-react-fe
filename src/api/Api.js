import axios from 'axios';
import { config } from '../Config';
import { parseJwt } from '../Helpers';

export const api = {
  authenticate,
  signup,
  createJournalEntry,
  writeJournalEntryToIndex,
  getJournalEntries,
  getGroupedJournalEntries, query
}

function authenticate(email, password) {
  return instance.post('/auth/signin', { email, password }, {
    headers: { 'Content-type': 'application/json' }
  });
}

function signup(user) {
  return instance.post('/auth/signup', user, {
    headers: { 'Content-type': 'application/json' }
  });
}

function createJournalEntry(content) {
  return instance.post('/journalEntries', content, {
    headers: { 'Content-type': 'application/json' }
  });
}

function writeJournalEntryToIndex(content) {
  return instance.post('/index/journalEntries', content, {
    headers: { 'Content-type': 'application/json' }
  });
}

function getJournalEntries() {
  return instance.get('/journalEntries');
}

function getGroupedJournalEntries() {
  const token = localStorage.getItem('token');
  console.log('token' + token);
  return instance.get('/journalEntries/byDay', {
    headers: { 'Authorization': bearerAuth(token) }
  });
}

  function query(q) {
    return instance.post('/query', q, {
      headers: { 'Content-type': 'application/json' }
    });
  }

  const instance = axios.create({
    baseURL: config.url.API_BASE_URL
  })

  instance.interceptors.request.use(function (config) {
    console.log('config: ' + config.headers.Authorization);
    if (config.headers.Authorization) {
      const token = config.headers.Authorization.split(' ')[1];
      parseJwt(token);
    };
    return config;
  }, function (error) {
    return Promise.reject(error);
  })

  function bearerAuth(token) {
    return `Bearer ${token}`;
}
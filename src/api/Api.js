import axios from 'axios';
import { config } from '../Config';
import { parseJwt } from '../Helpers';

export const api = {
  authenticateWithDid,
  authenticate,
  signup,
  createJournalEntry,
  writeJournalEntryToIndex,
  getJournalEntries,
  getGroupedJournalEntries, query
}

function authenticateWithDid(didToken) {
  return instance.post('/magic/signinByMagicToken', didToken, {
    headers: { 'Content-type': 'application/json' }
  });
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

function createJournalEntry(content, user) {
  return instance.post('/journalEntries', content, {
    headers: { 'Content-type': 'application/json','Authorization': bearerAuth(user) }
  });
}

function writeJournalEntryToIndex(content, user) {
  return instance.post('/index/journalEntries', content, {
    headers: { 'Content-type': 'application/json', 'Authorization': bearerAuth(user) }
  });
}

function getJournalEntries(user) {
  return instance.get('/journalEntries', {
    headers: { 'Authorization': bearerAuth(user) }
  });
}

function getGroupedJournalEntries(user) {
  return instance.get('/journalEntries/byDay', {
    headers: { 'Authorization': bearerAuth(user) }
  });
}

function query(q, user) {
  return instance.post('/query', q, {
    headers: { 'Content-type': 'application/json', 'Authorization': bearerAuth(user) }
  });
}

const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
  if (config.headers.Authorization) {
    const token = config.headers.Authorization.split(' ')[1];
    parseJwt(token);
  };
  return config;
}, function (error) {
  return Promise.reject(error);
})

function bearerAuth(user) {
  return `Bearer ${user.token}`;
}
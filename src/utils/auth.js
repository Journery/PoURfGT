import Cookies from 'js-cookie'

const TokenKey = 'user_token'
const NameKey = 'Username'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUsername(username) {
  return Cookies.set(NameKey, username)
}

export function getUsername() {
  return Cookies.get(NameKey)
}

export function removeUsername() {
  return Cookies.remove(NameKey)
}

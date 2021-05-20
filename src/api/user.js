import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login.do',
    // url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(username) {
  return request({
    url: '/api/getUserInfo.do',
    // url: '/vue-admin-template/user/info',
    method: 'post',
    // method: 'get',
    data: { 'username': username }
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

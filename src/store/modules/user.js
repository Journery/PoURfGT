import { login, logout, getInfo, face } from '@/api/user'
import { getToken, setToken, removeToken, getUsername, setUsername, removeUsername } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: getUsername(),
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { msg, token } = response
        // console.log(response)
        console.log(msg)
        console.log(token)
        commit('SET_TOKEN', token)
        commit('SET_NAME', username)
        setToken(token)
        setUsername(username)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  face({commit}, data){
    return new Promise((resolve, reject) => {
      face(data).then(response => {
        const { msg, token } = response
        // console.log(response)
        console.log(msg)
        console.log(token)
        commit('SET_TOKEN', token)
        commit('SET_NAME', "20720000")
        setToken(token)
        setUsername("20720000")
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.name).then(response => {
        const { msg, name, roles } = response
        if (msg === 'fail') {
          return reject('Verification failed, please Login again.')
        }
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('roles must be a non-null array!')
        }
        commit('SET_ROLES', [roles])
        commit('SET_NAME', name)
        resolve({ 'roles': [roles] })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        removeUsername()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


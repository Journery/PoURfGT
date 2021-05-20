/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['teacher', 'student']
  // return valid_map.indexOf(str.trim()) >= 0
  return /^[0-9]{1,16}$/.test(str)
}


export function validateUsername(rule, value, callback) {
  if (!value) {
    callback(new Error("用户名不可为空"))
  }
  if (!validUsername(value)) {
    callback(new Error('用户名格式错误（1-16位数字）'))
  } else {
    callback()
  }
}

export function validatePassword(rule, value, callback) {
  if (value.length < 6) {
    callback(new Error('密码的位数不能低于6位'))
  } else {
    callback()
  }
}

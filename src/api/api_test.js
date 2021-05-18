import request from '@/utils/request'

export function getResult(data) {
  return request({
    url: '/api/stu_query_questionByStuID.do',
    method: 'post',
    data
  })
}

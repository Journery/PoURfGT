import request from '@/utils/request'

export function getStudentList(data) {
  return request({
    url: '/api/query_student_list.do',
    method: 'post',
    data
  })
}

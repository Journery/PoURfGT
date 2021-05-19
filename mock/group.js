const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@integer(20721500,20721700)',
    name: '@cName',
    'status|1': ['published', 'draft', 'deleted'],
    course: '@ctitle(5, 10)',
    group: {
      'group_id|+1': 1,
      group_name: '@cword(5,10)',
    },

  }]
})

module.exports = [
  {
    url: '/vue-admin-template/group/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]

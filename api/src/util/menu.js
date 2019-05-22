const EXPERT_MENU = [{
  title: '打分评价',
  icon: 'form',
  path: '/evaluate'
},
{
  title: '成绩统计',
  icon: 'dashboard',
  path: '/scoremanage'
}
]

const TEACHER_MENU = [{
    title: '任务管理',
    icon: 'project',
    path: '/taskmanage'
  },
  {
    title: '打分评价',
    icon: 'form',
    path: '/evaluate'
  },
  {
    title: '成绩统计',
    icon: 'dashboard',
    path: '/scoremanage'
  },
  {
    title: '标准管理',
    icon: 'calculator',
    path: '/standardmanage'
  },
  {
    title: '班级管理',
    icon: 'team',
    path: '/classmanage'
  }
]

const STUDENT_MENU = [{
    title: '我的任务',
    icon: 'folder-open',
    path: '/mytask'
  },
  {
    title: '打分评价',
    icon: 'form',
    path: '/evaluate'
  },
  {
    title: '我的成绩',
    icon: 'audit',
    path: '/myscore'
  }
]


export default [ EXPERT_MENU, TEACHER_MENU, STUDENT_MENU ]
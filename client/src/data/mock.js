import Mock from 'mockjs';

Mock.mock('http://localhost:5000/login', {
  'success': true,
  'status': 200,
  'message': '登录成功',
  'data': {}
});

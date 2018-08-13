import G from '../gobal';
// import { stringify } from 'qs';
import store from '../index';
import request from '../utils/request';

const { API_URL, axios } = G;
// 登录
export async function login(params) {
  // 执行api请求
  return request(`${API_URL}/space/login`, {
    method: 'POST',
    body: params,
  });
  console.log('****** login ****** ', params);
  axios({
    method: 'post',
    url: '/space/login',
    data: params,
    withCredentials: true,
  })
    .then(res => {
      console.log('***** res ***** ', res);
    })
    .catch(err => {
      console.log('***** err ***** ', err);
    });
  return {};
  return {
    status: 'success',
    type: params.userName === 'admin' ? 'admin' : 'account',
    currentAuthority: 'user',
    user: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userId: '00000001',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI4ZDQ2OGQ0YS1lM2RlLTRmMjYtOTY3OC1hN2Y3Y2ZkZjVhMjIiLCJ1c2VyTmFtZSI6IjlhbS1tYW5hZ2VyIiwibmlja05hbWUiOiI5YW0tbWFuYWdlciIsImNvbXBhbnlJZCI6MTEsImRlcGFydG1lbnQiOjAsInBvc2l0aW9uIjpudWxsLCJwaG9uZSI6bnVsbCwiYXZhdGFyIjoiMTExMSIsImRuIjoiY249OWFtLW1hbmFnZXIsb3U9OWFtLGRjPVNwYWNlU2VydmVyLGRjPWNvbSIsImlhdCI6MTUzMzk4NjU4OCwiZXhwIjoxNTMzOTkwMTg4fQ.jYBHfVWqGq2quR7WRjFCdzYzqRKsjj09oNcvRSGcU8A',
    },
  };
}

// 登出
export async function logout(params) {
  // return request(`${API_URL}/space/logout`, {
  //   method: 'POST',
  // });
  return {
    status: 'success',
    type: params.userName === 'admin' ? 'admin' : 'account',
    currentAuthority: 'user',
    user: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userId: '00000001',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI4ZDQ2OGQ0YS1lM2RlLTRmMjYtOTY3OC1hN2Y3Y2ZkZjVhMjIiLCJ1c2VyTmFtZSI6IjlhbS1tYW5hZ2VyIiwibmlja05hbWUiOiI5YW0tbWFuYWdlciIsImNvbXBhbnlJZCI6MTEsImRlcGFydG1lbnQiOjAsInBvc2l0aW9uIjpudWxsLCJwaG9uZSI6bnVsbCwiYXZhdGFyIjoiMTExMSIsImRuIjoiY249OWFtLW1hbmFnZXIsb3U9OWFtLGRjPVNwYWNlU2VydmVyLGRjPWNvbSIsImlhdCI6MTUzMzk4NjU4OCwiZXhwIjoxNTMzOTkwMTg4fQ.jYBHfVWqGq2quR7WRjFCdzYzqRKsjj09oNcvRSGcU8A',
    },
  };
}

// 首页获取站立时间趋势数据
export async function getStandingData() {
  const salesData = [];
  for (let i = 0; i < 12; i += 1) {
    salesData.push({
      x: `${i + 1}月`,
      y: Math.floor(Math.random() * 1000) + 200,
    });
  }
  return {
    status: 'ok',
    data: salesData,
  };
}

// 首页获取站立时间排行
export async function getTimeRanking() {
  const rankingListData = [];
  for (let i = 0; i < 7; i += 1) {
    rankingListData.push({
      title: `工专路 ${i} 号店`,
      hours: Math.floor(Math.random() * 10) * 2,
      minutes: Math.floor(Math.random() * 10) * 3,
    });
  }
  return {
    status: 'ok',
    data: rankingListData,
  };
}

// 首页获取收集的数据
export async function getHomeData() {
  return request(`${G.API_URL}/space/homeData`, {
    method: 'GET',
  });
  const gatherData = [];
  for (let i = 0; i < 4; i += 1) {
    gatherData.push({
      total: i === 3 ? Math.floor(Math.random() * 100) : Math.floor(Math.random() * 10000),
      useCount: Math.floor(Math.random() * 1000),
      rate: `${Math.floor(Math.random() * 100)}%`,
    });
  }
  return {
    status: 'ok',
    data: gatherData,
  };
}

// 获取人员数组
export async function getPersonnelList(payload) {
  console.log('******* getPersonnelList ***** ', store.getState().user, payload);

  return request(`${G.API_URL}/space/personList?token=${store.getState().user.user.token}`, {
    method: 'GET',
  });
  const userData = [];
  for (let i = 0; i < payload.currentNum; i += 1) {
    const random1 = parseInt((Math.random() * 1000) % 3);
    const random2 = parseInt((Math.random() * 1000) % 3);
    const random3 = parseInt((Math.random() * 1000) % 3);
    userData.push({
      id: (payload.currentPage - 1) * 10 + i + 1,
      name: `大华 第${payload.currentPage}页 ${i}`,
      phone: `${payload.quire || G.moment().unix()}-${i}`,
      duty: random1 === 0 ? '市场部' : random1 === 1 ? '人事部' : '技术部',
      status: random2 === 0 ? '10002' : random2 === 1 ? '1004、1005' : '未使用',
      mark: random3 === 0 ? '内部员工' : random3 === 1 ? '管理员' : '游客',
    });
  }
  return {
    status: 'ok',
    data: {
      currentPage: payload.currentPage,
      totalPage: payload.quire ? 10 : 20,
      totalNum: payload.quire ? 150 : 300,
      currentNum: payload.currentNum,
      dataList: userData,
    },
  };
}
// 获取设备列表
export async function getResourceList(payload) {
  console.log('******* payload ******* ', payload);

  // return G.request(
  //   'post',
  //   '/space/resourceList',
  //   { token: '' },
  //   {
  //     data: payload,
  //   }
  // )
  //   .then(res => {
  //     console.log('******** res ******* ', res);
  //   })
  //   .catch(err => {
  //     console.log('******** err ******* ', err);
  //   });
  return request('/space/resourceList', {
    method: 'POST',
    body: payload,
  });
  const userData = [];
  for (let i = 0; i < payload.currentNum; i += 1) {
    const random1 = parseInt((Math.random() * 1000) % 2);
    const random2 = parseInt((Math.random() * 1000) % 3);
    const random3 = parseInt((Math.random() * 1000) % 3);
    userData.push({
      id: (payload.currentPage - 1) * 10 + i + 1,
      daskId: `deskId${(payload.currentPage - 1) * 10 + i + 1}`,
      status: random1 === 0 ? '使用中' : '空闲',
      user: `lilei 第${payload.currentPage}页 ${(payload.currentPage - 1) * 10 + i + 1}`,
      mark: random2 === 0 ? '备注非法' : random2 === 1 ? '备注合格' : '未备注',
      lastTime: random3 === 0 ? '20180501' : random3 === 1 ? '20180604' : '20180101',
    });
  }
  return {
    status: 'ok',
    data: {
      currentPage: payload.currentPage,
      totalPage: payload.quire ? 10 : 20,
      totalNum: payload.quire ? 150 : 300,
      currentNum: payload.currentNum,
      dataList: userData,
    },
  };
}

// 获去通知列表
export async function getNoticeList() {
  const userData = [];
  const unix = G.moment().unix();
  for (let i = 0; i < 150; i += 1) {
    userData.push({
      id: i + 1,
      noticeId: `notice${i}`,
      title: `上海自来水来自海上${i}`,
      receiver: ['id10', 'id11'],
      editor: '<p>Hello World</p>',
      createdAt: G.moment.unix(unix + i * 600).format('MM/DD  hh:mm'),
      topping: false,
    });
  }
  return {
    status: 'ok',
    data: userData,
  };
}

// 发送通知
export async function sendNotice(params) {
  return {
    status: 'ok',
  };
}

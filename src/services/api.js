import G from '../gobal';
import store from '../index';
import request from '../utils/request';

const { API_URL } = G;
// 登录
export async function login(params) {
  // 执行api请求
  return request(`${API_URL}/space/login`, {
    method: 'POST',
    body: params,
  });
}

// 登出
export async function logout() {
  return request(`${API_URL}/space/logout`, {
    method: 'POST',
    body: { token: store.getState().user.user.token },
  });
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
  const { currentNum, currentPage, query, filterParam, sortParam } = payload;
  let url = `${G.API_URL}/space/personList?token=${
    store.getState().user.user.token
  }&currentNum=${currentNum}&currentPage=${currentPage}`;
  if (query) {
    url += `&query=${query}`;
  }
  if (filterParam) {
    url += `&filterParam=${filterParam}`;
  }
  if (sortParam) {
    url += `&sortParam=${sortParam}`;
  }
  return request(url, { method: 'GET' });
}

// 添加人员
export async function addPerson(payload) {
  const url = `${G.API_URL}/space/personAdd`;
  return request(url, {
    method: 'PUT',
    body: { ...payload, token: store.getState().user.user.token },
  });
}

// 修改或删除人员
export async function updatePerson(payload) {
  const url = `${G.API_URL}/space/personUpdate`;
  return request(url, {
    method: 'POST',
    body: { ...payload, token: store.getState().user.user.token },
  });
}

// 获取设备列表
export async function getResourceList(payload) {
  console.log('******* payload ******* ', payload);
  return request(`${G.API_URL}/space/resourceList?token=${store.getState().user.user.token}`, {
    method: 'POST',
  });
  // return request('/space/resourceList', {
  //   method: 'POST',
  //   body: payload,
  // });
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
export async function getNoticeList(payload) {
  const { currentNum, currentPage, query } = payload;
  let url = `${G.API_URL}/space/notificationList?token=${
    store.getState().user.user.token
  }&currentNum=${currentNum}&currentPage=${currentPage}`;
  if (query) {
    url += `&query=${query}`;
  }
  return request(url, { method: 'GET' });
}

// 发送通知
export async function sendNotice(payload) {
  const url = `${G.API_URL}/space/notificationAdd`;
  return request(url, {
    method: 'PUT',
    body: { ...payload, token: store.getState().user.user.token },
  });
}

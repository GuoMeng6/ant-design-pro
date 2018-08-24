import G from '../gobal';
import store from '../index';
import request from '../utils/request';
import { filterUrl, filterBody } from '../utils/utils';

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

// 设备数
export async function getResourceNum() {
  console.log('******** getResourceNum ******* ', store.getState());

  return request(`${API_URL}/space/resourceNum?token=${store.getState().user.user.token}`, {
    method: 'GET',
  });
}

// 用户数
export async function getUserNum() {
  return request(`${API_URL}/space/userNum?token=${store.getState().user.user.token}`, {
    method: 'GET',
  });
}

// 通知数
export async function getNotificationCount() {
  return request(`${API_URL}/space/notificationCount?token=${store.getState().user.user.token}`, {
    method: 'GET',
  });
}

// 通知数
export async function getStandNum() {
  return request(`${API_URL}/space/standNum?token=${store.getState().user.user.token}`, {
    method: 'GET',
  });
}

// 站立时间
export async function getHomeStand(payload) {
  const url = filterUrl({ ...payload, token: store.getState().user.user.token });
  return request(`${API_URL}/space/homeStand?${url}`, {
    method: 'GET',
  });
}

// 站立排行榜
export async function getHomeRank(payload) {
  // console.log('****** payload ***** ', payload);
  const url = filterUrl({ ...payload, token: store.getState().user.user.token });
  return request(`${API_URL}/space/homeRank?${url}`, {
    method: 'GET',
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
    status: 'success',
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
  const body = filterBody({ ...payload, token: store.getState().user.user.token });
  return request(`${G.API_URL}/space/personList`, {
    method: 'POST',
    body,
  });
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
  const body = filterBody({ ...payload, token: store.getState().user.user.token });
  return request(`${G.API_URL}/space/resourceList`, { method: 'POST', body });
}

// 设备列表添加备注
export async function addRemark(payload) {
  const url = `${G.API_URL}/space/resourceRemark`;
  return request(url, {
    method: 'POST',
    body: { ...payload, token: store.getState().user.user.token },
  });
}

// 解绑设备
export async function releaseDevice(payload) {
  const body = filterBody({ ...payload, token: store.getState().user.user.token });
  return request(`${G.API_URL}/space/resourceRelease`, { method: 'POST', body });
}

// 获去通知列表
export async function getNoticeList(payload) {
  const body = filterBody({ ...payload, token: store.getState().user.user.token });
  return request(`${G.API_URL}/space/notificationList`, { method: 'POST', body });
}


// 发送通知
export async function sendNotice(payload) {
  const url = `${G.API_URL}/space/notificationAdd`;
  return request(url, {
    method: 'PUT',
    body: { ...payload, token: store.getState().user.user.token },
  });
}

// 置顶通知
export async function topNotice(payload) {
  const body = filterBody({ ...payload, token: store.getState().user.user.token });
  return request(`${G.API_URL}/space/notificationPinToTop`, { method: 'POST', body });
}

// 获取客户数组
export async function getCustomerList(payload) {
  const body = filterBody({ ...payload, token: store.getState().user.user.token });
  return request(`${G.API_URL}/space/customerList`, {
    method: 'POST',
    body,
  });
}

// 添加客户
export async function addCustomer(payload) {
  const url = `${G.API_URL}/space/customerAdd`;
  console.log("***** 调用接口 *****", payload);

  return request(url, {
    method: 'PUT',
    body: { ...payload, token: store.getState().user.user.token },
  });
}
// 编辑客户
export async function editCustomer(payload) {
  const url = `${G.API_URL}/space/customerEdit`;
  return request(url, {
    method: 'PUT',
    body: { ...payload, token: store.getState().user.user.token },
  });
}
// 重置密码
export async function resetPassword(payload) {
  const body = filterBody({ ...payload, token: store.getState().user.user.token });
  return request(`${G.API_URL}/space/resetPassword`, {
    method: 'POST',
    body,
  });
}

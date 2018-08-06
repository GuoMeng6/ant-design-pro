import { stringify } from 'qs';
import request from '../utils/request';

// 登录
export async function login(params) {
  // 执行api请求
  return {
    status: 'ok',
    type: params.userName === 'admin' ? 'admin' : 'account',
    currentAuthority: 'user',
    user: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userId: '00000001',
      token: 'XXXX-XXXX-XXXX-XXXX',
    },
  };
}

// 首页获取站立时间趋势数据
export async function getStandingData(params) {
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
export async function getTimeRanking(params) {
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
export async function getGatherData() {
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
export async function getPersonnelList() {
  const userData = [];
  for (let i = 0; i < 50; i += 1) {
    const random1 = parseInt((Math.random() * 1000) % 3);
    const random2 = parseInt((Math.random() * 1000) % 3);
    const random3 = parseInt((Math.random() * 1000) % 3);
    userData.push({
      id: i,
      name: `大华${i}`,
      phone: 13800000000 + i,
      duty: random1 === 0 ? '市场部' : random1 === 1 ? '人事部' : '技术部',
      status: random2 === 0 ? '10002' : random2 === 1 ? '1004、1005' : '未使用',
      mark: random3 === 0 ? '内部员工' : random3 === 1 ? '管理员' : '游客',
    });
  }
  return {
    status: 'ok',
    data: userData,
  };
}

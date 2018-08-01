import { stringify } from 'qs';
import request from '../utils/request';

export async function fakeAccountLogin(params) {
  // 执行api请求
  return {
    status: 'ok',
    type: params.userName === 'admin' ? 'admin' : 'account',
    currentAuthority: 'user',
  };
}

export async function getStandingData(params) {
  // 执行api请求
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

export async function getTimeRanking(params) {
  // 执行api请求
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

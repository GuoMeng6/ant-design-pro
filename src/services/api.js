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

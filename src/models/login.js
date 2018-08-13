import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { message } from 'antd';
import { login, logout } from '../services/api';
import { setAuthority, setUserInfo } from '../utils/storage';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if (response.status === 'success') {
        yield put({
          type: 'user/user',
          payload: response.data,
        });
        reloadAuthorized();
        const params = getPageQuery();
        const { redirect } = params;
        yield put(routerRedux.replace('/home'));
      } else {
        message.error(response.message);
      }
      // return;
    },
    *logout(_, { call, put }) {
      const response = yield call(logout);
      console.log('****** logout ****** ', response);
      if (response && response.status === 'success') {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        yield put({
          type: 'user/user',
          payload: {},
        });
        reloadAuthorized();
        yield put(
          routerRedux.push({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority || 'user');
      setUserInfo(payload.data);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

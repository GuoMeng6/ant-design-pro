import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { message } from 'antd';
import { login } from '../services/api';
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
      console.log('******* effects ******* ', response);
      if (response.status === 'success') {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        yield put({
          type: 'user/user',
          payload: response.user,
        });
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        console.log('****** redirect ******', redirect);
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        message.error(response.message);
      }
      // return;
    },
    *logout(_, { put }) {
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
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      setUserInfo(payload.user);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

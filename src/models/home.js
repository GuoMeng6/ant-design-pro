import { message } from 'antd';
import {
  getResourceNum,
  getUserNum,
  getNotificationNum,
  getStandNum,
  getHomeStand,
  getHomeRank,
} from '../services/api';
import { getTimeByType } from '../utils/utils.js';

export default {
  namespace: 'home',

  state: {
    loading: false,
    resourceNum: { liveCount: 0, totalCount: 0 },
    userNum: { liveCount: 0, totalCount: 0 },
    notificationNum: { liveCount: 0, totalCount: 0 },
    standNum: { count: 0, rate: 0 },
    homeStand: [],
    homeRank: [],
  },

  effects: {
    *getResourceNum(_, { call, put }) {
      const response = yield call(getResourceNum);
      console.log('***** response ***** ', response);

      if (response && response.status === 'success') {
        yield put({ type: 'saveResourceNum', payload: response.data });
      } else {
        message.error('设备数获取失败');
      }
    },
    *getUserNum(_, { call, put }) {
      const response = yield call(getUserNum);
      if (response && response.status === 'success') {
        yield put({ type: 'saveUserNum', payload: response.data });
      } else {
        message.error('用户数获取失败');
      }
    },
    *getNotificationNum(_, { call, put }) {
      const response = yield call(getNotificationNum);
      if (response && response.status === 'success') {
        // console.log('***** getNotificationNum ****', response);
      } else {
        message.error('通知数获取失败');
      }
    },
    *getStandNum(_, { call, put }) {
      const response = yield call(getStandNum);
      if (response && response.status === 'success') {
        yield put({ type: 'saveStandNum', payload: response.data });
      } else {
        message.error('站立时长获取失败');
      }
    },
    *getHomeStand({ payload }, { call, put }) {
      const response = yield call(getHomeStand, payload);
      if (response && response.status === 'success') {
        yield put({ type: 'saveHomeStand', payload: response.data });
      } else {
        message.error('站立时长获取失败');
      }
    },
    *getHomeRank({ payload }, { call, put }) {
      const response = yield call(getHomeRank, payload);
      if (response && response.status === 'success') {
        yield put({ type: 'saveHomeRank', payload: response.data.rank });
      } else {
        message.error('站立排行获取失败');
        yield put({ type: 'saveHomeRank', payload: [] });
      }
    },
  },

  reducers: {
    saveResourceNum(state, { payload }) {
      return { ...state, resourceNum: payload };
    },
    saveUserNum(state, { payload }) {
      return { ...state, userNum: payload };
    },
    saveStandNum(state, { payload }) {
      return { ...state, standNum: payload };
    },
    saveHomeStand(state, { payload }) {
      const homeStand = payload.map(item => {
        const x = getTimeByType(item.date, item.type);
        const y = item.data.sit;
        return { x, y };
      });
      return { ...state, homeStand };
    },
    saveHomeStand2(state, { payload }) {
      return { ...state, homeStand: payload };
    },
    saveHomeRank(state, { payload }) {
      return { ...state, homeRank: payload };
    },
  },
};

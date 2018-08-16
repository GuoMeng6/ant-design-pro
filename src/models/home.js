import { getStandingData, getTimeRanking, getHomeData, getResourceNum } from '../services/api';

export default {
  namespace: 'home',

  state: {
    standingData: [],
    timeRanking: [],
    gatherData: [{}, {}, {}, {}],
    loading: false,
  },

  effects: {
    *getResourceNum(_, { call, put }) {
      const response = yield call(getResourceNum);
      console.log('****** getResourceNum ****** ', response);

      // yield put({ type: 'getResourceNum' });
    },
    *homeData(_, { call, put }) {
      const response = yield call(getHomeData);
      return;
      yield put({
        type: 'saveGatherData',
        payload: response,
      });
    },
    *fetchStandingData({ payload }, { call, put }) {
      const response = yield call(getStandingData, payload);
      yield put({
        type: 'saveStandingData',
        payload: response,
      });
    },
    *fetchTimeRanking({ payload }, { call, put }) {
      const response = yield call(getTimeRanking, payload);
      yield put({
        type: 'saveTimeRanking',
        payload: response,
      });
    },
  },

  reducers: {
    saveGatherData(state, { payload }) {
      return {
        ...state,
        gatherData: payload.data,
      };
    },
    saveStandingData(state, { payload }) {
      return {
        ...state,
        standingData: payload.data,
      };
    },
    saveTimeRanking(state, { payload }) {
      return {
        ...state,
        timeRanking: payload.data,
      };
    },
    clear() {
      return {
        standingData: [],
        timeRanking: [],
        gatherData: [{}, {}, {}, {}],
        loading: false,
      };
    },
  },
};

import { getStandingData, getTimeRanking } from '../services/api';

export default {
  namespace: 'home',

  state: {
    standingData: [],
    timeRanking: [],
    salesData: [],
    loading: false,
  },

  effects: {
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
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      };
    },
  },
};

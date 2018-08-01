import {} from '../services/api';

export default {
  namespace: 'home',

  state: {
    visitData: [],
    salesData: [],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      // const response = yield call(fakeChartData);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
    },
    *fetchSalesData(_, { call, put }) {
      // const response = yield call(fakeChartData);
      // yield put({
      //   type: 'save',
      //   payload: {
      //     salesData: response.salesData,
      //   },
      // });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
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

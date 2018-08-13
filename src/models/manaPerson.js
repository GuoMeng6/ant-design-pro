import { getPersonnelList } from '../services/api';

export default {
  namespace: 'manaPerson',
  state: {
    data: {
      rows: [],
      currentPage: 1,
      currentNum: 15,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getPersonnelList, payload);
      console.log('******** fetch ******** ', response);
      if (response && response.status === 'success') {
        yield put({
          type: 'save',
          payload: response.data,
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      const { currentPage, rows } = action.payload;

      return {
        ...state,
        data: {
          ...action.payload,
          currentPage: Number(currentPage),
          currentNum: state.data.currentNum,
        },
      };
    },
  },
};

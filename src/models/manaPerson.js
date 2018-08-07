import { getPersonnelList } from '../services/api';

export default {
  namespace: 'manaPerson',

  state: {
    data: {
      personnelList: [],
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getPersonnelList, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'save',
          payload: response.data,
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        personnelList: action.payload,
      };
    },
  },
};

import { getResourceList } from '../services/api';

export default {
  namespace: 'manaEquip',
  state: {
    data: {
      dataList: [],
      currentPage: 1,
      currentNum: 15,
    },
  },

  effects: {
    *resourceList({ payload }, { call, put }) {
      const response = yield call(getResourceList, payload);

      return;
      if (response.status === 'ok') {
        yield put({
          type: 'equipSave',
          payload: response.data,
        });
      }
    },
  },

  reducers: {
    equipSave(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
